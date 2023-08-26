<script lang="ts">
    import CreateModal from "./create_modal.svelte";
	import ProductModal from "./product_modal.svelte";
    import { products } from "lib/local_storage";
    
    let searching = false;
    let searchData = [];
    let searchTerm = "";
    let timer;

    $: {
        if (!(searchTerm.length > 0)) {
            searchData = [];
            searching = false;
        }
    }

    async function getMore() {
        const res = await fetch("/admin/api-product/" + $products.items.length);
        const json = await res.json();
        products.update(value => {
            return {
                ...value,
                items: [...value.items, ...json.data]
            }
        });
    }

    async function getData() {
        try {
            searching = true;
            if (!(searchTerm.length > 0)) {
                searchData = [];
                searching = false;
                return;
            }
            const res = await fetch(`/admin/api-product/search`, {
                method: "POST",
                body: JSON.stringify({
                    products: $products.items,
                    searchTerm
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await res.json();
            searchData = json.data;
        } catch (err) {
            console.log(err);
        }
    }

    async function handleSearch() {
        if (!(searchTerm.length > 0)) {
            searchData = [];
            searching = false;
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await getData();
        }, 500);
    } 

</script>


<div class="min-h-screen dark:bg-black/90 p-[4rem]">
    <div class="w-full flex justify-center items-center mb-[5rem]">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative w-2/4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input on:keyup={handleSearch} on:keydown={handleSearch} bind:value={searchTerm} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tomatoes" required>
            <button on:click={handleSearch} type="button" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </div>
    <div class="flex justify-center flex-wrap gap-[3rem]">
        {#if !searching}
        <CreateModal />
        {#each $products.items as product}
            <ProductModal {product} />
        {/each}
        <div class="w-full h-full mt-5 flex justify-center">
                <button on:click={getMore} class="w-full rounded-3xl max-w-[30px] h-[30px] bg-blue-500 flex items-center justify-center hover:scale-105 duration-500 cursor-pointer transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Load More</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </button>
        </div>
        {:else}
            {#each searchData as product}
                <ProductModal {product} />
            {/each}
        {/if}
    </div>
</div>
