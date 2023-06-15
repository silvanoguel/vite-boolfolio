<script>
import axios from 'axios';
import ProjectCard from './components/ProjectCard.vue';
import { store } from "./store";

export default {
  data() {
    return {
      baseUrl: "http://127.0.0.1:8000",
      projects: [],
      currentPage: 1,
      lastPage: null,
      totalPosts: 0,
      loading: false,
      store,
    }
  }, 
  components: { 
    ProjectCard
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects(pageNumber = 1) {
      this.loading = true;
      axios.get(`${store.apiBaseUrl}/api/projects`, {
        params: {
          page: pageNumber
        }
      }).then((resp) => {
        this.projects = resp.data.results.data;
        this.currentPage = resp.data.results.current_page;
        this.lastPage = resp.data.results.last_page;
        this.totalProjects = resp.data.results.total;
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}   
</script>

<template>
  <div class="container">
    <section v-if="!loading">
      <h2>List of projects</h2>
      <div class="text-end">
        found {{ totalProjects }} projects
      </div>
      <div class="row row-cols-3 g-3">
        <div class="col" v-for="project in projects" :key="project.id">
          <ProjectCard :project="project" />
        </div>
      </div>
      <!-- Paginazione -->
      <nav v-if="lastPage" class="mt-4 d-flex justify-content-center" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }"><a @click.prevent="getProjects(currentPage - 1)"
              class="page-link" href="#">Previous</a></li>
          <li class="page-item" :class="{ 'active': pageNum === currentPage }" v-for="pageNum in lastPage">
            <a @click.prevent="getProjects(pageNum)" class="page-link" href="#">{{ pageNum }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === lastPage }"><a
              @click.prevent="getProjects(currentPage + 1)" class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </section>
    <section v-else>
      <p>Loading...</p>
    </section>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;

* {
  background-color: lightgray;
}


</style>