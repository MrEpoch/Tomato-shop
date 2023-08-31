<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

    export let name = 'unknown';
    export let token = 'unknown';

// https://tomato-shop-eifc.vercel.app/
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
    <Button href={`http://localhost:5173/email/verify?email_token=${token}`}>Confirm your email</Button>
</Html>
