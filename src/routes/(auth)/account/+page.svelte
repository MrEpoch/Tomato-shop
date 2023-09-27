<script lang="ts">
	import { globalError } from 'lib/stores.js';

	export let data;
	let user_data: any = data.user;

    console.log(data);
    if (data && data?.errorA) {
        $globalError = "You are not admin";
    }

</script>

<div class="min-h-screen dark:bg-black/10 dark:text-white/90 w-full flex flex-col">
	<div class="flex flex-col items-center justify-center mt-14 h-full gap-[5rem] w-full">
		<h2 class="sm:text-5xl text-center text-2xl font-light dark:text-white/90 text-gray-800">
			Welcome, {user_data.fullName.length < 20
				? user_data.fullName
				: user_data.fullName.substring(0, 20 - 3) + '...'}
		</h2>
        <a href="/logout" class="bg-gray-100 text-black dark:text-white dark:bg-gray-800 
        font-semibold rounded-xl  px-8 py-4">Logout</a>
		{#if user_data.IsPassword}
			<div class="flex w-full flex-col items-center gap-4">
				<a
					href="/password-change"
					class="mt-4 flex items-center text-lg py-2 border-2 border-gray-800 rounded-lg p-4 text-center"
				>
					Change Password
					<svg class="w-6 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						><title>Right arrow</title><path
							fill="currentColor"
							d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
						/></svg
					>
				</a>
			</div>
		{/if}
	</div>
</div>
