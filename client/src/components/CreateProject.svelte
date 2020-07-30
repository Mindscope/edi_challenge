<script>
    import { createEventDispatcher } from 'svelte';
    import { urls } from "../config";
    import { authStore } from "../stores/auth";

    const baseUrl = urls.base + urls.projects;
    const dispatch = createEventDispatcher();
    let name;
    let userId;
    
    authStore.subscribe((data) => {
        if (data.user !== undefined) userId = data.user.id
        else userId = undefined;
    });

    async function createProject(event) {
        const res = await fetch(baseUrl, {
			method: 'POST',
            body: JSON.stringify({name, author: userId}),
            headers: {
                'Content-Type': 'application/json'                
            },
		})
		
		const json = await res.json()
        dispatch('created', JSON.stringify(json));
    }
</script>

<div class="card text-center">
    <div class="card-body">
        <h3 class="mb-4">Create a new Project</h3>
        <div class="d-flex flex-column">
            <input class="mb-2" type="text" placeholder="Project name" bind:value={name}/>
            <button type="button" class="btn btn-primary" on:click={createProject}>Create Project</button>
        </div>
    </div>
</div>