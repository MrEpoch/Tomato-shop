<script>
    import Tomato from "assets/tomate-full.png";
</script>


<div class="flex flex-col w-full items-center gap-3 relative">
    <h5 class="text-6xl max-[800px]:text-4xl mt-[10rem] font-light">Tradition, action, care.</h5>
    <p class="text-2xl font-light text-gray-500">Expert's choice of year</p>
    <div class="h-[24rem] w-fit mb-[20rem]">
        <img src={Tomato} alt="tomate" class="h-full w-fit" />
    </div>
    <div class="custom-shape-divider-bottom-1692700371">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" class="shape-fill"></path>
        </svg>
    </div>
</div>


<style lang="postcss">
    h5 {
        font-family:'Times New Roman', Times, serif;
        font-weight: 100;
    }
    p {
        font-family:'Times New Roman', Times, serif;
        font-weight: 100;
        font-style: italic;
    }

    .custom-shape-divider-bottom-1692700371 {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;
    }

    .custom-shape-divider-bottom-1692700371 svg {
        position: relative;
        display: block;
        width: calc(300% + 1.3px);
        height: 221px;
    }

    .custom-shape-divider-bottom-1692700371 .shape-fill {
        fill: #EF4444;
    }
</style>
