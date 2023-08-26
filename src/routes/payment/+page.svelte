<script lang="ts">
	import CartItems from "components/cart_items.svelte";
    import { cart } from "lib/local_storage";
	import Stepper from "./stepper.svelte";
	import OrderInfo from "./order_info.svelte";
    
    let currentStep = 1;
    
</script>

<div class="flex flex-col gap-[2rem] min-h-screen w-full dark:bg-black/90 px-10 dark:text-white/90">
    <Stepper {currentStep} />
    {#if currentStep === 1}
        <div class="relative rounded-lg h-full shadow w-full dark:bg-black/50 mt-[5rem]">
            <div class="flex gap-[2rem] flex-col p-6 h-full space-y-6 ">
                {#each $cart.items as order}
                    <CartItems {order} mini={false} />
                {/each}
            </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => currentStep = 2}>Next</button>
    {:else if currentStep === 2}
        <form action="?/order" method="POST">
            <OrderInfo />
        </form>
    {/if}
</div>
