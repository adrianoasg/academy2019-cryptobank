<template>
  <div class="content" @click="onClickCallback">
    <div class="button">
      <img :src="image" alt="Icon">
    </div>
    <div class="text-button">
      <span>{{ labelButton }}</span>
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
    },
    image: {
      require: true
    }
  }
}

</script>
<style scoped>
.content {
  width: 334px;
  height: 50px;
  background-color: #FA7268;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
}

.button {
  display: flex;
  justify-content: center;
  margin-left: 10px;
}

.text-button {
  font-size: 20px;
  color: #FFF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  margin-right: 10px;
}
</style>
