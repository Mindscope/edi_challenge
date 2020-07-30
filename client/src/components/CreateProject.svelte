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