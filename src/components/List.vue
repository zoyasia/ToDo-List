<template>
    <table class="table table-bordered" id="list">
        <thead>
            <tr>
                <th class="col"></th>
                <th class="col">Tâche</th>
                <th class="col">Description</th>
                <th class="col">Statut</th>
                <th class="col">Échéance</th>
                <th class="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks">
                <Task :task="task" @delete="removeTask(task.id)"></Task>
            </tr>
        </tbody>
    </table>
</template>
  
<script lang="ts">
import Task from './Task.vue';
import { useTaskStore, type ITask } from '../store/store';

export default {

    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },

    // remonter le emit qui vient de Task au cran du dessus (Home)
    emits: ["delete"],

    components: {
        Task,
    },
    props: {
        tasks: {
            type: Array as () => ITask[],
        },
    },
    methods: {

        removeTask(id: number) {
            const index = this.tasks.findIndex(item => item.id === id);
            //console.log(index);
            if (index !== -1) {
                this.tasks.splice(index, 1);
                // transmet le emit au niveau plus haut (Home)
                this.$emit('delete', id);
                //console.log(id);

            }
        },
    },
};
</script>

