<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import { page } from '$app/stores';
	import CardSkeleton from 'components/CardSkeleton.svelte';

	$: ({ products_search, product_count } = $page.data);
	$: searchTerm = $page.url.searchParams.get('search') || '';

    $: current_page = $page.url.searchParams.get('page') || 1;
    $: now = 0;
    $: skip = 0;

	function searchChange(evt) {
		if (now > 3) {
			searchTerm = evt.target.value;
		}
	}

    async function getNext() {
        skip+=1;
        const res = await fetch(`/catalog?search=${searchTerm}&skip=${skip}`, {
			method: 'GET'
		});
		const json = await res.json();
        products_search.set(json.data);
    }

</script>

<div class="sm:px-[5rem] w-full min-h-screen flex gap-[3rem] flex-col dark:bg-black/10">
	<div
		class="flex mt-[5rem] mb-[5rem] xl:flex-row gap-[4rem] flex-col justify-between items-center w-full"
	>
		<h3 class="text-4xl sm:text-6xl font-thin text-center text-black dark:text-white">
			Enjoy Freshness!
		</h3>
		<div class="flex items-center">
			<form action="/catalog" class="relative w-full min-w-[16rem] sm:min-w-[24rem] max-w-5xl">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>

				<input
					name="search"
					on:change={searchChange}
					value={searchTerm}
					id="default-search"
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Tomatoes"
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Search</button
				>
			</form>
		</div>
	</div>
	<div class="flex flex-col mb-[5rem] gap-[3rem]">
        <div class="justify-center flex flex-wrap gap-[3rem]">
		{#each $products_search.data as product}
			{#await product}
				<h1>loading...</h1>
				<CardSkeleton />
			{:then product_data}
				<ProductCard product={product_data} />
			{:catch error}
				<p>{error.message}</p>
			{/await}
        {/each}
        </div> 
    </div>
    {#if product_count > 15}
    <button class="py-2 px-6 text-white bg-blue-700
        hover:bg-blue-800 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 font-medium rounded-lg text-sm" on:click={getNext}>Load More</button>
    {/if}
</div>
