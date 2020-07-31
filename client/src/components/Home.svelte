<script>
  import { onMount } from "svelte";
  import { authStore } from '../stores/auth';
  import { urls } from '../config';
  import Project from "./Project.svelte";
  import CreateProject from "./CreateProject.svelte";

  const url = urls.base + urls.users;
  export let user;
  let projects = [];
  let userId;

  authStore.subscribe((data) => {
    if (data.user !== undefined) userId = data.user.id
    else userId = undefined;
  });


  async function refreshProjects() {
    let res = await fetch(url + `/${userId}/projects`);
    projects = await res.json();    
  }

  onMount(refreshProjects);
  
</script>

<section class="mt-5">
  <div class="container">
    <div class="row">
      {#if projects.length > 0}
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
