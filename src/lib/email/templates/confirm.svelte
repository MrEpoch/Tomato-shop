<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

    export let name = 'unknown';
    export let token = 'unknown';

</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
    <Button href={`https://www.tomatodream.store/email/verify?email_token=${token}`}>Confirm your email</Button>
</Html>
