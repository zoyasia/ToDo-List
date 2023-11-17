<template>
    <div id="home" class="container text-align-center">
        <h1>Bienvenue</h1>

        <br>

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
                <button class="btn btn-light" @click="selectedStatus = 'all'">Tous</button>
                <button class="btn btn-light" @click="selectedStatus = 'à faire'">À faire</button>
                <button class="btn btn-light" @click="selectedStatus = 'terminée'">Terminée</button>
            </div>
        </div>

        <br>

        <div class="table-responsive" data-bs-theme="dark">
                <List :tasks="filteredTasks" @delete="removeTask"></List>
        </div>

        <div>
            <ul>
                <li v-for="task in taskStore.tasks">
                    <span>{{ task.title }}</span>
                    <span> </span>
                    <span></span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts">

import SearchBar from './SearchBar.vue';
import Task from './Task.vue';
import List from './List.vue';

import { useTaskStore } from '../store/store';

export default {

    setup() {
    const taskStore = useTaskStore()
    return { taskStore}
  },

    components: {
        SearchBar,
        Task,
        List,
    },

    data() {
        return {

            listItems: [
                {
                    id: 1,
                    title: 'RDV dentiste',
                    description: 'Rendez-vous chez le dentiste pour un contrôle.',
                    deadline: '2023-12-31',
                    status: 'à faire',
                    selected: false,
                },
                {
                    id: 2,
                    title: 'Plantes',
                    description: 'Arroser avant de partir',
                    deadline: '2023-11-25',
                    status: 'à faire',
                    selected: false,
                },
                {
                    id: 3,
                    title: 'Anniv Léna',
                    description: 'Trouver un cadeau',
                    deadline: '2023-05-14',
                    status: 'terminée',
                    selected: true,
                },
            ],
            searchText: '',
            newTask: '',
            selectedStatus: 'all',

        }
    },

    methods: {
        addTask: function () {
            if (this.newTask.trim() !== '') {
                const newId = this.generateNewId();
                this.listItems.push({
                    id: newId,
                    title: this.newTask,
                    description: '',
                    deadline: '',
                    status: 'à faire',
                    selected: false,
                });
                this.newTask = '';
                //console.log(this.listItems);

            }
        },

        removeTask: function (id: number) {
            const index = this.listItems.findIndex(item => item.id === id);
            // console.log(index);

            if (index !== -1) {
                this.listItems.splice(index, 1);
            }
        },

        applyFilterByName: function (query: string) {
            this.searchText = query;
        },

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            const task = this.listItems.find(item => item.id === taskId);
            if (task) {
                task.selected = isChecked;
                //console.log(isChecked);

                task.status = isChecked ? 'terminée' : 'à faire';
            }
        },

        generateNewId: function () {
            const lastId = this.listItems[this.listItems.length - 1].id;
            //console.log(lastId);
            const newId = lastId + 1;
            //console.log(newId);
            return newId;
        }

    },

    computed: {
        filteredListByStatus: function () {
            if (this.selectedStatus === 'all') {
                return this.listItems;
            } else {
                return this.listItems.filter(item => item.status === this.selectedStatus);
            }
        },

        filteredListByName: function () {
            if (this.searchText.trim() === '') {
                return this.listItems;
            } else {
                return this.listItems.filter(item => item.title.toLowerCase().includes(this.searchText.toLowerCase()))
            }
        },

        filteredTasks: function () {
            const filteredByStatus = this.filteredListByStatus;
            const filteredByName = this.filteredListByName;

            // associer les deux filtres pour que la recherche s'effectue dans le tableau déjà filtré par statut
            return filteredByStatus.filter(item => filteredByName.includes(item));
        },
    }
}

</script>