import Redis from "ioredis";
import { REDIS_CONNECTION } from "$env/static/private";
 
export const PRODUCT_IDS_KEY = "product_ids";
 
/** Return the key used to store movie details for a given ID in Redis */
export function getProductKey(id: number): string {
  return `product:${id}`;
}
 
export default REDIS_CONNECTION ? new Redis(REDIS_CONNECTION) : new Redis();
