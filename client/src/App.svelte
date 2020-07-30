<script>
  import { authStore, logout } from "./stores/auth";
  authStore.useLocalStorage();
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Login from "./components/auth/Login.svelte";
  import Register from "./components/auth/Register.svelte";

  export let url = "";
  export let name;
  
</script>

<style>
	.username {
		margin-right: 0.5rem;
	}

	.navbar-nav .link:first-child {
		margin-right: 0.5rem;
	}
</style>

<Router {url}>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand text-light" href="#">EDirectInsure TODO List</a>
    <div class="navbar-nav ml-auto">
      {#if $authStore.user}
		<p class="link text-light">{$authStore.user.username}</p>
		<a href="#" on:click={logout}>Logout</a>
      {:else}
        <div class="link"><Link to="/">Login</Link></div>
        <div class="link"><Link to="register">Register</Link></div>
      {/if}
    </div>
  </nav>
  <div>
    {#if $authStore.user !== undefined}
      <Home user={$authStore.user} />
    {:else}
      <Route path="register" component={Register} />
      <Route path="/" component={Login} />
    {/if}
  </div>
</Router>
