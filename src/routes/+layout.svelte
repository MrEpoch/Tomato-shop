<script>
	import Account from "components/account.svelte";
    import "../app.css";
	import Footer from "./footer.svelte";
	import Header from "./header.svelte";

    export let data;
</script>

<Account user={data}/>
<Header />
<slot />
<Footer />
