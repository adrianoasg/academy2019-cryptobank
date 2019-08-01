<template>
  <div class="form-control">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormControl'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  display: block;
  margin-top: -15px;
}

.form-control > input:focus {
  outline: 2px solid #354463;
}
</style>
