<template>
    <div id="home" class="container-fluid text-align-center">
        <h1>Bienvenue</h1>

        <div>
            <h2>Rechercher une tâche</h2>
            <SearchBar @apply-filter="taskStore.applyFilterByName" />
        </div>

        <br>

        <h2>Ajouter une tâche</h2>

        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <input type="text" class="form-control" v-model="newTask" placeholder="encore une super tâche">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" v-model="newDescription" placeholder="description">
            </div>
            <div class="col-auto">
                <input type="date" class="form-control" v-model="newDeadline">
            </div>
            <div class="col-auto">
                <button class="btn btn-light" @click="addTask">Ajouter</button>
            </div>
        </div>

        <br>

        <h2>Mes tâches</h2>

        <div>
            <div class="btn-group">
                <button class="btn btn-light" @click="setSelectedStatus('all')">Tous</button>
                <button class="btn btn-light" @click="setSelectedStatus('à faire')">À faire</button>
                <button class="btn btn-light" @click="setSelectedStatus('terminée')">Terminée</button>
            </div>
        </div>

        <br>

        <div class="table-responsive" data-bs-theme="dark">
            <List :tasks="filteredTasks"></List>
        </div>

    </div>
</template>

<script lang="ts">

import SearchBar from './SearchBar.vue';
import List from './List.vue';

import { useTaskStore } from '../store/store';

export default {
    created() {
        // Appel de l'action pour récupérer les tâches depuis l'API
        useTaskStore().fetchTasks();
    },

    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },

    components: {
        SearchBar,
        List,
    },

    data() {
        return {
            newTask: '',
            newDescription: '',
            newDeadline: '',
        }
    },

    methods: {

        async addTask() {
            await this.taskStore.addTask(this.newTask, this.newDescription, this.newDeadline);
            this.newTask = '';
            this.newDescription = '';
            this.newDeadline = '';
        },

        setSelectedStatus: function (status: string) {
            this.taskStore.setStatus(status);
        },

    },

    computed: {
        filteredTasks: function () {
            return this.taskStore.filtered;
        }
    },

}

</script>