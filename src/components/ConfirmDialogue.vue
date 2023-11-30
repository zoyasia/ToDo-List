<template>
    <PopupModal ref="popup">
        <template v-slot:header>{{ title }}</template>

        <template v-slot:body>{{ message }}</template>

        <template v-slot:footer>
            <div>
                Cette action est définitive
                <div class="btns">
                    <button class="cancel-btn" @click="cancel">{{ cancelButton }}</button>
                    <button class="ok-btn" @click="confirmDelete">{{ okButton }}</button>
                </div>
            </div>

        </template>

    </PopupModal>
</template>

<script lang="ts">
import PopupModal from './PopupModal.vue'

export default {

    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: 'Confirmation suppression',
        message: 'Êtes-vous sûr.e de vouloir supprimer cette tâche ?', // Main text content
        okButton: 'Supprimer',
        cancelButton: 'Annuler',

        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {

        confirmDelete() {
            this.$emit('delete'); // Émettre un événement de suppression vers le parent (Task.vue)
        },

        cancel() {
            this.$emit('cancel');
        }

    },
}
</script>