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
        }
    },

    methods: {
        // méthode sans API
        // addTask: function () {
        //     if (this.newTask.trim() !== '') {
        //         const newId = this.generateNewId();
        //         this.taskStore.tasks.push({
        //             id: newId,
        //             title: this.newTask,
        //             description: '',
        //             deadline: '',
        //             status: 'à faire',
        //             selected: false,
        //         });
        //         this.newTask = '';
        //         //console.log(this.taskStore.tasks);

        //     }
        // },

        addTask: function () {
            if (this.newTask.trim() !== '') {
                const newId = this.generateNewId();
                axios.post('http://localhost:8000/new',
                    {
                        id: newId,
                        title: this.newTask,
                        description: '',
                        deadline: '',
                        status: 'à faire',
                        isCompleted: false,
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        },



        removeTask: function (id: number) {
            const index = this.taskStore.tasks.findIndex(item => item.id === id);
            // console.log(index);

            if (index !== -1) {
                this.taskStore.tasks.splice(index, 1);
            }
        },

        applyFilterByName: function (query: string) {
            this.taskStore.searchText = query;
        },

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            const task = this.taskStore.tasks.find(item => item.id === taskId);
            if (task) {
                task.selected = isChecked;
                //console.log(isChecked);

                task.status = isChecked ? 'terminée' : 'à faire';
            }
        },

        generateNewId: function () {

            if (this.taskStore.tasks.length === 0) {
                const newId = 1;
                return newId;
            } else {
                const lastId = this.taskStore.tasks[this.taskStore.tasks.length - 1].id;
                //console.log(lastId);
                const newId = lastId + 1;
                //console.log(newId);
                return newId;
            }
        },

        setSelectedStatus: function (status: string) {
            this.taskStore.setStatus(status);
        },

    },

    computed: {
        filteredTasks: function () {
            console.log(this.taskStore.filtered);
            return this.taskStore.filtered;
        }
    },

    watch: {
        status: 'setSelectedStatus'
    },



}


</script>