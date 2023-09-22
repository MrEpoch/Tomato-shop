<script lang="ts">
	import { lazyLoad } from 'lib';
	export let product;

	let isAnimating = true;
</script>

<div
	class={`img-container sm:max-w-[250px] aspect-square
    w-full h-full max-w-[200px] flex items-center justify-center 
    rounded-lg overflow-hidden hover:brightness-75 transition duration-300
    cursor-pointer ${
			isAnimating ? 'animate-pulse min-h-[200px] sm:min-h-[250px]' : ''
		}  bg-gray-200 dark:bg-gray-800`}
>
	<img
		alt={product.name}
		use:lazyLoad={product.image}
		on:load={() => (isAnimating = false)}
		class="my-img hover:scale-[1.04] w-full opacity-0 h-full object-cover rounded-lg transition duration-300"
	/>
</div>
