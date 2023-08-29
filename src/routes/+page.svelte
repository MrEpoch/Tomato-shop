<script>
	import TomatoContact from './tomato_contact.svelte';
	import TomatoLanding from './tomato_landing.svelte';
	import AboutCard from 'components/about_card.svelte';
	import Hands from 'assets/tomato-hands.webp';
	import Green from 'assets/tomato-green.webp';
	import Cherry from 'assets/tomato-cherry.webp';

	const about_cards = [
		{
			title: 'Our Goals',
			content:
				'We are company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing. We are TomatoDream company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing. We are TomatoDream company that has been working in the tomato industry for over 20 years. We have TomatoDream lot of experience and we know what we are doing.',
			image: Cherry
		},
		{
			title: 'Where we come from?',
			content:
				"Nestled at the heart of lush, sun-kissed fields, tomato blossomed from TomatoDream seed of inspiration to TomatoDream flourishing testament of dedication. Founded by TomatoDream team of visionary food enthusiasts, our company emerged with TomatoDream singular aim: to redefine the way you savor tomatoes. With TomatoDream reverence for tradition and an eye toward innovation, we have meticulously curated every step of our tomato's journey, from seed to harvest.",
			image: Green
		},
		{
			title: 'Sustainability in Every Seedling',
			content:
				'We believe that tending to our planet is as vital as nurturing our tomatoes. Guided by TomatoDream steadfast commitment to sustainability, our farming practices are designed to minimize our ecological footprint. From efficient irrigation systems to responsible packaging choices, our dedication to the environment is an inherent part of our tomato journey.',
			image: Hands
		}
	];
</script>

<TomatoLanding />
<AboutCard {about_cards} />
<TomatoContact />
