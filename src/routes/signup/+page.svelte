<script>
	import { goto } from "$app/navigation";
    import { pb } from "$lib/pockebase";

    let username;
    let email;
    let password;
    let passwordConfirm;
    
    let confirmPasswordField;
    let fileInput;

    function checkPassword() {
        if (password !== passwordConfirm) {
            confirmPasswordField.setAttribute("aria-invalid", 'true')
        } else {
            confirmPasswordField.setAttribute("aria-invalid", 'false')
        }
    }

    // come back to this later
    async function login() {
        await pb.collection('users').authWithPassword(username, password)
    }
    
    async function signUp() {
        const avatar = fileInput[0];

        const data = new FormData();
        data.append('username', username)
        data.append('password', password)
        data.append('passwordConfirm', passwordConfirm)
        data.append('email', email)
        data.append('avatar', avatar)

        await pb.collection('users').create(data);
        await login()
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
            Email
            <input type="email" placeholder="Email" bind:value={email}>
        </label>
        <label>
            Password
            <input type="password" placeholder="Password" bind:value={password} minlength="8">
        </label>
        <label>
            Confirm Password
            <input 
                class="confirmPassword" 
                type="password" 
                placeholder="Confirm Password" 
                bind:value={passwordConfirm} 
                bind:this={confirmPasswordField}
                on:keyup={checkPassword}
                on:change={checkPassword}
            >
        </label>
        <label>
            Profile Picture
            <input type="file" 
                bind:files={fileInput}
                accept="image/*"
            >
        </label>
        <button on:click={signUp}>Sign Up</button>
        <a href="/login">Already signed up? Login</a>
    </form>
</article>