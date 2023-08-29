<script lang="ts">
	import { browser } from "$app/environment";
	import CardSkeleton from "./CardSkeleton.svelte";

    export let product;

      const preload = async (src) => {
        if (browser) {
            const resp = await fetch(src);
            const blob = await resp.blob();

            const imageCache = await caches.open("cm-images");
            imageCache.add(`${resp.url}`);

            return new Promise(function (resolve) {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve(reader.result);
            });
        }
      };

</script>

{#await preload(product.image)}
        <CardSkeleton />
{:then base64}
    <div
        class="sm:min-w-[250px] sm:max-w-[250px] sm:max-h-[250px] sm:min-h-[250px]
        w-full h-full min-w-[200px] max-w-[200px] max-h-[200px] min-h-[200px]
        flex items-center justify-center rounded-3xl hover:scale-105 duration-500
        cursor-pointer transition-transform bg-gray-200 dark:bg-gray-800"
    >
            <img src="{base64}" alt={product.name} class="w-full h-full object-cover rounded-3xl" />
    </div>
{/await}



