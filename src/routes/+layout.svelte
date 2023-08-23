<script lang="ts">
	import Account from "components/account.svelte";
    import "../app.css";
	import Footer from "./footer.svelte";
	import Header from "./header.svelte";
    import { preferences } from "lib/local_storage";

    export let data;
    let dark = "";
    preferences.subscribe((value) => {
        if (value) {
            dark = value.theme;
        } else {
            dark = "";
        }
    });

</script>

<div class={"h-full w-full " + $preferences.theme}> 
    <Account user={data}/>
    <Header />
    <slot />
    <Footer />
</div>

<style>

</style>
