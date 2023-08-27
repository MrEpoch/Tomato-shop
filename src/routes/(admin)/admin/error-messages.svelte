<script lang="ts">
    export let message;
</script>

{#if message === "failure"}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">Test</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button on:click={() => message = ""}>
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1 1 0 01-1.414 0L10
                    11.414l-2.93 2.93a1 1 0 01-1.414
                    0l-.707-.707a1 1 0 010-1.414l2.93-2.93-2.93-2.93a1
                    1 0 010-1.414l.707-.707a1 1 0 011.414
                    0l2.93 2.93 2.93-2.93a1 1 0 011.414
                    0l.707.707a1 1 0 010 1.414l-2.93 2.93 2.93
                    2.93a1 1 0 010 1.414l-.707.707z"
                />
            </svg>
            </button>
        </span>
    </div>
{:else if message === "success"}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">Success it looks</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button on:click={() => message = ""}>
            <svg  class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1 1 0 01-1.414 0L10
                    11.414l-2.93 2.93a1 1 0 01-1.414
                    0l-.707-.707a1 1 0 010-1.414l2.93-2.93-2.93-2.93a1
                    1 0 010-1.414l.707-.707a1 1 0 011.414
                    0l2.93 2.93 2.93-2.93a1 1 0 011.414
                    0l.707.707a1 1 0 010 1.414l-2.93 2.93 2.93
                    2.93a1 1 0 010 1.414l-.707.707z"
                />
            </svg>
            </button>
        </span>
    </div>
{/if}
