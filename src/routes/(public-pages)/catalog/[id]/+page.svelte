
<script lang="ts">
	import { goto } from '$app/navigation';
	import { lazyLoad } from 'lib';
	import { cart } from 'lib/local_storage.js';

    export let data;
    let isAnimating = true;

	let navigateWith = false;

	async function addToCart(event) {
		try {
			const data = new FormData();

			cart.update((items) => {
				const item = items.items.find((item) => item.id === product_catalog.id);
				if (item) {
					item.quantity += 1;
				} else {
					items.items.push({ ...product_catalog, quantity: 1 });
				}
				return items;
			});

			data.append('cart', JSON.stringify($cart.items));

			await fetch(this.action, {
				method: 'POST',
				body: data
			});

			if (navigateWith) {
				goto('/payment');
			}
		} catch (e) {
			console.log(e);
		}
	}

    $: ({ product_catalog } = data);

</script>

<div class="min-h-screen w-full dark:bg-black/10 py-[5rem]">
<div
		class="flex justify-center p-4 w-full min-h-full"
	>
		<div class="relative scroll-element-modal w-full max-w-2xl h-full">
			<form
				method="POST"
				on:submit|preventDefault={addToCart}
				action="?/cartcookie"
				class=""
			>
				<div class="flex items-start justify-between p-4 ">
					<h3 class="lg:text-3xl sm:text-2xl text-xl font-semibold text-gray-900 dark:text-white">
						{product_catalog.name}
					</h3>
									</div>
				<div class="p-6 h-full space-y-6">
					<div
						class={`w-full aspect-video object-cover rounded-lg ${
							isAnimating ? 'animate-pulse' : ''
						} transition-transform bg-gray-200 dark:bg-gray-800`}
					>
						<img
							class="w-full aspect-video opacity-0 object-cover rounded-lg"
							use:lazyLoad={product_catalog.image}
							on:load={() => (isAnimating = false)}
							alt={product_catalog.name}
						/>
					</div>
					<h3 class="sm:text-lg text-md font-semibold text-gray-900 dark:text-white">
						{product_catalog.name}
					</h3>
					<p class="text-gray-700 dark:text-gray-400">
						{product_catalog.description}
					</p>
					<p class="text-gray-700 dark:text-gray-400">
						${product_catalog.price}
					</p>
					<p class="text-gray-700 dark:text-gray-400">
						{product_catalog.long_description}
					</p>
				</div>
				<div
					class="flex flex-wrap gap-5 items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<button
						type="submit"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Add To Cart</button
					>
					<button
						type="submit"
						on:click={() => (navigateWith = true)}
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Proceed to pay</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
