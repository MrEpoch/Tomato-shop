<script lang="ts">
	import { globalError } from "lib/stores";

    export let data: any;
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

    if (data && data.redirectIs) $globalError = "Log In To continue"

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
    class="flex py-[5rem] dark:bg-black/10 dark:text-white/90 justify-center gap-[3rem] flex-col 
    bg-gray-100/40 items-center min-h-screen"
>
    {#if isLoading}
		<div class="flex flex-col gap-[4rem] items-center justify-center w-full min-h-screen">
			<div
				class="animate-spin text-black dark:text-white rounded-full h-32 w-32 border-b-2 border-gray-red"
			/>
		</div>
    {/if}
    <div class={`${isLoading ? 'hidden' : 'w-full h-full flex flex-col gap-[3rem] items-center justify-center'}`}>
        <h1 class="text-5xl mb-6 font-thin">Log In</h1>
        <form
            class={`dark:bg-black/20 max-w-[500px] w-full shadow bg-white relative rounded p-[3rem] sm:p-[5rem] flex flex-col gap-[3rem]`}
            method="POST"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute top-0 dark:text-white/80 left-0 translate-y-[-50px] translate-x-[10px] w-[80px] sm:w-[100px]"
                viewBox="0 0 24 24"
                ><title>shield-account</title><path
                    fill="currentColor"
                    d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"
                /></svg
            >
            <div class="flex flex-col gap-[1rem]">
                <label for="username">Username</label>
                <input
                    type="text"
                    name="username"
                    minlength="3"
                    class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3"
                    placeholder="Username"
                    required
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
            <div class="flex justify-center">
                <button
                    on:click={() => isLoading = true}
                    type="submit"
                    class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-lg hover:bg-gray-800 transition-all"
                    >Log In</button
                >
            </div>
        </form>
        <div class="w-full flex gap-6 justify-around">
            <a href="/signin/github" class="text-black text-lg dark:text-white/90 font-light hover:underline"
                >
                <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                </svg>
            </a>
        </div>
        <a href={`/account`} class="text-black text-lg dark:text-white/90 font-light hover:underline"
            >Don't have an account? Register</a
        >
    </div>
</div>
