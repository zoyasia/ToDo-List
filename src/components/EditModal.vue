<template>
    <div>
        <button @click="isOpen = true">Open</button>

        <Teleport to="#modal">
            <div class="modale" v-if="isOpen">
                <div>
                    <h2>Edition</h2>
                    <p>fefqefver</p>
                    <button @click="isOpen = false">Close</button>
                </div>
            </div>
        </Teleport>



    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    data() {
        return {
            isOpen: false
        }
    }
}

</script>
