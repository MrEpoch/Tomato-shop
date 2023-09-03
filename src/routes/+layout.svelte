<script lang="ts">
	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import NavContainer from 'components/nav-container.svelte';
	import { preferences } from 'lib/local_storage';
	import { browser } from '$app/environment';

	export let data;
	$: dark = data.theme === 'true';
    console.log(data.theme);

    $: browser && (dark = $preferences.theme === 'dark');
    preferences.update((items) => {
        items.theme = data.theme.toString() === 'true' ? 'dark' : '';
        return items;
    });
</script>

<svelte:head>
    <meta name="color-scheme" content={dark ? 'dark' : 'light'} />
</svelte:head>

<div class="h-full w-full" class:dark>
    <NavContainer user={data.session} />
	<Header theme={dark} />
	<slot />
	<Footer />
</div>

<style lang="postcss">
</style>
