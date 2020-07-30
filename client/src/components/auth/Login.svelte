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
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="password" bind:value={password}>
        </div>
        <button type="submit" class="mx-auto w-100 btn btn-primary" on:click={login}>Login</button>
    </div>
</div>