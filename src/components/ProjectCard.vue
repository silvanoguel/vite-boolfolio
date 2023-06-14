<script>

import { store } from "../store";

export default {
    name: 'ProjectCard',
    props: {
        project: Object
    },
    data() {
        return {
            store
        }
    },
    computed: {
        contentPreview() {
            if (!this.project.content) {
                return 'No content'
            } else if (this.project.content.length > 100) {
                return this.project.content.substring(0, 100) + "...";
            } else {
                return this.project.content
            }
        },
    }

}

</script>

<template>

  <div class="card h-100">
    <div class="card-body">
        <h5>Title: {{ project.title }}</h5>
        <p>Content: {{ contentPreview }}</p>
        <p class="text-primary">
            <span v-if="project.type">{{ project.type.name }}</span>
            <span v-else>No category</span>
        </p>

        <p class="technologies-list mt-1 mb-2 text-success">
            <span v-if="project.technologies.length > 0">
                <span v-for="technology in project.technologies" class="technology">{{ technology.name}},</span>
            </span>
            <span v-else>
                <span>No technologies</span>
            </span>
        </p>
    </div>
  </div>

</template>

<style lang="scss" scoped>
</style>