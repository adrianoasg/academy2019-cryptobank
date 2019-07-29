<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.auth-content {
    height: 100%;
    overflow: auto;
    background: #333333;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .auth-modal {
    width: 430px;
    padding: 35px;

    display: flex;
    flex-direction: column;
  }
</style>
