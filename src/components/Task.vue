<template id="table" class="root">
    <td><input v-model="task.isCompleted" type="checkbox" @change="updateTaskStatus(task.id, task.isCompleted)"></td>
    <th>{{ task.title }}</th>
    <td>{{ task.description }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.deadline }}</td>
    <td>
        <button class="btn btn-danger" @click="showDeleteModal = true">Supprimer</button>
        <ConfirmDialogue v-if="showDeleteModal" @close="closeDelete()" @cancel="showDeleteModal = false"
            @delete="doDelete()">
        </ConfirmDialogue>

        <button class="btn btn-primary" @click="showUpdateModal = true">Modifier</button>
        <UpdateDialogue v-if="showUpdateModal" @close="closeUpdate()" @cancel="showUpdateModal = false" @update="onUpdate">
        </UpdateDialogue>
    </td>
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
            showDeleteModal: false,
            showUpdateModal: false,
            title: '',
            description: '',
            deadline: '',
        };
    },

    components: { ConfirmDialogue, UpdateDialogue },

    methods: {

        onUpdate(data: any) {
            const updatedData = {
                title: data.title,
                description: data.description,
                deadline: data.deadline,
            }
            console.log(updatedData);

            this.taskStore.updateTask(this.task.id, updatedData);
            this.showUpdateModal = false;

        },

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


        doDelete() {
            this.$emit('delete');
        },

        closeDelete() {
            this.showDeleteModal = false;
        },

        closeUpdate() {
            this.showUpdateModal = false;
        },

    },

}

</script>