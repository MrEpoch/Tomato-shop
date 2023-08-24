<script lang="ts">
    export let user;
    
    let hidden = true;

    function openModal() {
        hidden = false;
    }

    function closeModal() {
        hidden = true;
    }

    function handleFileInput(event) {
        file = event.target.files[0];
    }

    let file = null;

</script>

<button on:click={openModal} class="w-full rounded-3xl max-w-[250px] h-[250px] flex items-center justify-center from-red-300 to-rose-900  bg-gradient-to-br hover:scale-105 duration-500 cursor-pointer transition-transform">
        <svg class="w-16 dark:text-white/90 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
</button>

{#if !hidden}

<div aria-hidden="true" class={"fixed overflow-x-hidden overflow-y-auto top-0 left-0 flex justify-center right-0 z-50 p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full"}>
    <button on:click={closeModal} tabindex="-5" class="h-screen w-screen fixed cursor-default"></button>
    <div class="relative w-full scroll-element-modal max-w-lg max-h-full overflow-y-scroll z-[51]">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <button on:click={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create New Product</h3>
                <form method="POST" class="space-y-6" enctype="multipart/form-data" action="?/create">             
                    <div class="flex items-center justify-center w-full relative">
                            <label for="dropzone-file" class={file ? "border-0 relative bg-transparent flex flex-col items-center justify-center w-full h-64  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" : " flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
                                {#if file}
                                    <button on:click={() => file = null} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>

                                    <img class="w-full h-full " src={URL.createObjectURL(file)} alt="Product" />
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
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div>
                        <label for="Stripe Price Id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Price Id</label>
                        <input type="text" name="stripePriceId" id="stripePriceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div>
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Description</label>
                        <textarea name="long_description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Product</button>
                </form>
            </div>
        </div>
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
