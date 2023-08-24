<script lang="ts">
    export let product; 
</script>


<a href={`/catalog/tomato/${product.id}`} class="w-full max-w-[300px] h-[300px] flex items-center justify-center hover:scale-105 duration-500 cursor-pointer transition-transform">
   <img src={product.image} alt={product.name} class="w-full h-full object-cover" /> 
</a>
