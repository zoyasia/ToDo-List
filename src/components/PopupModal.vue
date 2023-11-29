<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <header class="modal-header" id="modalTitle">
                <slot name="header"></slot>
                <button type="button" class="close-btn" @click="close" aria-label="Close Modal">
                    x
                </button>
            </header>

            <slot name="body"></slot>

            <footer class="modal-footer">
                <slot name="footer"></slot>
                <button type="button" class="btn-open-modal" @click="close" aria-label="Close Modal">
                    Close Modal
                </button>
            </footer>


        </div>
    </transition>
</template>

<script lang="ts">

export default {
    name: 'PopupModal',

    data: () => ({
        isVisible: false,
    }),

    methods: {
        close() {
            this.$emit('close');
        },
    },
}
</script>
