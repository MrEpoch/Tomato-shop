<script lang="ts">
	import { lazyLoad } from 'lib';

	export let file;
	export let handleFileInput;
	let isAnimating = true;
</script>

<div class="flex items-center justify-center w-full relative">
	<label
		for="dropzone-file"
		class={file
			? 'border-0 relative bg-transparent flex flex-col items-center justify-center w-full h-64  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
			: ' flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'}
	>
		{#if file}
			<button
				on:click={() => (file = null)}
				type="button"
				class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="authentication-modal"
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
			<div
				class={`w-full h-full ${
					isAnimating ? 'animate-pulse' : ''
				} transition-transform bg-gray-200 dark:bg-gray-800`}
			>
				<img
					class="w-full h-full object-cover"
					on:load={() => (isAnimating = false)}
					use:lazyLoad={URL.createObjectURL(file)}
					alt="example"
				/>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				<svg
					class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
					/>
				</svg>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					SVG, PNG, JPG or GIF (MAX. 800x400px)
				</p>
			</div>
		{/if}
		<input
			required
			name="image"
			id="dropzone-file"
			on:change={handleFileInput}
			type="file"
			class={file ? 'hidden z-[-1]' : 'hidden'}
		/>
	</label>
</div>
<div>
	<label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Product Name</label
	>
	<input
		minlength="3"
		type="text"
		name="name"
		id="name"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
		required
	/>
</div>
<div>
	<label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Description</label
	>
	<input
		minlength="3"
		type="text"
		name="description"
		id="description"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
		required
	/>
</div>
<div>
	<label for="Stripe Price Id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Stripe Price Id</label
	>
	<input
		minlength="3"
		type="text"
		name="stripePriceId"
		id="stripePriceId"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
		required
	/>
</div>
<div>
	<label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Price</label
	>
	<input
		type="text"
		name="price"
		id="price"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
		required
	/>
</div>
<div>
	<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Long Description</label
	>
	<textarea
		minlength="3"
		name="long_description"
		id="message"
		rows="4"
		class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
		placeholder="Write your thoughts here..."
	/>
</div>
<button
	type="submit"
	class="w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
	>Add Product</button
>
