<script lang="ts">
	import { cart, preferences } from 'lib/local_storage';
	import CartItems from './cart_items.svelte';
	import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

	async function handleTheme() {
		if (browser) {
            await fetch(`/api-public/theme?theme=${$preferences.theme === 'dark' ? false : true}`);
			preferences.update((p) => {
				p.theme = $preferences.theme === 'dark' ? 'light' : 'dark';
				return p;
			});
		}
	}

	export let user;
	export let hidden;

	let shown = false;
	let hiddenCart = true;

	function handleClick() {
		if (user.user) return (shown = !shown);
		goto('/signin');
	}

	async function handleLogOut() {
		await fetch('/logout');
		goto('/');
		shown = false;
		hidden = true;
	}

	function showCart() {
		hiddenCart = false;
	}

	function closeCart() {
		hiddenCart = true;
		hidden = true;
	}
</script>

<button on:click={handleClick}>
	<svg class="w-8 md:w-10 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><title>account-circle</title><path
			fill="currentColor"
			d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
		/></svg
	>
</button>
<button on:click={handleTheme}>
	<svg class="w-8 md:w-10 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><title>brightness-4</title><path
			fill="currentColor"
			d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
		/></svg
	>
</button>
<button on:click={showCart}>
	<svg class="w-8 md:w-10 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><title>cart-outline</title><path
			fill="currentColor"
			d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
		/></svg
	>
</button>
{#if !hiddenCart}
	<div
		id="staticModal"
		data-modal-backdrop="static"
		aria-hidden="true"
		class="top-0 left-0 right-0 z-50 flex justify-center fixed w-screen h-[calc(100%-5rem)] max-h-full"
	>
		<button on:click={closeCart} class="min-h-screen w-screen z-[52] fixed cursor-default" />
		<div class="relative scroll-element-modal overflow-y-auto w-full max-w-2xl">
			<form class="relative bg-white rounded-lg shadow z-[53] dark:bg-gray-700">
				<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cart</h3>
					<button
						on:click={showCart}
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="staticModal"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<div class="flex flex-col p-6 justify-center items-center space-y-6">
					{#each $cart.items as order}
						<CartItems {order} />
					{/each}
				</div>
				<div
					class="flex flex-wrap gap-3 items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<button
						on:click={closeCart}
						class="text-white text-start bg-gray-500 hover:bg-gray-800 sm:py-2 py-2 px-3 sm:px-5 font-medium rounded-lg text-xs sm:text-sm"
						>Continue Shopping</button
					>
					<a
						href="/payment"
						on:click={closeCart}
						class="bg-blue-700 text-white hover:bg-blue-800 dark:text-white/90 rounded-lg sm:text-sm sm:py-2 py-2 px-3 text-xs sm:px-5"
						>Proceed to Pay</a
					>
				</div>
			</form>
		</div>
	</div>
{/if}

{#if shown}
	<button
		class="fixed min-h-screen w-screen top-0 left-0 z-5 cursor-default bg-black/50"
		on:click={handleClick}
	/>
	<div class="z-10 absolute bottom-10 md:top-10 right-14">
		<div class="bg-white dark:bg-black/90 rounded-[5px] shadow-lg">
			<div class="flex flex-col">
				<div class="flex flex-row justify-between">
					<div class="flex flex-col">
						{#if user.admin}
							<a
								href="/admin"
								on:click={handleClick}
								class="flex justify-between cursor-pointer dark:text-white/90 hover:bg-gray-500/10 z-10 bg-gray-500/5 p-5 w-full text-gray-700 font-semibold gap-[1rem] transition-all duration-300"
							>
								<span>Admin</span>
								<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
									><title>plus</title><path
										fill="currentColor"
										d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
									/></svg
								>
							</a>
						{/if}
						<a
							href="/account"
							on:click={handleClick}
							class="flex justify-between cursor-pointer dark:text-white/90 hover:bg-gray-500/10 z-10 bg-gray-500/5 p-5 w-full text-gray-700 font-semibold gap-[1rem] transition-all duration-300"
						>
							<span>Settings</span>
							<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><title>cog-outline</title><path
									fill="currentColor"
									d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"
								/></svg
							>
						</a>
						<button
							on:click={handleLogOut}
							class="flex justify-between dark:text-white/90 cursor-pointer hover:bg-gray-500/10 z-10 bg-gray-500/5 p-5 w-full text-gray-700 font-semibold gap-[1rem] transition-all duration-300"
						>
							<span>Log Out</span>
							<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><title>logout-variant</title><path
									fill="currentColor"
									d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
								/></svg
							>
						</button>
					</div>
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
		background: slategray;
	}

	.scroll-element-modal::-webkit-scrollbar-thumb {
		background-color: black;
		border-radius: 14px;
		border: 3px solid var(--primary);
	}
</style>
