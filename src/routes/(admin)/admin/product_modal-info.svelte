<script lang="ts">
    export let product;
</script>

<img class="w-full h-96 object-cover rounded-lg" src={product.image} alt={product.name} />
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
