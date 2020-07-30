<script>
    import { createEventDispatcher } from "svelte";
    const baseUrl = "http://localhost:8081/api/projects";
    const dispatch = createEventDispatcher();
    export let project;
    let tasks = [];
    let newTaskDescription;

    async function deleteProject(event) {
        const projectId = project._id;
        const url = baseUrl + `/${project._id}`;
        const res = await fetch(url, {method: "DELETE"});
        dispatch("deleted", {name: projectId});
    }

    async function updateTasks() {
        console.log(`Fetching tasks for ${project._id}`);
        const url = baseUrl + `/${project._id}/tasks`;
        let res = await fetch(url);
        tasks = await res.json();
        console.log(tasks);        
    }

    async function addTask() {
        if (newTaskDescription === undefined) {
            console.error("No task description was given.");
            return;
        }

        const url = baseUrl + `/${project._id}/tasks`;
        let res = await fetch(url, {
            method: "POST", 
            body: JSON.stringify({description: newTaskDescription}),
            headers: {
                'Content-Type': 'application/json'                
            }
        });
        tasks = await res.json();        
    }

    async function deleteTask(id) {
        const url = baseUrl + `/${project._id}/tasks/${id}`;
        const res = await fetch(url, {method: "DELETE"});
        tasks = await res.json();
    }

    async function finishTask(id) {
        const url = baseUrl + `/${project._id}/tasks/${id}`;
        const res = await fetch(url, {
            method: "PUT", 
            body: JSON.stringify({is_complete: true}),
            headers: {
                'Content-Type': 'application/json'                
            }
        });
        tasks = await res.json();
    }

    $: project && updateTasks();
</script>


{#if project}
<div class="card">
    <div class="card-header">
        {project.name}
        <button class="btn btn-info">Edit</button>
        <button class="btn btn-danger" on:click={deleteProject}>Delete</button>
    </div>
    <div class="card-body">
        {#if tasks.length > 0}
        <h3>To Do</h3>
        <ul>
            {#each tasks as task}
            <li>
                <input type="checkbox" checked={task.is_complete} on:click={() => finishTask(task._id)}/>
                {task.description}
                <button class="btn btn-danger" on:click={() => deleteTask(task._id)}>Remove</button>
            </li>        
            {/each}
        </ul>
        <hr />
        {/if}
        <div>
            <input type="text" placeholder="Task Description" bind:value={newTaskDescription}/>
            <button class="btn btn-success" on:click={addTask}>Add</button>
        </div>
    </div>
</div>
{/if}
