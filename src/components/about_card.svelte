<script lang="ts">
	import type { AboutCardType } from 'types/types';
    import { lazyLoad } from 'lib';
	export let about_cards: AboutCardType[] = [];
</script>

<div class="flex flex-col w-full dark:bg-red-700 bg-red-500 gap-[10rem] pb-[15rem] p-2">
	{#each about_cards as card}
		<div class="about__card items-center text-gray-100/90 flex flex-col gap-[3rem] w-full">
			<h2 class="text-5xl max-[800px]:text-3xl mt-[7rem] text-center">{card.title}</h2>
			<p
				class="text-2xl max-[800px]:text-sm mt-10 max-[800px]:w-full w-3/4 p-5 text-center italic text-white font-light"
			>
				{card.content}
            </p>
			<img
				use:lazyLoad={card.image}
				alt="tomate"
				class="h-[30rem] opacity-0 transition-opacity max-[800px]:h-[15rem] aspect-video object-cover"
            />
		</div>
	{/each}
</div>
