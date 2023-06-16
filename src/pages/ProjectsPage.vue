<script>
import axios from "axios";
import ProjectCard from "../components/ProjectCard.vue";
import Pagination from "../components/Pagination.vue";
import { store } from "../store";

export default {
  name: "ProjectsPage",
  data() {
    return {
      //   baseUrl: "http://127.0.0.1:8000",
      projects: [],
      types:[],
      selectedType: "all",
      currentPage: 1,
      lastPage: null,
      totalProjects: 0,
      loading: false,
      store,
    };
  },
  components: {
    ProjectCard,
    Pagination,
  },
  mounted() {
    this.getProjects();
    this.getTypes();
  },
  methods: {
    getTypes() {
      axios.get(`${store.apiBaseUrl}/api/types`).then((resp) => {
        this.types = resp.data.results;
      })
    },
    getProjects(pageNumber = 1) {
      this.loading = true;
      const params = {
        page: pageNumber,
      }

      if (this.selectedType !== "all") {
        params.type_id = this.selectedType;
      }

      axios.get(`${store.apiBaseUrl}/api/projects`, { params }).then((resp) => {
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

      <div class="d-flex justify-content-between">
        <!-- Filtri -->
        <p>
          <label class="form-label" for="type">Type</label>
          <select v-model="selectedType" id="type" class="form-select" @change="getProjects()">
              <option value="all">all</option>
              <option :value="typeItem.id" v-for="typeItem in types" :key="typeItem.id">{{
                  typeItem.name }}</option>
          </select>
        </p>

        <div class="text-end">
          found {{ totalProjects }} projects
        </div>
      </div>

      <div class="row row-cols-3 g-3">
        <div class="col" v-for="project in projects" :key="project.id">
          <ProjectCard :project="project" />
        </div>
      </div>
      <Pagination
        :currentPage="currentPage"
        :lastPage="lastPage"
        @changePage="getProjects"
      />
    </section>
    <section v-else>
      <p>Loading...</p>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
