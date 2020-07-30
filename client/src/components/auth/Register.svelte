<script>
    import { navigate } from "svelte-routing";
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
        if (result.error !== undefined) navigate("/", { replace: true });
    }
    
</script>

<style>
    .container {
        padding-top: 5rem;
    }

    input {
        margin-bottom: 1rem;
    }

    button[type=submit] {
        margin-top: 1rem;
    }
</style>

<div class="container">
    <div class="w-50 mx-auto form-group row">
        <label for="username" class="col-sm-2 col-form-label">Username</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="username" bind:value={username}>
        </div>
        <label for="password1" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="password1" bind:value={password1}>
        </div>
        <label for="password2" class="col-sm-2 col-form-label">Repeat password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="password2" bind:value={password2}>
        </div>
        <button type="submit" class="mx-auto w-100 btn btn-primary" on:click={register}>Login</button>
    </div>
</div>