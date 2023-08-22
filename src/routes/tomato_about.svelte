
<script>
	import AboutCard from "components/about_card.svelte";

    const about_cards = [
        {
            title: "Our Goals",
            content: "We are a company that has been working in the tomato industry for over 20 years. We have a lot of experience and we know what we are doing. We are a company that has been working in the tomato industry for over 20 years. We have a lot of experience and we know what we are doing. We are a company that has been working in the tomato industry for over 20 years. We have a lot of experience and we know what we are doing. We are a company that has been working in the tomato industry",
            image: "/src/assets/tomato-cherry.jpg"
        },
        {
            title: "Where we come from?",
            content: "Nestled at the heart of lush, sun-kissed fields, [Company Name] blossomed from a seed of inspiration to a flourishing testament of dedication. Founded by a team of visionary food enthusiasts, our company emerged with a singular aim: to redefine the way you savor tomatoes. With a reverence for tradition and an eye toward innovation, we have meticulously curated every step of our tomato's journey, from seed to harvest.",
            image: "/src/assets/tomato-green.jpg"
        },
        {
            title: "Sustainability in Every Seedling",
            content: "We believe that tending to our planet is as vital as nurturing our tomatoes. Guided by a steadfast commitment to sustainability, our farming practices are designed to minimize our ecological footprint. From efficient irrigation systems to responsible packaging choices, our dedication to the environment is an inherent part of our tomato journey.",
            image: "/src/assets/tomato-cherry.jpg"
        }
    ]
</script>


<AboutCard {about_cards} />
