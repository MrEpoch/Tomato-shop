<script lang="ts">
    export let form: { fail: boolean, error: string };
    let timer: any;
    let isLoading = false;

    if (form?.fail) {
        isLoading = false;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            form.fail = false
        }, 3000)
    }

</script>

{#if form?.fail}
    <div id="alert-2" class="flex fixed bottom-0 w-full items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <div class="ml-3 text-sm font-medium">
          {form?.error}
      </div>
      <button on:click={() => form.fail = false} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
{/if}

<div
	class="flex dark:text-white/90 dark:bg-black/10 justify-center gap-[3rem] flex-col bg-gray-100/40 items-center min-h-screen"
>
    {#if isLoading}
		<div class="flex flex-col gap-[4rem] items-center justify-center w-full min-h-screen">
			<div
				class="animate-spin text-black dark:text-white rounded-full h-32 w-32 border-b-2 border-gray-red"
			/>
		</div>
    {/if}
    <div class={`${isLoading ? "hidden" : ""} flex flex-col h-full w-full gap-[3rem] justify-center items-center`}>
        <h1 class="text-5xl mt-[5rem] mb-6 font-thin">Sign Up</h1>
        <form
            class="max-w-[500px] dark:bg-black/20 w-full shadow bg-white relative rounded p-[3rem] sm:p-[5rem] flex flex-col gap-[3rem]"
            method="POST"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute top-0 dark:text-white/80 left-0 translate-y-[-50px] translate-x-[10px] w-[80px] sm:w-[100px]"
                viewBox="0 0 24 24"
                ><title>Secure</title><path
                    fill="currentColor"
                    d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"
                /></svg
            >
            <div class="flex flex-col gap-[1rem]">
                <label for="name">Username</label>
                <input
                    type="text"
                    name="fullName"
                    class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
                    id="name"
                    placeholder="Full Name"
                    required
                    minlength="3"
                />
            </div>
            <div class="flex flex-col gap-[1rem]">
                <label for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
                    id="password"
                    placeholder="Password"
                    required
                    minlength="8"
                />
            </div>
            <div class="flex flex-col gap-[1rem]">
                <label for="password_confirmation">Confirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    required
                    minlength="8"
                />
            </div>
            <div class="flex justify-center">
                <button
                    type="submit"
                    class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-lg hover:bg-gray-800 transition-all"
                    >Register</button
                >
            </div>
        </form>
        <a
            href="/signin"
            class="text-black dark:text-white/90 mb-[5rem] text-lg font-light hover:underline"
            >Already have an account? Login</a
        >
    </div>
</div>
