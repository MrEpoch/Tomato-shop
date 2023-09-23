<script lang="ts">
	import Card from 'components/card.svelte';
	import { products } from 'lib/local_storage';
	import ProductModalInfo from './product_modal-info.svelte';
	import ProductModalUpdate from './product_modal-update.svelte';

	let updateMode = false;
	let hidden = true;

	export let message;
	export let product;
	let file = product.image;

	async function handleDelete(event) {
		try {
			const data = new FormData(this);

			const deleted = await fetch(this.action, {
				method: 'POST',
				body: data
			});

			const deletedJson = await deleted.json();
			message = deletedJson.type.toString();
			hidden = true;
			products.set({
				items: $products.items.filter((item) => item.id !== product.id)
			});
			file = null;
		} catch (e) {
			console.log(e);
		}
	}

</script>


{#if !hidden}
	<div
		id="staticModal"
		data-modal-backdrop="static"
		aria-hidden="true"
		class="top-0 left-0 right-0 z-50 flex justify-center p-4 fixed w-screen h-[calc(100%-5rem)] max-h-full"
	>
		<button on:click={() => (hidden = true)} class="h-screen w-screen fixed cursor-default" />
		<div class="relative scroll-element-modal overflow-y-auto w-full max-w-2xl h-full">
			<form
				method="POST"
				on:submit|preventDefault={updateMode ? handleUpdate : handleDelete}
				enctype="multipart/form-data"
				action={`?/${updateMode ? 'update' : 'delete'}`}
				class="relative bg-white rounded-lg shadow dark:bg-gray-700"
			>
				<input type="hidden" name="id" value={product.id} />
				<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						{product.name}
					</h3>
					<button
						on:click={() => (hidden = true)}
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="staticModal"
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
					{#if !updateMode}
						<ProductModalInfo {product} />
					{:else}
						<ProductModalUpdate {product} {file} {handleFileInput} />
					{/if}
				</div>
				<div
					class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<button
						disabled={!updateMode}
						type="submit"
						data-modal-hide="staticModal"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Update</button
					>
					<div class="flex items-center justify-center">
						<input
							id="default-checkbox"
							type="checkbox"
							bind:checked={updateMode}
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							for="default-checkbox"
							class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Update Mode</label
						>
					</div>
					<button
						disabled={updateMode}
						data-modal-hide="staticModal"
						type="submit"
						class="bg-red-600 rounded-lg py-2 px-5"
					>
						<svg class="w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><title>Trash</title><path
								fill="currentColor"
								d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
							/></svg
						>
					</button>
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
