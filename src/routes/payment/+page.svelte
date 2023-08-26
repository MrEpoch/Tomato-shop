<script lang="ts">
	import CartItems from "components/cart_items.svelte";
    import { cart } from "lib/local_storage";
 
</script>

<div class="flex justify-center min-h-screen w-full dark:bg-black/90 px-10 dark:text-white/90">
            <form class="relative rounded-lg shadow w-full dark:bg-black/50 bg-red mt-[5rem]">
                <div class="flex flex-col p-6 h-full space-y-6 ">
                    {#each $cart.items as order}
                        <CartItems {order} />
                    {/each}
                </div>
            </form>
</div>
