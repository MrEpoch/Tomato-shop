<script lang="ts">
	import { cart } from 'lib/local_storage';
	import { onDestroy } from 'svelte';

	export let order;
	let quantity = order.quantity;

	export let mini = true;

	function updateCart() {
		cart.update((value) => {
			const index = value.items.findIndex((item) => item.id === order.id);
			if (index === -1) {
				return value;
			}
			value.items.splice(index, 1);
			return value;
		});
	}

	function quantityUpdate() {
		if (quantity > 20) {
			return (quantity = 20);
		}
		cart.update((value) => {
			const index = value.items.findIndex((item) => item.id === order.id);
			if (index === -1) {
				return value;
			}
			value.items[index].quantity = quantity;
			return value;
		});
	}

	const unsubscribe = cart.subscribe(async (value) => {
		try {
			await fetch('/cart/update', {
				method: 'POST',
				body: JSON.stringify({
					cart: value.items
				})
			});
		} catch (err) {
			console.log(err);
		}
	});

	onDestroy(unsubscribe);
</script>

<div class="flex relative w-full justify-between min-h-[18rem] p-2">
    <div class="min-h-full sm:w-1/4 min-w-1/5 items-center flex">
        <img src={order.image} class="aspect-square w-full min-w-[100px] max-[380px]:min-w-[90px] max-w-[120px] object-cover" alt={order.name} />
    </div>
    <div class="sm:min-w-1/2  w-full flex flex-col justify-center p-4 gap-3">
        <p class="font-bold text-lg whitespace-nowrap">
            {order.name.length < 20 ? order.name : order.name.substring(0, 20 - 3) + '-'}
        </p>
        <p class="text-sm text-gray-400">{order.description}</p>
        <div class="flex items-center rounded border-black border-2 w-fit">
            <button class="text-black border-black border-r-2 dark:text-white/90 mr-2" on:click={() => { quantity--; quantityUpdate() }}>
                <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>minus</title>
                    <path fill="currentColor" d="M5,13V12H18V13H5Z" />
                </svg>
            </button>
            <p class="font-normal text-lg text-center min-w-[2rem]">{order.quantity}</p>
            <button class="ml-2 border-l-2 border-black" on:click={() => { quantity++; quantityUpdate() }}>
                <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>plus</title>
                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="w-fit flex items-center bottom-5 gap-3 absolute right-10 
        h-fit justify-center">
        <p class="font-bold text-xl">${order.price}</p>
        <button on:click={updateCart} class="text-blue-700 text-lg font-semibold">Remove</button>
    </div>
</div>
