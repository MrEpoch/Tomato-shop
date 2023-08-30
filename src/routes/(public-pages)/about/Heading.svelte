<script>
	import Tomatoes from 'assets/tomato-bunch.webp';
    import { lazyLoad } from 'lib';
	import { onMount } from 'svelte';

    let isAnimation = true;

</script>

<div
	class="h-[70rem] p-5 dark:bg-black/90 w-full dark:text-white/90 relative flex flex-col gap-[5rem] text-black"
>
	<h1 class="text-3xl md:text-5xl text-center font-thin mt-[10rem]">
		We love <span class="font-light">Tomatoes</span>
	</h1>
	<div class="flex flex-col items-center w-full relative">
        <a href="/catalog" class={`z-10 ${isAnimation ? "animate-pulse" : ""}  
            bg-gray-200 sm:h-[15rem] h-[10rem] lg:h-[30rem] min-w-[40%] 
            transition-transform object hover:translate-y-[-5px] hover:translate-x-[-5px]
            rounded-2xl shadow
            duration-500`}>
            <img
                use:lazyLoad={Tomatoes}
                alt="tomato"
                on:load={() => isAnimation = false}
				class="h-full rounded-lg opacity-0 w-full"
            />
        </a>
        <div class="sm:h-[15rem] h-[10rem] lg:h-[30rem] w-fit object absolute blur-[25px] sm:translate-x-20 translate-y-[45px] sm:translate-y-[35px]">
            <img
                use:lazyLoad={Tomatoes}
                alt="tomato"
				class="h-full opacity-0 w-full transition-all duration-700"
			/>
		</div>
	</div>
	<div class="custom-shape-divider-bottom-1692710190">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
				class="fill-[#EF4444] dark:fill-red-700"
			/>
		</svg>
	</div>
</div>

<style lang="postcss">
	.custom-shape-divider-bottom-1692710190 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-bottom-1692710190 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 135px;
	}

</style>
