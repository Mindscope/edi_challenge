<script>
  import { createEventDispatcher } from "svelte";
  import { urls } from "../config";
  import Task from "./Task.svelte";

  const baseUrl = urls.base + urls.projects;
  const dispatch = createEventDispatcher();
  export let project;
  let doneTasks = [],
    todoTasks = [];
  let newTaskDescription;
  let isEditing = false;

  async function deleteProject() {
    const projectId = project._id;
    const url = baseUrl + `/${project._id}`;
    const res = await fetch(url, { method: "DELETE" });
    dispatch("deleted", { name: projectId });
  }

  async function updateProject() {
    isEditing = false;
    const url = baseUrl + `/${project._id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name: project.name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    dispatch("updated", result);
  }

  async function updateTasks() {
    console.log(`Fetching tasks for ${project._id}`);
    const url = baseUrl + `/${project._id}/tasks`;
    let res = await fetch(url);
    res.json().then((tasks) => sortTasks(tasks));
  }

  function sortTasks(tasks) {
    doneTasks = [];
    todoTasks = [];
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        if (task.is_complete) doneTasks.push(task);
        else todoTasks.push(task);
      });
    }

    // Setup tooltips for done tasks elements
    window.$("[data-toggle]").tooltip();
  }

  async function addTask() {
    if (newTaskDescription === undefined) {
      console.error("No task description was given.");
      return;
    }

    const url = baseUrl + `/${project._id}/tasks`;
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ description: newTaskDescription }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json().then((tasks) => sortTasks(tasks));
    newTaskDescription = "";
  }

  async function deleteTask(event) {
    const id = event.detail.id;
    const url = baseUrl + `/${project._id}/tasks/${id}`;
    const res = await fetch(url, { method: "DELETE" });
    res.json().then((tasks) => sortTasks(tasks));
  }

  async function finishTask(event) {
    const id = event.detail.id;
    const url = baseUrl + `/${project._id}/tasks/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ is_complete: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json().then((tasks) => sortTasks(tasks));
  }

  async function updateTask(event) {
    const task = event.detail;
    const url = baseUrl + `/${project._id}/tasks/${task._id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json().then((tasks) => sortTasks(tasks));
  }

  $: project && updateTasks();
</script>

<style>
  .task-list {
    margin-bottom: 2rem;
  }
</style>

{#if project}
  <div class="card">
    <div class="card-header d-flex">
      {#if isEditing}
        <input class="edit" type="text" bind:value={project.name} />
      {:else}
        <span>{project.name}</span>
      {/if}
      <div class="ml-auto">
        {#if !isEditing}
          <i class="tool fas fa-edit" on:click={() => {isEditing = true}}/>
        {:else}
          <i class="fas fa-check-square" on:click={updateProject} />
        {/if}
        <i class="tool far fa-trash-alt" on:click={deleteProject} />
      </div>
    </div>
    <div class="card-body">
      {#if todoTasks.length > 0}
        <h4>To Do</h4>
        <div class="task-list">
          {#each todoTasks as task}
            <Task
              {task}
              on:delete={deleteTask}
              on:finish={finishTask}
              on:update={updateTask} />
          {/each}
        </div>
      {/if}
      {#if doneTasks.length > 0}
        <h4>Done</h4>
        <div class="task-list">
          {#each doneTasks as task}
            <Task {task} />
          {/each}
        </div>
      {/if}
    </div>
    <div class="card-footer">
      <input
        type="text"
        placeholder="Task Description"
        bind:value={newTaskDescription} />
      <button class="btn btn-success" on:click={addTask}>Add</button>
    </div>
  </div>
{/if}
