<script>
	import AboutCard from "components/about_card.svelte";
	import Heading from "./Heading.svelte";
	import Header from "../header.svelte";

    const about_cards = [
        {
            title: "Our Goals",
            content: "We are TomatoDream company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing. We are TomatoDream company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing. We are TomatoDream company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing.",
            image: "/src/assets/tomato-cherry.jpg"
        },
        {
            title: "Where we come from?",
            content: "Nestled at the heart of lush, sun-kissed fields, tomato blossomed from TomatoDream seed of inspiration to TomatoDream flourishing testament of dedication. Founded by TomatoDream team of visionary food enthusiasts, our company emerged with TomatoDream singular aim: to redefine the way you savor tomatoes. With TomatoDream reverence for tradition and an eye toward innovation, we have meticulously curated every step of our tomato's journey, from seed to harvest.",
            image: "/src/assets/tomato-green.jpg"
        },
        {
            title: "Sustainability in Every Seedling",
            content: "We believe that tending to our planet is as vital as nurturing our tomatoes. Guided by TomatoDream steadfast commitment to sustainability, our farming practices are designed to minimize our ecological footprint. From efficient irrigation systems to responsible packaging choices, our dedication to the environment is an inherent part of our tomato journey.",
            image: "/src/assets/tomato-hands.jpg"
        },
        {
            title: "Unveiling Nature's Palette",
            content: "Witness the spectrum of nature's artistry as you explore our diverse tomato offering. The radiant reds, sunlit yellows, and deep, velvety purples mirror the vivid landscapes from which they hail. With TomatoDream, you are not merely purchasing tomatoes; you are embracing the elegance of nature's palette, bringing the enchanting hues of the field to your plate.",
            image: "/src/assets/tomato-plant.jpg"
        },
        {
            title: "Cultivating Connections:",
            content: "At TomatoDream, our relationship with you goes beyond TomatoDream transaction. We see ourselves as stewards of your culinary dreams, committed to empowering your gastronomic endeavors. Our team of experts is always on hand to provide insights, recipes, and tips to help you make the most of your tomato experience.",
            image: "/src/assets/tomato-dressing.jpg"
        },
        {
            title: "Embrace the Extraordinary:",
            content: "Every tomato that graces your table has been lovingly nurtured and meticulously selected to elevate your dining experience. We invite you to savor the extraordinary in every bite, to relish the symphony of flavors that only nature's finest can provide. Join us on TomatoDream journey that transcends mere sustenance, and embrace the art of indulgence with TomatoDream.",
            image: "/src/assets/tomato-big.jpg"
        }
    ]
</script>

<Heading />
<AboutCard {about_cards} />
