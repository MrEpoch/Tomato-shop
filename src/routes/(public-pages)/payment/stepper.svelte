<script lang="ts">
	export let currentStep = 2;
	export let returnToPrev;
	export let goNext;
</script>

<ol
	class="flex mt-[3rem] items-center w-full sm:px-[3rem] px-[0.5rem] max-[360px]:mr-[3rem] text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
>
	<button
		on:click={() => returnToPrev()}
		class="flex md:w-full items-center text-rose-600 dark:text-rose-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
	>
		<span
			class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
		>
			<svg
				class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
				/>
			</svg>
			Cart <span class="hidden sm:inline-flex sm:ml-2">Info</span>
		</span>
	</button>
	<button
		on:click={goNext}
		class={`${
			currentStep > 1
				? "flex md:w-full items-center text-rose-600 dark:text-rose-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
				: "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
		}`}
	>
		<span
			class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
		>
			{#if currentStep > 2}
				<svg
					class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
					/>
				</svg>
			{/if}
			<span class="mr-2">2</span>
			Order <span class="hidden sm:inline-flex sm:ml-2">Info</span>
		</span>
	</button>
	<li
		class={`${
			currentStep > 2
				? 'flex md:w-full items-center text-rose-600 dark:text-rose-500'
				: 'flex items-center'
		}`}
	>
		<span
			class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
		>
			{#if currentStep > 2}
				<svg
					class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
					/>
				</svg>
			{/if}
			<span class="mr-2">3</span>
			Payment
		</span>
	</li>
</ol>
