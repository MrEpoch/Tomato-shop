<script lang="ts">
	import ErrorMessages from './error-messages.svelte';
	import { page } from '$app/stores';
	import Card from 'components/card.svelte';

	$: message = '';

	$: ({ products_search } = $page.data);
	$: searchTerm = $page.url.searchParams.get('search') || '';

	$: now = 0;

	function searchChange(evt) {
		if (now > 3) {
			searchTerm = evt.target.value;
		}
	}
</script>

<div class="min-h-screen dark:bg-black/10 p-[4rem]">
	<ErrorMessages bind:message />
	<h3 class="text-3xl font-semibold text-gray-900 dark:text-white">Find Products</h3>
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
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
					placeholder="Search Tomatoes"
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
					>Search</button
				>
			</form>
		</div>
	</div>
	<div class="flex justify-center flex-wrap gap-[3rem]">
		<a
			href="/admin/new-product"
			class="w-full rounded-lg sm:min-w-[250px]
            sm:max-w-[250px] sm:max-h-[250px] sm:min-h-[250px]
            min-w-[200px] max-w-[200px] max-h-[200px] min-h-[200px] flex items-center
            justify-center from-red-600 to-rose-600 bg-gradient-to-r hover:scale-[1.02] duration-500 cursor-pointer transition-transform"
		>
			<svg
				class="w-16 dark:text-white/90 text-black"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><title>plus</title><path
					fill="currentColor"
					d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
				/></svg
			>
		</a>
		{#each $products_search ? $products_search.data : [] as product}
			<a href={`/admin/update-product/${product.id}`}>
				<Card {product} />
			</a>
		{/each}
	</div>
</div>
