<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from 'components/card.svelte';
	import { cart } from 'lib/local_storage';
    import { lazyLoad } from 'lib';

    let hidden = true;
    let isAnimating = true;

	let navigateWith = false;
	export let product;

	function handleHideModal() {
		hidden = !hidden;
	}

	async function addToCart(event) {
		try {
			const data = new FormData();

			cart.update((items) => {
				const item = items.items.find((item) => item.id === product.id);
				if (item) {
					item.quantity += 1;
				} else {
					items.items.push({ ...product, quantity: 1 });
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
			return (hidden = true);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<button
	on:click={handleHideModal}
	data-modal-target="staticModal"
	data-modal-toggle="staticModal"
	class=""
	type="button"
>
    <Card {product} />
</button>

{#if !hidden}
	<div
		id="staticModal"
		data-modal-backdrop="static"
		aria-hidden="true"
		class="top-0 left-0 right-0 z-50 flex justify-center p-4 fixed w-screen h-[calc(100%-5rem)] max-h-full"
	>
		<button on:click={() => (hidden = true)} class="min-h-screen w-screen fixed cursor-default" />
		<div class="relative scroll-element-modal overflow-y-auto w-full max-w-2xl h-full">
			<form
				method="POST"
				on:submit|preventDefault={addToCart}
				action="?/cartcookie"
				class="relative bg-white rounded-lg shadow dark:bg-gray-700"
			>
				<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						{product.name}
					</h3>
					<button
						on:click={() => (hidden = true)}
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="p-6 h-full space-y-6">
                    <div class={`w-full h-96 object-cover rounded-lg ${isAnimating ? "animate-pulse" : ""} transition-transform bg-gray-200 dark:bg-gray-800`}>
                        <img class="w-full h-96 opacity-0 object-cover rounded-lg" use:lazyLoad={product.image} on:load={() => isAnimating = false} alt={product.name} />
                    </div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						{product.name}
					</h3>
					<p class="text-gray-700 dark:text-gray-400">
						{product.description}
					</p>
					<p class="text-gray-700 dark:text-gray-400">
						${product.price}
					</p>
					<p class="text-gray-700 dark:text-gray-400">
						{product.long_description}
					</p>
				</div>
				<div
					class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
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
{/if}

<style lang="postcss">
	.scroll-element-modal {
		scrollbar-width: thin;
		scrollbar-color: var(--secondary) var(--primary);
	}

	/* Chrome, Edge, and Safari */
	.scroll-element-modal::-webkit-scrollbar {
        width: 9px;

	}

    .scroll-element-modal::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 50px;
    }

    .scroll-element-modal::-webkit-scrollbar-thumb {
		background-color: black;
		border: 3px solid var(--primary);
        border-radius: 50px;
    }
</style>
