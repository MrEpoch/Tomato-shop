<script lang="ts">
	import Card from "components/card.svelte";
	import { cart } from "lib/local_storage";

    let hidden = true;
    export let product;

    function handleHideModal() {
        hidden = !hidden;
    }

    function addToCart() {
        cart.update((items) => {
            const item = items.find((item) => item.id === product.id);
            if (item) {
                item.quantity += 1;
            } else {
                items.push({ ...product, quantity: 1 });
            }
            return items;
        });
    }

</script>

<button on:click={handleHideModal} data-modal-target="staticModal" data-modal-toggle="staticModal" class="" type="button">
    <Card {product} />
</button>

{#if !hidden}
    <div id="staticModal" data-modal-backdrop="static" aria-hidden="true" class="top-0  left-0 right-0 z-50 flex justify-center p-4 fixed w-screen h-[calc(100%-5rem)] max-h-full">
        <button on:click={() => hidden = true} class="h-screen w-screen fixed cursor-default"></button>
        <div class="relative scroll-element-modal overflow-y-auto w-full max-w-2xl h-full">
            <form method="POST" action="?/payment" class="relative   bg-white rounded-lg shadow  dark:bg-gray-700">
                <input type="hidden" name="id" value={product.id} />
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {product.name}
                    </h3>
                    <button on:click={() => hidden = true} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 h-full  space-y-6 ">
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
                </div>
                <div class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button on:click={addToCart} data-modal-hide="staticModal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
                    <a href="/payment" on:click={addToCart}  data-modal-hide="staticModal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed to pay</a>
                </div>
            </form>
        </div>
    </div>
{/if}

<style lang="postcss">
    .scroll-element-modal {
      scrollbar-width: thin;
      scrollbar-color: var(--secondary) var(--primary);
    }

    /* Chrome, Edge, and Safari */
    .scroll-element-modal::-webkit-scrollbar {
      width: 9px;
    }

    .scroll-element-modal::-webkit-scrollbar-track {
      background:slategray;
    }

    .scroll-element-modal::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 14px;
      border: 3px solid var(--primary);
    }
</style>
