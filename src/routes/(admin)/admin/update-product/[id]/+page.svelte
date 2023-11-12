<script lang="ts">
	export let data;
	export let form;

	let { update_product } = data;
	$: file = update_product.image;
	$: product = update_product;

	function handleFileInput(event) {
		newImg = true;
		file = event.target.files[0];
	}

	let update = false;
	let newImg = false;
</script>

<div class="w-full min-h-screen flex flex-col bg-black/10">
	{#if form?.error}
		<p class="text-red-500">{form.message}</p>
	{/if}
	<form
		method="POST"
		enctype="multipart/form-data"
		action={`?/${update ? 'update' : 'delete'}`}
		class="flex flex-col my-[4rem] gap-[4rem] w-full max-w-screen-xl mx-auto p-4"
	>
		<input type="hidden" name="id" value={product.id} />
		<input type="hidden" name="newimage" value={newImg} />
		<div class="flex items-center justify-center w-full aspect-video relative">
			<label
				for="dropzone-file"
				class={file
					? `border-0 aspect-video 
                relative bg-transparent flex flex-col 
                items-center justify-center w-full border-gray-300 border-dashed rounded-lg 
                cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
                hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`
					: ` flex aspect-video flex-col items-center justify-center w-full 
                    border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 
                    dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 
                    dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
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

					<img
						class="w-full h-full object-cover aspect-video"
						src={typeof file === 'string' ? file : URL.createObjectURL(file)}
						alt="Product"
					/>
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
				type="text"
				value={product.name}
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
				type="text"
				value={product.description}
				name="description"
				id="description"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
				required
			/>
		</div>
		<div>
			<label
				for="Stripe Price Id"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Price Id</label
			>
			<input
				type="text"
				value={product.stripeProductId}
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
				value={product.price}
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
				name="long_description"
				value={product.long_description}
				id="message"
				rows="4"
				class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
				placeholder="Write your thoughts here..."
			/>
		</div>
		<div class="flex justify-center gap-[2rem]">
			<button class="py-2 px-6 hover:bg-red-700 bg-red-600 rounded-xl font-bold leading-normal"
				>Delete Product</button
			>
			<button
				on:click={() => (update = true)}
				class="py-2 px-6 hover:bg-rose-700 bg-rose-600 rounded-xl font-bold leading-normal"
				>Update Product</button
			>
		</div>
	</form>
</div>
