<script lang="ts">
	import CreateModal from './create_modal.svelte';
	import ProductModal from './product_modal.svelte';
	import { products } from 'lib/local_storage';
	import ErrorMessages from './error-messages.svelte';
	import { page } from '$app/stores';

	$: message = "";

	$: ({ products_search } = $page.data);
	$: searchTerm = $page.url.searchParams.get('search') || '';

	$: now = 0;

	function setEmptySearch() {
		searchTerm = '';
	}

	function searchChange(evt) {
		if (now > 3) {
			searchTerm = evt.target.value;
		}
	}

	async function getMore() {
		const res = await fetch('/admin/api-product/' + $products.items.length);
		const json = await res.json();
		products.update((value) => {
			return {
				...value,
				items: [...value.items, ...json.data]
			};
		});
	}
</script>

<div class="min-h-screen dark:bg-black/90 p-[4rem]">
	<ErrorMessages bind:message />

	<div class="w-full flex justify-center items-center mb-[5rem]">
		<label
			for="default-search"
			class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
		>
		<div class="flex items-center">
			<form action="/admin" class="relative w-full min-w-[16rem] sm:min-w-[24rem] max-w-5xl">
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
					type="search"
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
	<div class="flex justify-center flex-wrap gap-[3rem]">
		<CreateModal on:loadcards={setEmptySearch} {message} />
		{#each $products_search.data as product}
			<ProductModal {product} {message} />
		{/each}
		<div class="w-full h-full mt-5 flex justify-center">
			<button
				on:click={getMore}
				class="w-full rounded-3xl max-w-[30px] h-[30px] bg-blue-500 flex items-center justify-center hover:scale-105 duration-500 cursor-pointer transition-transform"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>Load More</title><path
						d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
