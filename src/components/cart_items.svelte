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

{#if mini}
	<div
		class={`w-full gap-3 items-center justify-around h-16 flex ${
			mini ? 'flex-row' : 'flex-col sm:flex-row'
		}`}
	>
		<input type="hidden" name="id" value={order.id} />
		<div class={`${mini ? 'sm:w-1/5 w-1/3' : 'w-1/5'} flex justify-center items-center`}>
			<img
				src={order.image}
				alt=""
				class={`${mini ? 'sm:w-16 w-12 h-12 sm:h-16' : 'w-16 h-16'} object-cover rounded-lg`}
			/>
		</div>
		<div class={`${mini ? 'sm:w-1/5 w-1/3' : 'w-1/5'} flex justify-center items-center`}>
			<h3 class="text-sm md:text-xl font-semibold text-gray-900 dark:text-white">
				{order.name.length < (mini ? 12 : 20)
					? order.name
					: order.name.substring(0, (mini ? 12 : 20) - 3) + '...'}
			</h3>
		</div>
		<div class={`w-1/5 ${mini ? 'hidden sm:flex' : 'flex'} justify-center items-center`}>
			<p class="text-gray-500 text-sm dark:text-gray-300">
				${order.price}
			</p>
		</div>
		<div
			class={`text-gray-500 ${
				mini ? 'hidden w-1/5 sm:flex' : 'flex'
			} justify-center dark:text-gray-300 items-center`}
		>
			<button
				on:click={() => {
					quantity--;
					quantityUpdate();
				}}
				class="bg-blue-700 text-white hover:bg-blue-800 dark:text-white/90 rounded-lg p-1"
				type="button"
			>
				<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>minus</title><path fill="currentColor" d="M19,13H5V11H19V13Z" /></svg
				>
			</button>
			<p class="px-3">{quantity}</p>
			<button
				on:click={() => {
					quantity++;
					quantityUpdate();
				}}
				class="bg-blue-700 text-white hover:bg-blue-800 dark:text-white/90 rounded-lg p-1"
				type="button"
			>
				<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>plus</title><path
						fill="currentColor"
						d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
					/></svg
				>
			</button>
		</div>
		<div class={`${mini ? 'sm:w-1/7 w-1/5' : 'w-1/7'} flex justify-center items-center`}>
			<button
				on:click={updateCart}
				class="text-gray-500 bg-red-500 flex items-center p-2 rounded-md py-1 dark:text-gray-300"
				type="submit"
				name="action"
				value="remove"
			>
				<svg class="text-white/90 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>delete</title><path
						fill="currentColor"
						d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
					/></svg
				>
			</button>
		</div>
	</div>
{:else}
	<div class="flex flex-col sm:gap-[3rem] gap-[1rem] sm:flex-row items-center justify-between">
		<input type="hidden" name="id" value={order.id} />
		<div class="flex sm:w-1/4 justify-center items-center">
			<img src={order.image} alt="" class="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg" />
		</div>
		<div class="flex sm:w-1/4 flex-col justify-center items-center sm:items-start">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
				{order.name.length < 13 ? order.name : order.name.substring(0, 13 - 3) + '...'}
			</h3>
			<p class="text-gray-500 text-sm dark:text-gray-300">
				${order.price}
			</p>
		</div>
		<div class="sm:w-1/4 flex justify-center items-center">
			<button
				on:click={() => {
					quantity--;
					quantityUpdate();
				}}
				class="bg-blue-700 text-white hover:bg-blue-800 dark:text-white/90 rounded-lg p-1"
				type="button"
			>
				<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>minus</title><path fill="currentColor" d="M19,13H5V11H19V13Z" /></svg
				>
			</button>
			<p class="px-3">{quantity}</p>
			<button
				on:click={() => {
					quantity++;
					quantityUpdate();
				}}
				class="bg-blue-700 text-white hover:bg-blue-800 dark:text-white/90 rounded-lg p-1"
				type="button"
			>
				<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>plus</title><path
						fill="currentColor"
						d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
					/></svg
				>
			</button>
		</div>
		<div class="flex sm:w-1/4 justify-center items-center">
			<button
				on:click={updateCart}
				class="text-gray-500 bg-red-500 flex items-center p-2 rounded-md py-1 dark:text-gray-300"
				type="submit"
				name="action"
				value="remove"
			>
				<svg class="text-white/90 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>delete</title><path
						fill="currentColor"
						d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
					/></svg
				>
			</button>
		</div>
	</div>
{/if}
