<script>
	import { Button, Hr, Html, Img, Section, Text } from 'svelte-email';
    import Tomato from "../../../assets/tomate-full.webp";

    export let name = 'unknown';
    export let token = 'unknown';

    const button = {
		backgroundColor: '#ff5a5f',
		borderRadius: '3px',
		color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
		textDecoration: 'none',
		textAlign: 'center',
		display: 'block',
        padding: '20px',
	};

    const container = {
        margin: '0 auto',
		padding: '20px 0 48px',
    }

    const text = {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '38px',
        fontWeight: 'thin',
        color: 'black'
    }

</script>

<Html lang="en">
    <Section style={container}>
        <Text style={text}>
            Welcome, {name}!
        </Text>
        <Hr />
        <Img src={"https://www.tomatodream.store/_app/immutable/assets/tomate-full.bd07800f.webp"} width="300px" height="200px" alt="Tomato Dream Logo" />
        <Button style={button} href={`https://www.tomatodream.store/email/verify?email_token=${token}`}>Confirm your email</Button>
    </Section>
</Html>
