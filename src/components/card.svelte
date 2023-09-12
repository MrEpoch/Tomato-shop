<script lang="ts">
	import { lazyLoad } from 'lib';
	export let product;

	let isAnimating = true;
</script>

<div
	class={`img-container sm:min-w-[250px] sm:max-w-[250px] sm:max-h-[250px] sm:min-h-[250px]
    w-full h-full min-w-[200px] max-w-[200px] max-h-[200px] min-h-[200px]
    flex items-center justify-center rounded-3xl hover:scale-105 duration-500
    cursor-pointer ${
			isAnimating ? 'animate-pulse' : ''
		} transition-transform bg-gray-200 dark:bg-gray-800`}
>
	<img
		alt={product.name}
		use:lazyLoad={product.image}
		on:load={() => (isAnimating = false)}
		class="my-img w-full opacity-0 h-full object-cover rounded-3xl transition-opacity duration-300"
	/>
</div>
