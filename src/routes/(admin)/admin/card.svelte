<script lang="ts">
    export let product; 
</script>


<div class="w-full max-w-[250px] h-[250px] flex items-center justify-center rounded hover:scale-105 duration-500 cursor-pointer transition-transform">
   <img src={product.image} alt={product.name} class="w-full h-full object-cover rounded-3xl" /> 
</div>
