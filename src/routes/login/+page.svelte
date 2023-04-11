<script>
	import { goto } from "$app/navigation";
	import { pb } from "$lib/pockebase";

    let username;
    let password;

    export async function login() {
        await pb.collection('users').authWithPassword(username, password)
        goto('/')
    }
</script>

<article>
    <form on:submit|preventDefault>
        <label>
            Username
            <input type="text" placeholder="Username" bind:value={username}>
        </label>
        <label>
            Password
            <input type="password" placeholder="Password" bind:value={password}>
        </label>
        <button on:click={login}>Login</button>
        <a href="/signup">Don't have an account with us yet? Sign up</a>
    </form>
</article>