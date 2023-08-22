<script>
    import "../app.css";
	import Footer from "./footer.svelte";
	import Header from "./header.svelte";
    import Clerk from '@clerk/clerk-js';
     
    const clerkFrontendApi = `pk_{{pub_key}}`;
    const clerk = new Clerk(clerkFrontendApi);
    (async () =>await clerk.load({
      // Set load options here...
    }))();

</script>

<Header />
<slot />
<Footer />
