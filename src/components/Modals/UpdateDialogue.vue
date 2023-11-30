<template>
    <PopupModal ref="popup">
        <template v-slot:header>{{ title }}</template>
        <template v-slot:body>
            <div>
                <label for="updatedTitle">Intitulé de la tâche :</label>
                <input v-model="updatedTitle" id="updatedTitle" type="text" class="form-control">
            </div>
            <div>
                <label for="updatedDescription">Description :</label>
                <input v-model="updatedDescription" id="updatedDescription" type="text" class="form-control">
            </div>
            <div>
                <label for="updatedDeadline">Deadline :</label>
                <input v-model="updatedDeadline" id="updatedDeadline" type="date" class="form-control">

            </div>
        </template>
        <template v-slot:footer>
            <div class="btns">
                <button class="btn btn-secondary" @click="cancel">{{ cancelButton }}</button>
                <button class="btn btn-success" @click="confirmUpdate">{{ updateButton }}</button>
            </div>
        </template>
    </PopupModal>
</template>

<script lang="ts">
import PopupModal from './PopupModal.vue';

export default {

    name: 'UpdateDialogue',

    components: { PopupModal },

    data: () => ({
        title: 'Modification',
        updateButton: 'Enregistrer',
        cancelButton: 'Annuler',
        updatedTitle: '',
        updatedDescription: '',
        updatedDeadline: '',
    }),

    methods: {

        confirmUpdate() {
            this.$emit('update', this.updatedTitle, this.updatedDeadline, this.updatedDescription); // Émettre un événement de modification vers le parent (Task.vue)
        },

        cancel() {
            this.$emit('cancel');
        }

    },
}
</script>


<style scoped>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>