<script lang="ts">
	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import { preferences } from 'lib/local_storage';
	import Transition from './transition.svelte';
	import { globalError } from 'lib/stores';

	export let data;
	let lastErrTimeOut;

	$: lastErrTimeOut;

	$: {
		if ($globalError.length > 0) {
			clearTimeout(lastErrTimeOut);
			lastErrTimeOut = setTimeout(() => {
				$globalError = '';
			}, 3000);
		}
	}
</script>

<svelte:head>
	<meta name="color-scheme" content={$preferences.theme === 'dark' ? 'dark' : 'light'} />
</svelte:head>

<div class="h-full w-full" class:dark={$preferences.theme === 'dark'}>
	<Header theme={$preferences.theme === 'dark'} />
	<Transition url={data.url}>
		<slot />
		{#if $globalError.length > 0}
			<div
				id="alert-2"
				class="flex fixed bottom-0 items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
				role="alert"
			>
				<svg
					class="flex-shrink-0 w-4 h-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
					/>
				</svg>
				<span class="sr-only">Info</span>
				<div class="ml-3 text-sm font-medium">
					{$globalError}
				</div>
				<button
					type="button"
					on:click={() => ($globalError = '')}
					class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
					data-dismiss-target="#alert-2"
					aria-label="Close"
				>
					<span class="sr-only">Close</span>
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
				</button>
			</div>
		{/if}
	</Transition>
	<Footer />
</div>

<style lang="postcss">
</style>
