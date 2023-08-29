import redis from "./redis";

export async function cacheProductResponse(key: string, product: any) {
    try {
        await redis.setex(`${key}:${product.name}`, 24 * 60 * 60, JSON.stringify(product));
    } catch (error) {
        console.log(error);
    }
}

export async function cacheResponse(key: string, value, name: string) {
    try {
        await redis.setex(`${key}:${name}`, 24 * 60 * 60, value);
    } catch (error) {
        console.log(error);
    }
}

export async function getCachedProductResponse(key: string) {
    try {
        const cache = await redis.get(key);
        if (cache) {
            const parsed = JSON.parse(cache);
            return parsed;
        }
        return {};
    } catch (error) {
        console.log(error);
        return {};
    }
}

export async function setCachedProducts(productArray: any, key: string, expire = 24 * 60 * 60) {
    try {
        Promise.all(
            productArray.map(async (product) => {
                await redis.setex(`${key}:${product.name}`, expire, JSON.stringify(product));
            })
        );
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromCachedProducts(key) {
    try {
        await redis.del(key);
    } catch (error) {
        console.log(error);
    }
}

export async function getCachedProducts(key: string, value="*", count=100) {
    try {
        const products = [];
        const cache = redis.scanStream({
            match: `${key}:${value}`,
            type: 'string',
            count
        });
        for await (const key of cache) {
            await Promise.all(await key.map(async (product) => {
                const product_redis = await redis.get(product);
                const parsed = JSON.parse(product_redis);
                products.push(parsed);
            }));
        }
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}
