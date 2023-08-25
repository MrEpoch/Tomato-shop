import { fail, json, redirect } from "@sveltejs/kit";
import { isAdmin } from "lib/auth";
import { CreateProduct, deleteProduct, getProduct, updateProduct } from "lib/products";
import { writeFile, unlink } from "fs/promises";
import { products } from "lib/local_storage";

export const actions = {
    create: async ({ cookies, request }) => { 
        try {
            const data = await request.formData();
            const name = data.get('name');
            const description = data.get('description');
            const long_description = data.get('long_description');
            const price = data.get('price');
            const stripeProductId = data.get('stripePriceId');
            const image = data.get('image'); 

            if (/^\s*$/.test(name) || /^\s*$/.test(description) || /^\s*$/.test(long_description) || /^\s*$/.test(stripeProductId)) {
                return fail(400, {
                    error: true,
                    message: 'You must provide all the fields'
                });
            }

            const newFileName_ext = image.name.split('.').pop();
            if (!['jpg', 'jpeg', 'png'].includes(newFileName_ext)) {
                return fail(400, {
                    error: true,
                    message: 'You must provide a valid image file'
                });
            }
            const newFileName = `${crypto.randomUUID()}.${newFileName_ext}`;

            if (
              !image.name ||
              image.name === 'undefined'
            ) {
              return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
              });
            }
            await writeFile(`src/images/${newFileName}`, new Uint8Array(await image.arrayBuffer()));

            const product = await CreateProduct(name, description, long_description, price, stripeProductId, "src/images/" + newFileName);
            if (product === null) {
                throw new Error('User not found');
            }
            products.update((value) => {
                return {
                    ...value,
                    items: [
                        ...value.items,
                        product
                    ]
                }
            });

        } catch (error) {
            console.log(error);
            return {
                status: 401,
                body: {
                    message: error.message,
                },
            };
        }
    },

    update: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const id = data.get('id');
            const image = data.get('image');

            const product = await getProduct(id);
            let newImage = product.image;
            
            let name = product.name;
            let description = product.description;
            let long_description = product.long_description;
            let price = product.price;
            let stripeProductId = product.stripeProductId;
            
            if (image) {
                const newFileName_ext = image.name.split('.').pop();
                if (!['jpg', 'jpeg', 'png'].includes(newFileName_ext)) {
                    return fail(400, {
                        error: true,
                        message: 'You must provide a valid image file'
                    });
                }
                const newFileName = `${crypto.randomUUID()}.${newFileName_ext}`;

                if (
                    !image.name ||
                    image.name === 'undefined'
                    ) {
                    return fail(400, {
                        error: true,
                        message: 'You must provide a file to upload'
                    });
                }
                await writeFile(`src/images/${newFileName}`, new Uint8Array(await image.arrayBuffer()));
                newImage = "src/images/" + newFileName;
            }
            if (data.get('name') !== product.name) name = data.get('name');
            if (data.get('description') !== product.description) description = data.get('description');
            if (data.get('long_description') !== product.long_description) long_description = data.get('long_description');
            if (data.get('price') !== product.price) price = data.get('price');
            if (data.get('stripePriceId') !== product.stripeProductId) stripeProductId = data.get('stripePriceId');
            await unlink(`${product.image}`);

            const product_update = await updateProduct(id, name, description, long_description, price.toString(), stripeProductId, newImage);
            return json({ data: product_update });
        } catch (error) {
            console.log(error);
            return fail(400, {
                error: true,
                message: error.message
            });
        }
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id');
        try {
            const isAdmin_res = await isAdmin(request, cookies);
            if (!isAdmin_res) throw redirect(303, `/signup`);
            if (isAdmin_res.role !== 'ADMIN') throw redirect(303, `/signup`);

            const product = await deleteProduct(id);
            await unlink(`${product.image}`);
        } catch (error) {
            console.log(error);
            return {
                status: 401,
                body: {
                    message: error.message,
                },
            };
        }
    }
}
