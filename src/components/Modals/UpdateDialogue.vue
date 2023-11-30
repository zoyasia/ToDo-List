<template>
    <PopupModal ref="popup">

        <template v-slot:header>{{ title }}</template>

        <template v-slot:body>
            <div>
                <label for="newTitle">Intitulé de la tâche :</label>
                <input v-model="updatedTitle" id="updatedTitle" type="text" class="form-control">
            </div>
            <div>
                <label for="newDescription">Description :</label>
                <input v-model="updatedDescription" id="updatedDescription" type="text" class="form-control">
            </div>
            <div>
                <label for="newDeadline">Deadline :</label>
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

    emits: ["update", "cancel", "closeUpdate"],

    methods: {

        confirmUpdate() {
            this.$emit('update', {
                title: this.updatedTitle,
                description: this.updatedDescription,
                deadline: this.updatedDeadline,
            });
        },

        cancel() {
            this.$emit('cancel');
        },

        closeModal() {
            this.$emit('closeUpdate');
        },
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