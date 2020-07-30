<script>
  import { onMount } from "svelte";
  import Project from "./Project.svelte";
  import CreateProject from "./CreateProject.svelte";

  const baseUrl = "http://localhost:8081/api/projects";
  let projects = [];

  async function refreshProjects() {
    let res = await fetch(baseUrl);
    projects = await res.json();
    console.log(projects);
  }

  onMount(refreshProjects);
  
</script>

<section class="mt-5">
  <div class="container">
    <div class="row">
      {#if projects.length === 0}
        <p>Loading</p>
      {:else}
        {#each projects as project}
          <div class="col-md-4">
            <Project {project} on:deleted={refreshProjects}/>
          </div>
        {/each}
      {/if}
      <CreateProject on:created={refreshProjects} />
    </div>
  </div>
</section>
