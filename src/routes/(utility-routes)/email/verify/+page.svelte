<script lang="ts">

    export let form;

    console.log(form);
</script>

<div class="min-h-screen dark:bg-black/90 flex dark:text-white/90 relative w-full">
    
    {#if form && form?.error && form?.error.length > 0}
        <div id="alert-2" class="flex items-center absolute bottom-5 p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div class="ml-3 text-sm font-medium">
              <span class="font-light">{form?.error}</span>
          </div>
          <button type="button" on:click={() => form.error = ""} class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>    
    {/if}

    <section class="flex items-center mb-[6rem] min-h-full w-full justify-center gap-[3rem] flex-col">
        <h1 class="text-5xl mt-[5rem] mb-6 font-thin">Email verification</h1>
        <p>Your email verification link was sent to your inbox (i.e. console).</p>
        <form method="POST">
            <button type="submit" class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-lg hover:bg-gray-800 transition-all">Resend verification link</button>
        </form>
    </section>
</div>
