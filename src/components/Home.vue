<template>
    <div id="home" class="container-fluid text-align-center">
        <h1>Bienvenue</h1>

        <div>
            <h2>Rechercher une tâche</h2>
            <SearchBar @apply-filter="applyFilterByName" />
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
            <List :tasks="filteredTasks" @delete="removeTask"></List>
        </div>



    </div>
</template>

<script lang="ts">

import SearchBar from './SearchBar.vue';
import List from './List.vue';

import axios from 'axios';

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
            if (this.newTask.trim() !== '') {
                try {
                    await axios.post('http://localhost:8000/new', {
                        title: this.newTask,
                        description: this.newDescription,
                        deadline: this.newDeadline,
                    });
                    this.newTask = "";
                    this.newDescription = "";
                    this.newDeadline = "";
                    useTaskStore().fetchTasks();
                } catch (error) {
                    console.error('Erreur lors de l\'ajout de la tâche', error);
                    return false;
                }
            }

        },

        removeTask: function (id: number) {
            const index = this.taskStore.tasks.findIndex(item => item.id === id);
            console.log(index);
            console.log(id);

            // if (index !== -1) {
            axios.delete('http://localhost:8000/delete/' + id)
                .then(function (response) {
                    console.log('id supprimé:' + id);
                    useTaskStore().fetchTasks();
                })
                .catch(function (error) {
                    console.log(error);
                });
            // }
        },

        applyFilterByName: function (query: string) {
            this.taskStore.searchText = query;
        },

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            const task = this.taskStore.tasks.find(item => item.id === taskId);
            if (task) {
                task.selected = isChecked;

                task.status = isChecked ? 'terminée' : 'à faire';
            }
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