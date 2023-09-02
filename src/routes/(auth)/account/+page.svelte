<script lang="ts">
	export let data;
    let user_data: any = data.user;
    let user_name: any = user_data.fullName ? user_data.fullName : user_data.githubUsername ? user_data.githubUsername : ''; 
</script>

<div class="min-h-screen dark:bg-black/90 dark:text-white/90 w-full flex flex-col">
	<div class="flex flex-col mt-14 items-center gap-[5rem] w-full">
		<h2 class="sm:text-5xl text-center text-2xl font-light dark:text-white/90 text-gray-800">
			Welcome, {user_data.fullName.length < 20
				? user_data.fullName
				: user_data.fullName.substring(0, 20 - 3) + '...'}
		</h2>
		<div class="flex w-full flex-col items-center gap-4">
			<label for="name" class="text-2xl dark:text-white/90 font-light text-gray-800"
				>Full Name</label
			>
			<div class="flex p-6 w-full justify-center items-center gap-5">
				<input
					value={user_name}
					type="text"
					id="email"
					name="full_name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] sm:w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="John Doe"
					required
				/>
			</div>
		</div>
		<div class="flex w-full flex-col items-center gap-4">
			<label for="name" class="text-2xl dark:text-white/90 font-light text-gray-800">Email</label>
			<div class="flex p-6 w-full justify-center items-center gap-5">
				<input
					value={user_data.email}
					type="email"
					id="email"
					name="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] sm:w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Johh@doe.com"
					required
				/>
			</div>
		</div>
		<div class="flex w-full flex-col items-center gap-4">
			<a
				href="/password-change"
				class="mt-4 flex items-center text-lg py-2 border-2 border-gray-800 rounded-lg p-4 text-center"
			>
				Change Password
				<svg class="w-6 dark:text-white/90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><title>chevron-right</title><path
						fill="currentColor"
						d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
					/></svg
				>
			</a>
		</div>
	</div>
</div>
