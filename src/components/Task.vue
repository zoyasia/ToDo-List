<template id="table" class="root">
    <td><input v-model="task.isCompleted" type="checkbox" @change="updateTaskStatus(task.id, task.isCompleted)"></td>
    <th>{{ task.title }}</th>
    <td>{{ task.description }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.deadline }}</td>
    <td>
        <button class="btn btn-danger" @click="showConfirm = true">Supprimer</button>
        <ConfirmDialogue 
        v-model="showConfirm" 
        @close="closeDelete()" 
        @cancel="showConfirm = false"
        @delete="removeTask">
        </ConfirmDialogue>

        <button class="btn btn-primary" @click="showUpdate = true">Modifier</button>
        <UpdateDialogue
        v-model="showUpdate"
        :task="task"
        @close="closeUpdate()"
        @cancel="showUpdate = false"
        @update="updateTask" :title="title">
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

    props: {
        task: {
            type: Object as () => ITask,
            required: true
        },
    },

    data() {
        return {
            showConfirm: false,
            showUpdate: false,
            title: '',
            description: '',
            deadline: '',
        };
    },

    components: { ConfirmDialogue, UpdateDialogue },

    methods: {

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            taskId = this.task.id;
            if (taskId) {
                this.task.isCompleted = isChecked;
                this.task.status = isChecked ? 'terminée' : 'à faire';
            }
        },

        updateTask(data: any) {
            const updatedData = {
                title: data.title,
                description: data.description,
                deadline: data.deadline,
            }

            this.taskStore.updateTask(this.task.id, updatedData);
            this.showUpdate = false;
        },

        removeTask: function (id: number) {
            this.taskStore.removeTask(this.task.id);
            this.showConfirm = false;
        },

        closeDelete() {
            this.showConfirm = false;
        },

        closeUpdate() {
            this.showUpdate = false;
        },

    },

}

</script>