<template>
  <div class="row g-2 align-items-center">
    <div class="col-auto">
      <input type="text" class="form-control" v-model="query" placeholder="upload fichiers, courses,... ">
    </div>
    <div class="col-auto">
      <button class="btn btn-light" @click="applyFilter">Rechercher</button>
    </div>
  </div>
</template>
  
<script lang="ts">
export default {

  data() {
    return {
          query: ''
    }
  },

  methods: {
    applyFilter() {
      this.$emit('apply-filter', this.query);
    },
  },

};
</script>
