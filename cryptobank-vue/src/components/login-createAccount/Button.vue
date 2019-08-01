<template>
  <div class="content" @click="onClickCallback">
    <div class="nn">
      <button class="button" type="submit" id="create-account-button">
            {{ labelButton }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    labelButton: {
      require: true
    },
    onClickCallback: {
      require: true
    }
  }
}

</script>
<style scoped>

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FA7268;
  border: 0;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
  width: 130px;
  height: 45px;
  cursor: pointer;
  }
</style>
