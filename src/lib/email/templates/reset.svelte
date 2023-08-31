<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

    export let name = 'unknown';
    export let token = 'unknown';
    export let email = 'unknown';
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
    <Button href={`localhost:5173/email/reset?email=${email}&email_token=${token}`}>Reset</Button>
</Html>
