<template id="table" class="root">
    <td><input v-model="task.isCompleted" type="checkbox" @change="updateTaskStatus(task.id, task.isCompleted)"></td>
    <th>{{ task.title }}</th>
    <td>{{ task.description }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.deadline }}</td>
    <td>
        <button class="btn btn-danger" @click="visible = true">Supprimer</button>
        <ConfirmDialogue v-if="visible" @close="closeDelete()" @cancel="visible = false" @delete="doDelete()">
        </ConfirmDialogue>

        <button class="btn btn-primary" @click="showModal = true">Modifier</button>
        <UpdateDialogue v-if="showModal" @close="closeUpdate()" @cancel="showModal = false" @update="updateTask()"></UpdateDialogue>
    </td>


    <!-- 
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
    -->
</template>
    
<script lang="ts">

import type { ITask } from '@/store/store';
import { useTaskStore } from '../store/store';
import ConfirmDialogue from '../components/Modals/ConfirmDialogue.vue';
import UpdateDialogue from './Modals/UpdateDialogue.vue';

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
            visible: false,
            showModal: false,
            updatedTitle: '',
            updatedDescription: '',
            updatedDeadline: '',
        };
    },

    components: { ConfirmDialogue, UpdateDialogue },

    methods: {
        deleteItem() {
            this.$emit('delete');
        },

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            taskId = this.task.id;
            if (taskId) {
                this.task.isCompleted = isChecked;
                this.task.status = isChecked ? 'terminée' : 'à faire';
            }
        },

        updateTask() {
            const updatedData = {
                title: this.updatedTitle,
                description: this.updatedDescription,
                deadline: this.updatedDeadline
            }
            this.taskStore.updateTask(this.task.id, updatedData);
            this.showModal = false;
        },

        doDelete() {
            this.$emit('delete');
        },

        closeDelete() {
            this.visible = false;
        },

        closeUpdate() {
            this.showModal = false;
        },

    },

}

</script>

<style>
.root {
    position: relative;
}

.modale {
    position: absolute;
}
</style>