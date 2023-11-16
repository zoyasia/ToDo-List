<template>
    <table class="table table-bordered">
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
            <tr v-for="(task, index) in tasks" :key="index">
                <th><input v-model="task.selected" type="checkbox"  @change="updateTaskStatus(task.id, task.selected)"></th>
                <Task :task-title="task.title" :task-description="task.description" :task-id="task.id"
                    :task-status="task.status" :task-completed="task.selected" :task-deadline="task.deadline"
                    @delete="removeTask(task.id)"></Task>
            </tr>
        </tbody>
    </table>
</template>
  
<script lang="ts">
import Task from './Task.vue';

// création d'une interface pour pouvoir typer mon tableau tasks dans props
interface TaskType {
    id: number;
    title: string;
    description: string;
    status: string;
    selected: boolean;
    deadline: string;
}

export default {

    // remonter le emit qui vient de Task au cran du dessus (Home)
    emits: ["delete"], 

    components: {
        Task,
    },
    props: {
        tasks: {
            type: Array as () => TaskType[],
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

        updateTaskStatus: function (taskId: number, isChecked: boolean) {
            const task = this.tasks.find(item => item.id === taskId);
            if (task) {
                task.selected = isChecked;
                //console.log(isChecked);

                task.status = isChecked ? 'terminée' : 'à faire';
            }
        },



    },
};
</script>

