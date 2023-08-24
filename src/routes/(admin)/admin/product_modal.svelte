<script lang="ts">
	import Card from "./card.svelte";

    let updateMode = false;
    let hidden = true;
    export let product;
    let file = product.image;
    function handleHideModal() {
        hidden = !hidden;
    }

    function handleFileInput(event) {
        file = event.target.files[0];
    }


</script>

<button on:click={handleHideModal} data-modal-target="staticModal" data-modal-toggle="staticModal" class="" type="button">
    <Card {product} />
</button>

{#if !hidden}
    <div id="staticModal" data-modal-backdrop="static" aria-hidden="true" class="top-0  left-0 right-0 z-50 flex justify-center p-4 fixed w-screen h-[calc(100%-5rem)] max-h-full">
        <button on:click={() => hidden = true} class="h-screen w-screen fixed cursor-default"></button>
        <div class="relative scroll-element-modal overflow-y-auto w-full max-w-2xl h-full">
            <form method="POST" enctype="multipart/form-data" action={`?/${updateMode ? "update" : "delete"}`} class="relative   bg-white rounded-lg shadow  dark:bg-gray-700">
                <input type="hidden" name="id" value={product.id} />
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {product.name}
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 h-full  space-y-6 ">
                    {#if !updateMode}
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
                    {:else}
                        <div class="space-y-6">
                            <div class="flex items-center justify-center w-full relative">
                                    <label for="dropzone-file" class={file ? "border-0 relative bg-transparent flex flex-col items-center justify-center w-full h-64  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" : " flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
                                        {#if file}
                                            <button on:click={() => file = null} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>

                                            <img class="w-full h-full " src={typeof file === "string" ? file : URL.createObjectURL(file)} alt="Product" />
                                        {:else}
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        {/if}
                                        <input name="image" id="dropzone-file" on:change={handleFileInput} type="file" class={file ? "hidden z-[-1]" : "hidden"} />
                                    </label>
                            </div> 
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" value={product.name} name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                            </div>
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="text" value={product.description} name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                            </div>
                            <div>
                                <label for="Stripe Price Id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Price Id</label>
                                <input type="text" value={product.stripeProductId} name="stripePriceId" id="stripePriceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="text" value={product.price} name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                            </div>
                            <div>
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Description</label>
                                <textarea name="long_description" value={product.long_description} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>
                        </div>
                    {/if}

                </div>
                <div class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button disabled={!updateMode} type="submit" data-modal-hide="staticModal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                    <div class="flex items-center justify-center">
                        <input id="default-checkbox" type="checkbox" bind:checked={updateMode} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Update Mode</label>
                    </div>
                    <button data-modal-hide="staticModal" type="submit" class="bg-red-600 rounded-lg py-2 px-5">
                        <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                    </button>
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
