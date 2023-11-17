<template id="table">
    


                <th>{{ taskTitle }}</th>
                <td>{{ taskDescription }}</td>
                <td>{{ taskStatus }}</td>
                <td>{{ taskDeadline }}</td>
                <td><button class="btn btn-danger" @click="deleteItem">Supprimer</button></td>


</template>
    
<script lang="ts">

export default {

    emits: ["delete"],

    props: {
        taskId: {
            type: Number,
        },
        taskTitle: {
            type: String,
            // required: true,
        },
        taskDescription: {
            type: String,
            default: '',
        },
        taskStatus: {
            type: String,
        },
        taskDeadline: {
            type: String,
        },
        taskCompleted: {
            type: Boolean,
        },
    },

    data() {
        return {


        }
    },

    methods: {
        deleteItem (){
            this.$emit('delete');
//            console.log('hello');
            
        }

    },

};

</script>