<script lang="ts">
	import Account from './account.svelte';
	export let user;

	let hidden = true;
</script>

<div
	class="fixed bottom-5 md:top-5 md:bottom-0 right-5 flex md:flex-col items-center flex-col-reverse gap-5 md:gap-10 z-[100]"
>
	<button
		on:click={() => (hidden = !hidden)}
		class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 rounded-3xl text-center inline-flex items-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
		type="button"
	>
		<svg
			class={`w-8 transition-transform duration-300 ${hidden ? '' : 'rotate-180'}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			><title>menu-left</title><path fill="currentColor" d="M14,7L9,12L14,17V7Z" /></svg
		>
	</button>
	{#if !hidden}
		<Account {hidden} {user} />
	{/if}
</div>
