<template id="table">
    <td><input v-model="task.selected" type="checkbox" @change="updateTaskStatus(task.id, task.selected)"></td>
    <th>{{ task.title }}</th>
    <td>{{ task.description }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.deadline }}</td>
    <td><button class="btn btn-danger" @click="deleteItem">Supprimer</button></td>
</template>
    
<script lang="ts">

import type { ITask } from '@/store/store';

export default {

    emits: ["delete"],

    props: {
        task: {
            type: Object as () => ITask,
            required: true
        },
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
    },

};

</script>