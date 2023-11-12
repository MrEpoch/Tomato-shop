<script lang="ts">
	import CreateModalForm from '../create_modal-form.svelte';

	let form;

	function handleFileInput(event) {
		file = event.target.files[0];
	}

	$: file = null;
</script>

{#if form?.success}
	<div
		class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
		role="alert"
	>
		<strong class="font-bold">Success!</strong>
		<span class="block sm:inline">{form.success}</span>
		<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
			<button on:click={() => (form.success = '')}>
				<svg
					class="fill-current h-6 w-6 text-green-500"
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<title>Close</title>
					<path
						d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.641 3.641a.5.5 0 0 1-.707.707L10 10.707l-3.641 3.641a.5.5 0 0 1-.707-.707L9.293 10 5.652 6.359a.5.5 0 0 1 .707-.707L10 9.293l3.641-3.641a.5.5 0 0 1 .707 0z"
					/>
				</svg>
			</button>
		</span>
	</div>
{:else if form?.error}
	<div
		class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
		role="alert"
	>
		<strong class="font-bold">Error!</strong>
		<span class="block sm:inline">{form.error}</span>
		<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
			<button on:click={() => (form.error = '')}>
				<svg
					class="fill-current h-6 w-6 text-red-500"
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<title>Close</title>
					<path
						d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.641 3.641a.5.5 0 0 1-.707.707L10 10.707l-3.641 3.641a.5.5 0 0 1-.707-.707L9.293 10 5.652 6.359a.5.5 0 0 1 .707-.707L10 9.293l3.641-3.641a.5.5 0 0 1 .707 0z"
					/>
				</svg>
			</button>
		</span>
	</div>
{/if}
<div
	aria-hidden="true"
	class={`
     flex justify-center p-4 dark:bg-black/10 min-h-screen`}
>
	<div class="relative w-full max-w-3xl min-h-full">
		<div class="px-6 py-6 lg:px-8">
			<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create New Product</h3>
			<form method="POST" class="space-y-6" enctype="multipart/form-data">
				<CreateModalForm {file} {handleFileInput} />
			</form>
		</div>
	</div>
</div>
