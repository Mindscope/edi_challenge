<script>
    import { createEventDispatcher } from 'svelte';

    const baseUrl = "http://localhost:8081/api/projects";
    const dispatch = createEventDispatcher();
    let name;
    
    async function createProject(event) {
        const res = await fetch(baseUrl, {
			method: 'POST',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json'                
            },
		})
		
		const json = await res.json()
        result = JSON.stringify(json)
        dispatch('created', result);
    }
</script>

<div class="card">
    <h1>Create a new Project</h1>
    <input type="text" placeholder="Project name" bind:value={name}/>
    <button type="button" class="btn btn-primary" on:click={createProject}>Create Project</button>
</div>