<script>
	import { preferences } from "lib/local_storage";
    import logo from "assets/logo.png";
    import logoDark from "assets/logo-dark.png";

</script>


<header class="h-1/6 flex justify-around dark:bg-black/90 dark:text-white/90">
    <div class="flex items-center w-20">
        <a href="/" class="flex items-center gap-5 italic font-thin text-2xl dark:text-white/90 text-black shadow-black">
            TomatoDream
            <img src={$preferences.theme === "dark" ? logoDark : logo} alt="logo" class="h-16" />
        </a>
    </div>

    <div class="flex items-center">
        <a href="/about" class="mr-6">About</a>
        <a href="/contact">Contact</a>
        <a href="/catalog" class="ml-6 duration-300 transition-all dark:border-white/50 dark:hover:border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-2xl pr-3 pl-3 p-1 border-black/60 border-solid border-[2px]">Catalog</a>
    </div>
</header>

<style lang="postcss">
    header {
        height: 80px;
    }
</style>
