<script>
    import { authStore } from '../../stores/auth';
    import { urls } from '../../config';

    let username, password;

    async function login() {
        const url = urls.base + urls.auth + "/login";
        let res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();
        if (result.error === undefined) authStore.set({status: "in", user: result});
    }
</script>

<form class="container">
    <div class="form-group d-flex flex-column justify-content-center">
        <label for="username">
            Username
            <input type="text" id="username" bind:value={username}/>
        </label>    
        <label for="password1">
            Password
            <input type="password" id="password1" bind:value={password} />
        </label>
        <button class="btn btn-primary" on:click={login}>Login</button>
    </div>
</form>