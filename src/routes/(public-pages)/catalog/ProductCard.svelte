<script lang="ts">
	import Card from 'components/card.svelte';
	export let product;
</script>

<a data-sveltekit-preload-data href={`/catalog/${product.id}`} class="" type="button">
	<Card {product} />
</a>
