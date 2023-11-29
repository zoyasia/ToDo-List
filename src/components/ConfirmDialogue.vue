<template>
    <PopupModal ref="popup">
        <template v-slot:header> Modal Header </template>

        <template v-slot:body> You can put your contents within body </template>

        <template v-slot:footer> You can put your footer here </template>
        <div class="btns">
            <button class="cancel-btn" @click="cancel">{{ cancelButton }}</button>
            <span class="ok-btn" @click="confirmDelete">{{ okButton }}</span>
        </div>
    </PopupModal>
</template>

<script lang="ts">
import PopupModal from './PopupModal.vue'

export default {

    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Go Back', // text for cancel button

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