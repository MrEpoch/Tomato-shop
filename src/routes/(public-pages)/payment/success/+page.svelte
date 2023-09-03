<script>
	import { onDestroy, onMount } from 'svelte';
	import { cart } from 'lib/local_storage';
	onMount(() => {
		cart.set({
			items: [],
			quantity: 0,
			total: 0
		});
	});
</script>

<div
	class="flex flex-col gap-[2rem] items-center justify-center min-h-screen w-full dark:bg-black/10 dark:text-white/90"
>
	<div
		class="flex flex-col border-[3px] h-full aspect-square p-[2rem] sm:p-[4rem] rounded-[100%] border-green-300 gap-[2rem] md:gap-[4rem] items-center justify-center"
	>
		<p class="text-xl font-bold mt-4 md:text-4xl">Payment Successful</p>
		<svg class="text-green-700 w-10 md:w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>check</title><path
				fill="currentColor"
				d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
			/></svg
		>
	</div>
</div>
