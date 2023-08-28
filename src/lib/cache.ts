import redis from "./redis";

export async function cacheProductResponse(key: string, product: any) {
    try {
        await redis.setex(`${key}:${product.name}`, 24 * 60 * 60, JSON.stringify(product));
    } catch (error) {
        console.log(error);
    }
}

export async function getCachedProductResponse(key: string) {
    try {
        const cache = await redis.get(key);
        if (cache) {
            const parsed = JSON.parse(cache);
            console.log("Cache hit " + key);
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

export async function getCachedProducts(key: string, value="", count=100) {
    try {
        const cache = redis.scanStream({
            match: `${key}:${value}`,   
            type: 'string',
            count
        });
        cache.on('data', function (resultKeys) {
            const products = [];
            resultKeys.forEach(function (key) {
                const product = redis.get(key);
                products.push(product);
            });
            return products;
        });
    } catch (error) {
        console.log(error);
        return [];
    }
}
