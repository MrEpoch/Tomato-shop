export const wait = async (amount) => new Promise((res) => setTimeout(res, amount ?? 500));

