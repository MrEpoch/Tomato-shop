<script lang="ts">
    export let product; 
</script>


<div class="sm:min-w-[250px] sm:max-w-[250px] sm:max-h-[250px] sm:min-h-[250px] w-full h-full  min-w-[200px] max-w-[200px] max-h-[200px] min-h-[200px] flex items-center justify-center rounded hover:scale-105 duration-500 cursor-pointer transition-transform">
   <img src={product.image} alt={product.name} class="w-full h-full object-cover rounded-3xl" /> 
</div>
