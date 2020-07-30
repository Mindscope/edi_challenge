<script>
    import { urls } from '../../config';

    export let location;
    let password1, password2, username;

    async function register() {
        const url = urls.base + urls.auth + "/register";
        let res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ username, password1, password2 }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        console.log(result);
    }
    
</script>

<div>
    <label for="username">
        Username
        <input type="text" id="username" bind:value={username}/>
    </label>    
    <label for="password1">
        Password
        <input type="password" id="password1" bind:value={password1} />
    </label>
    <label for="password2">
        Repeat password
        <input type="password" id="password2" bind:value={password2} />
    </label>
    <button class="btn btn-primary" on:click={register}>Register</button>
</div>