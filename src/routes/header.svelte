<script>
	import { preferences } from "lib/local_storage";
    import logo from "assets/logo.png";
    import logoDark from "assets/logo-dark.png";

    let hidden = true;

</script>


<header class={`flex-row flex items-center justify-around px-[1rem] md:px-0 dark:bg-black/90 dark:text-white/90`}>
    <div class="flex h-full w-full items-center md:pt-0 md:pl-0 md:w-20">
        <a href="/" class="flex items-center gap-3 md:gap-5 italic font-thin text-xl md:text-2xl dark:text-white/90 text-black shadow-black">
            TomatoDream
            <img src={$preferences.theme === "dark" ? logoDark : logo} alt="logo" class="h-10 md:h-16" />
        </a>
    </div>
    <button on:click={() => hidden = !hidden} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`hidden items-center md:flex`}>
      <ul class="flex flex-col w-full p-4 md:p-0 mt-4 gap-[1rem] items-center  md:flex-row md:space-x-8 ">
        <li>
          <a href="/about" class="">About</a>
        </li>
        <li>
          <a href="/contact" class="">Contact</a>
        </li>
        <li>
            <a href="/catalog" class="
                duration-300 transition-all dark:hover:border-0
                md:dark:hover:border-red-700 dark:hover:bg-red-700 dark:border-white/50 
                hover:border-red-500 hover:bg-red-500 hover:text-white 
                rounded-2xl pr-3 pl-3 p-1 border-black/60 
                border-solid border-[2px]">Catalog</a>
        </li>
      </ul>
    </div>
</header>
{#if !hidden}
<div class={`flex md:hidden w-full dark:bg-black/90 dark:text-white/90 items-center border-b-red-700 border-b-[2px]`}>
      <ul class="flex flex-col w-full p-4 md:p-0 mt-4 gap-[3rem] items-center">
        <li>
          <a href="/about" class="text-xl font-light">About</a>
        </li>
        <li>
          <a href="/contact" class="text-xl font-light">Contact</a>
        </li>
        <li>
            <a href="/catalog" class="text-xl mb-3 font-light">Catalog</a>
        </li>
      </ul>
</div>
{/if}

<style lang="postcss">
    header {
        height: 80px;
    }
</style>
