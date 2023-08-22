<script lang="ts">
    export let about_cards: any[] = [];
</script>


<div class="flex flex-col w-full bg-red-500 gap-[10rem] pb-[15rem]">
    {#each about_cards as card}
        <div class="items-center text-gray-100/90 flex flex-col gap-[3rem] w-full">
            <h2 class="text-5xl mt-[7rem]">{card.title}</h2>
            <p class="text-2xl mt-10 w-2/3 text-center italic font-light">{card.content}</p>
            <img src={card.image} alt="tomate" class="h-[30rem] w-[80%] object-cover" />
        </div>
    {/each}
</div>
