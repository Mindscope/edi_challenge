<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let task;
  let isEditing = false;

  function toggleEdit() {
    isEditing = true;
  }

  function saveTask() {
    isEditing = false;
    dispatch("update", task);
  }
</script>

<style>
  .completed-desc {
    padding-left: 0.5rem;
  }

  .edit {
      margin-left: 0.5rem;
  }  
</style>

{#if task}
  <div class="d-flex align-items-center">
    {#if !task.is_complete}
      <input
        type="checkbox"
        checked={task.is_complete}
        on:click={() => dispatch('finish', { id: task._id })} />
      {#if isEditing}
        <input class="edit" type="text" bind:value={task.description} />        
      {:else}
        <span class="pl-2 pr-3">{task.description}</span>
      {/if}
      <div class="ml-auto">
        {#if !isEditing}<i class="tool fas fa-edit" on:click={toggleEdit} />
        {:else}<i class="fas fa-check-square" on:click={saveTask} />{/if}
        <i
          class="tool far fa-trash-alt"
          on:click={() => dispatch('delete', { id: task._id })} />
      </div>
    {:else}
      <input type="checkbox" checked={task.is_complete} disabled="true" />
      <span
        class="completed-desc"
        data-toggle="tooltip"
        title={task.finished_at}>
        {task.description}
      </span>
    {/if}
  </div>
{/if}
