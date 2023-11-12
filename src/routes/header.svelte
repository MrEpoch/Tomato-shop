<script>
	import logo from 'assets/logo.webp';
	import logoDark from 'assets/logo-dark.webp';
	import { fly } from 'svelte/transition';
	import { cart, preferences } from 'lib/local_storage';
	import Cart from 'components/Cart.svelte';

	export let theme;
	let hidden = true;

	async function handleTheme() {
		preferences.update((p) => {
			p.theme = $preferences.theme === 'dark' ? 'light' : 'dark';
			return p;
		});
	}

	let hiddenCart = true;

	function showCart() {
		hiddenCart = false;
	}

	function closeCart() {
		hiddenCart = true;
	}
</script>

<header
	class={`flex-row flex items-center justify-around px-[1rem] md:px-0 dark:bg-black/10 dark:text-white/90`}
>
	<div class="flex h-full w-full items-center md:pt-0 md:pl-0 md:w-20">
		<a
			href="/"
			class="flex items-center gap-3 md:gap-5 italic font-thin text-xl md:text-2xl dark:text-white/90 text-black shadow-black"
		>
			TomatoDream
			<img src={theme ? logoDark : logo} alt="logo" class="h-10 md:h-16" />
		</a>
	</div>
	<button
		on:click={() => (hidden = !hidden)}
		type="button"
		class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
		aria-controls="navbar-default"
		aria-expanded="false"
	>
		<span class="sr-only">Open main menu</span>
		<svg
			class="w-6 h-6"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 17 14"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 1h15M1 7h15M1 13h15"
			/>
		</svg>
	</button>
	<div class={`hidden items-center xl:flex`}>
		<ul class="flex flex-col w-full gap-[2rem] items-center xl:flex-row">
			<li>
				<a href="/" data-sveltekit-preload-data>Home</a>
			</li>
			<li>
				<a href="/about" data-sveltekit-preload-data>About</a>
			</li>
			<li>
				<a href="/contact">Contact</a>
			</li>
			<li>
				<button on:click={showCart} class="flex relative items-center">
					<svg class="w-6 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>Cart</title><path
							fill="currentColor"
							d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
						/></svg
					>
					{#if $cart.items.length > 0}
						<div
							class="absolute inline-flex items-center justify-center w-6 h-6
                        text-xs font-bold text-gray-100 bg-red-600 border-2 border-white rounded-full
                        -top-3 -right-4 dark:border-gray-900"
						>
							{$cart.items.length}
						</div>
					{/if}
				</button>
			</li>
			{#if !hiddenCart}
				<Cart {closeCart} />
			{/if}
			<li>
				<a data-sveltekit-preload-data href="/account" class="flex items-center">
					<svg class="w-6 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>Acccount</title><path
							fill="currentColor"
							d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
						/></svg
					>
				</a>
			</li>
			<li>
				<button on:click={handleTheme} class="flex items-center">
					<svg class="w-6 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>Theme Change</title><path
							fill="currentColor"
							d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
						/></svg
					>
				</button>
			</li>

			<li>
				<a
					data-sveltekit-preload-data
					href="/catalog"
					class=" w-full
                dark:hover:border-[2px] dark:hover:border-red-700
                dark:hover:bg-red-700 dark:border-white/50
                hover:border-red-500 hover:bg-red-500 hover:text-white
                rounded-2xl pr-3 pl-3 p-1 border-black/60
                border-solid hover:border-[2px] border-[2px]">Catalog</a
				>
			</li>
		</ul>
	</div>
</header>
{#if !hidden}
	<div
		in:fly={{ y: 50, duration: 300 }}
		out:fly={{ y: 0, duration: 300 }}
		class={`flex xl:hidden w-full dark:bg-black/10 dark:text-white/90 items-center border-b-red-700 border-b-[2px]`}
	>
		<ul class="flex flex-col w-full p-4 md:p-0 mt-4 gap-[3rem] items-center">
			<li class="w-full flex">
				<a
					on:click={() => (hidden = true)}
					data-sveltekit-preload-data
					href="/about"
					class="text-xl text-center w-full font-light">About</a
				>
			</li>
			<li class="w-full flex">
				<a
					on:click={() => (hidden = true)}
					href="/contact"
					class="text-xl w-full text-center font-light">Contact</a
				>
			</li>
			<li class="w-full flex">
				<a
					on:click={() => (hidden = true)}
					data-sveltekit-preload-data
					href="/catalog"
					class="text-xl text-center w-full mb-3 font-light">Catalog</a
				>
			</li>
			<li class="w-full flex">
				<button
					on:click={showCart}
					class="text-xl flex justify-center text-center w-full mb-3 font-light"
				>
					<svg
						class="w-8 md:w-10 dark:text-white/90"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><title>Cart</title><path
							fill="currentColor"
							d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
						/></svg
					>
					{#if $cart.items.length > 0}
						<div class="relative">
							<div
								class="absolute inline-flex items-center justify-center w-6 h-6
                        text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full
                        -top-2 -right-2 dark:border-gray-900"
							>
								{$cart.items.length}
							</div>
						</div>
					{/if}
				</button>
			</li>
			{#if !hiddenCart}
				<Cart {closeCart} />
			{/if}
			<li class="w-full flex">
				<a href="/account" class="text-xl flex justify-center text-center w-full mb-3 font-light">
					<svg
						class="w-8 md:w-10 dark:text-white/90"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><title>Acccount</title><path
							fill="currentColor"
							d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
						/></svg
					>
				</a>
			</li>
			<li class="w-full flex">
				<button
					on:click={handleTheme}
					class="text-xl flex justify-center text-center w-full mb-3 font-light"
				>
					<svg
						class="w-8 md:w-10 dark:text-white/90"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><title>Theme Change</title><path
							fill="currentColor"
							d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
						/></svg
					>
				</button>
			</li>
		</ul>
	</div>
{/if}

<style lang="postcss">
	header {
		height: 80px;
	}
</style>
