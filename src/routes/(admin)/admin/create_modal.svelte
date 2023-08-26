<script lang="ts">
	import { products } from "lib/local_storage";
	import CreateModalForm from "./create_modal-form.svelte";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();    

    let hidden = true;
    let form;
    export let message;

    function openModal() {
        hidden = false;
    }

    function closeModal() {
        hidden = true;
    }

    function handleFileInput(event) {
        file = event.target.files[0];
    }


    async function handleCreate(event) {
        try {
            const data = new FormData(this);
            
            const product_res = await fetch(this.action, {
                method: "POST",
                body: data
            });

            const product = await product_res.json();
            console.log(product);
            console.log($products.items[0]);
            hidden = true;
            dispatch("loadcards");
            message = "success";
            file = null;
        } catch (e) {
            message = "failure"
            console.log(e);
        }
    }

    let file = null;

</script>

<button on:click={openModal} class="w-full rounded-3xl max-w-[250px] h-[250px] flex items-center justify-center from-red-300 to-rose-900  bg-gradient-to-br hover:scale-105 duration-500 cursor-pointer transition-transform">
        <svg class="w-16 dark:text-white/90 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
</button>

{#if form?.success}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{form.success}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button on:click={() => form.success = ""}>
            <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.641 3.641a.5.5 0 0 1-.707.707L10 10.707l-3.641 3.641a.5.5 0 0 1-.707-.707L9.293 10 5.652 6.359a.5.5 0 0 1 .707-.707L10 9.293l3.641-3.641a.5.5 0 0 1 .707 0z"/>
            </svg>
            </button>
        </span>
    </div>
{:else if form?.error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{form.error}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button on:click={() => form.error = ""}>
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.641 3.641a.5.5 0 0 1-.707.707L10 10.707l-3.641 3.641a.5.5 0 0 1-.707-.707L9.293 10 5.652 6.359a.5.5 0 0 1 .707-.707L10 9.293l3.641-3.641a.5.5 0 0 1 .707 0z"/>
            </svg>
            </button>
        </span>
    </div>
{/if}

{#if !hidden}
<div aria-hidden="true" class={"fixed overflow-x-hidden overflow-y-auto top-0 left-0 flex justify-center right-0 z-50 p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full"}>
    <button on:click={closeModal} tabindex="-5" class="min-h-screen w-screen fixed cursor-default"></button>
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
                <form method="POST" on:submit|preventDefault={handleCreate} class="space-y-6" enctype="multipart/form-data" action="?/create">             
                    <CreateModalForm {file} {handleFileInput} />
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
      border: 3px solid var(--primary);
    }
</style>
