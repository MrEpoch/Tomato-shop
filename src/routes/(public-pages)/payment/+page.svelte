<script lang="ts">
	import CartItems from 'components/cart_items.svelte';
	import { cart } from 'lib/local_storage';
	import Stepper from './stepper.svelte';
	import OrderInfo from './order_info.svelte';
	import { browser } from '$app/environment';
	import { globalError } from 'lib/stores';

	let currentStep = 1;
	export let form;
	export let data;

	if (form?.url) {
		browser && wait(2000).then(() => window.location.replace(form.url));
	}

	async function wait(time) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(time);
			}, time);
		});
	}

	if (form?.success) {
		currentStep = 3;
	}

	if (data && data?.errorC) {
		$globalError = data?.errorC;
	}
</script>

<div
	class="flex flex-col gap-[2rem] py-[5rem] items-center min-h-screen w-full dark:bg-black/10 px-4 sm:px-10 dark:text-white/90"
>
	{#if currentStep < 3}
		<Stepper goNext={() => (currentStep = 2)} returnToPrev={() => currentStep--} {currentStep} />
	{/if}
	{#if currentStep === 1}
		<div class="relative flex flex-col rounded-lg h-full shadow w-full dark:bg-black/50">
			<div class="flex gap-[2rem] flex-col shadow p-6 h-full space-y-6">
				{#each $cart && $cart.items as order}
					<CartItems {order} />
				{/each}
			</div>
			<div class="flex justify-between w-full p-6">
				<p class="font-semibold">Subtotal:</p>
				<p class="font-semibold">
					${$cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
				</p>
			</div>
		</div>
		<button
			class="bg-rose-500 w-fit hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
			on:click={() => (currentStep = 2)}>Next</button
		>
	{:else if currentStep === 2}
		<form action="?/order" method="POST">
			<OrderInfo />
		</form>
	{:else if currentStep === 3}
		<div class="flex flex-col gap-[4rem] items-center justify-center w-full min-h-screen">
			<div
				class="animate-spin text-black dark:text-white rounded-full h-32 w-32 border-b-2 border-gray-red"
			/>
			<p class="text-2xl font-bold mt-4">Redirecting to Stripe</p>
		</div>
	{/if}
</div>
