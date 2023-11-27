<template id="table" class="root">
    <td><input v-model="task.selected" type="checkbox" @change="updateTaskStatus(task.id, task.selected)"></td>
    <th>{{ task.title }}</th>
    <td>{{ task.description }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.deadline }}</td>
    <td><button class="btn btn-danger" @click="deleteItem">Supprimer</button>
        <button class="btn btn-primary" @click="showModal = true">Modifier</button>
    </td>

<!-- -->
    <Teleport to="#modal">
        <div v-if="showModal" class="modale">
            <div>
                <div class="modal-header">
                    <h5 class="modal-title">Modifier cette tâche : {{ task.title }}</h5>
                    <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="updatedTitle">Tâche :</label>
                    <input v-model="updatedTitle" id="updatedTitle" type="text" class="form-control">
                    <label for="updatedDescription">Description :</label>
                    <input v-model="updatedDescription" id="updatedDescription" type="text" class="form-control">
                    <label for="updatedDeadline">Deadline :</label>
                    <input v-model="updatedDeadline" id="updatedDeadline" type="date" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Fermer</button>
                    <button type="button" class="btn btn-primary" @click="updateTask">Enregistrer</button>
                </div>

            </div>

        </div>
    </Teleport>
<!-- -->

</template>
    
<script lang="ts">

import type { ITask } from '@/store/store';
import { useTaskStore } from '../store/store';

export default {

    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },

    emits: ["delete"],

    props: {
        task: {
            type: Object as () => ITask,
            required: true
        },
    },

    data() {
        return {
            showModal: false,
            updatedTitle: '',
            updatedDescription: '',
            updatedDeadline: '',
        };
    },

    methods: {
        deleteItem() {
            this.$emit('delete');
        },

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            taskId = this.task.id;
            if (taskId) {
                this.task.selected = isChecked;
                this.task.status = isChecked ? 'terminée' : 'à faire';
            }
        },

        updateTask(id: number) {
            const updatedData = {
                title: this.updatedTitle,
                description: this.updatedDescription,
                deadline: this.updatedDeadline
            }
            this.taskStore.updateTask(this.task.id, updatedData);
            this.showModal = false;
        }
    },

};

</script>

<style>
.root {
    position: relative;
}

.modale {
    position: absolute;
}


</style>