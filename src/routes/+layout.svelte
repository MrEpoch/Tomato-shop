<script lang="ts">
    import "../app.css";
	import Footer from "./footer.svelte";
	import Header from "./header.svelte";
	import NavContainer from "components/nav-container.svelte";
	import { preferences } from "lib/local_storage";
	import { browser } from "$app/environment";

    export let data;
    export let dark = data.theme;

    $: browser && (dark = $preferences.theme === "dark");
</script>

<div class="h-full w-full" class:dark> 
    <NavContainer user={data.isLogged} />
    <Header theme={dark} />
    <slot />
    <Footer />
</div>

<style lang="postcss">
</style>
