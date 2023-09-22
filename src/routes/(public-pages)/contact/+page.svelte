<script>
	import Tomato from 'assets/tomate-full.png';
</script>

<div
	class="min-h-screen dark:bg-black/10 dark:text-white/90 w-full flex items-center flex-col justify-center"
>
	<div class="flex flex-col w-full items-center h-full">
		<div class="flex flex-col gap-5 items-center w-full h-full">
			<h1 class="text-7xl max-[800px]:text-4xl mt-[10rem] font-thin">Contact Us</h1>
			<p class="text-xl dark:text-white/60 font-light text-gray-500/90">We are here to help you.</p>
			<div class="flex mt-[10rem] gap-[3rem] max-[500px]:gap-[1rem] justify-around items-center">
				<a href="https://stencukpage.com/"
					class="max-[500px]:text-sm max-[500px]:px-4 max-[500px]:py-3 border-red-500 dark:border-red-700 dark:text-white/90 border-[2px] hover:text-white hover:bg-red-500 dark:hover:bg-red-700 transition-all text-black font-bold py-4 px-8 rounded-full"
				>
					Contact Us
				</a>
				<a href="/catalog"
					class="max-[500px]:text-sm max-[500px]:px-4 max-[500px]:py-3 bg-red-500 dark:hover:bg-red-800 dark:hover:border-red-800 dark:bg-red-700 dark:border-red-700 border-red-500 border-[2px] hover:bg-red-600 transition-all text-white font-bold py-4 px-8 rounded-full"
				>
					See Products
				</a>
			</div>
		</div>
	</div>
	<img src={Tomato} alt="tomato" class="object-contain" />
</div>
