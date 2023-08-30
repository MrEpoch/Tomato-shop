<script lang="ts">
    import { lazyLoad } from "lib";

    export let product;

    let isAnimating = false;

</script>

<div class={`w-full h-96 object-cover rounded-lg ${isAnimating ? "animate-pulse" : ""} transition-transform bg-gray-200 dark:bg-gray-800`}>
    <img class="w-full h-full object-cover rounded-lg" on:load={() => isAnimating = false} use:lazyLoad={product.image} alt={product.name} />
</div>
<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
	{product.name}
</h3>
<p class="text-gray-700 dark:text-gray-400">
	{product.description}
</p>
<p class="text-gray-700 dark:text-gray-400">
	${product.price}
</p>
<p class="text-gray-700 dark:text-gray-400">
	{product.long_description}
</p>
