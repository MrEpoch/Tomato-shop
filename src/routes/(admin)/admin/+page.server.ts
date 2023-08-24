import { fail, redirect } from "@sveltejs/kit";
import { isAdmin } from "lib/auth";
import { CreateProduct, deleteProduct } from "lib/products";
import { writeFile } from "fs/promises";

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

            if (/^\s*$/.test(name) || /^\s*$/.test(description) || /^\s*$/.test(long_description) || /^\d+\.\d+$/.test(price) || /^\s*$/.test(stripeProductId)) {
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

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        const id = data.get('id');
        try {
            const isAdmin_res = await isAdmin(request, cookies);
            if (!isAdmin_res) throw redirect(303, `/signup`);
            if (isAdmin_res.role !== 'ADMIN') throw redirect(303, `/signup`);

            await deleteProduct(id);
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