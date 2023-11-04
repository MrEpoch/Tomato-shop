<script>
	import { cart } from "lib/local_storage";
    import CartItems from "./cart_items.svelte";

	import { fly } from "svelte/transition";
    export let closeCart;
</script>

	<div class="absolute w-screen min-h-screen top-0 right-0 z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		<div in:fly out:fly={{ duration: 100 }} class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
					<div class="pointer-events-auto w-full sm:max-w-full max-w-md">
						<div
							class="flex h-full flex-col overflow-y-scroll dark:text-white
                    dark:bg-gray-900 bg-white p-2 shadow-xl"
						>
							<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
								<div class="flex items-start justify-between">
									<h2
										class="text-lg font-medium dark:text-gray-100 text-gray-900"
										id="slide-over-title"
									>
										Shopping cart
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											on:click={closeCart}
											type="button"
											class="relative -m-2 p-2
                          dark:text-gray-800 text-gray-400 hover:text-gray-500"
										>
											<span class="absolute -inset-0.5" />
											<span class="sr-only">Close panel</span>
											<svg
												class="h-6 w-6 dark:text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>

								<div class="mt-8">
									<div class="flow-root">
										<ul role="list" class="-my-6 divide-y divide-gray-200">
											{#each $cart.items as item}
												<CartItems order={item} />
											{/each}
										</ul>
									</div>
								</div>
							</div>

							<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
								<div
									class="flex justify-between text-base font-medium dark:text-gray-100 text-gray-900"
								>
									<p>Subtotal</p>
									<p>${$cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</p>
								</div>
								<p class="mt-0.5 text-sm text-gray-500">
									Shipping and taxes calculated at checkout.
								</p>
								<div class="mt-6">
									<a
										href="/payment"
										on:click={closeCart}
										class="flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700"
										>Checkout</a
									>
								</div>
								<div class="mt-6 flex justify-center text-center text-sm text-gray-500">
									<p>
										or
										<button
											type="button"
											on:click={closeCart}
											class="font-medium text-rose-600  hover:text-rose-500"
										>
											Continue Shopping
											<span aria-hidden="true"> &rarr;</span>
										</button>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
