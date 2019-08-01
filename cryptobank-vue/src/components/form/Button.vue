<template>
  <div class="actions">
    <button type="submit" class="button">
      {{ labelButton }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    labelButton: {
      require: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.actions {
  padding: 15px 15px;

}
.button {
  display: block;

  background-color: #FA7268;
  border: 0;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;
  font-size: 20px;
  width: 350px;
  height: 50px;
  cursor: pointer;
}
</style>
