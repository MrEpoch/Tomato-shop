import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }: { url: URL }) => {
    const isError = url.searchParams.get('error');

    if (isError === 'Unauthorized') {
        return {
            errorA: isError
        };
    }
}
export const prerender = true;
