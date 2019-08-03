<template>
  <article class="card">
    <header>
      <div class="header">
        <div class="icon-button" tag="button">
           <router-link to="/home">
            <img :src="require('../assets/left-arrow.png')" alt="icon"/>
           </router-link>
        </div>
        <div class="title">
          <label class="label">{{ label }}</label>
        </div>
      </div>
      <div class="info">
        <p>Informe a <span style="font-weight: bold;">quantia</span> desejada</p>
      </div>
      <slot />
    </header>
  </article>
</template>

<script>
export default {
  name: 'CardTransaction',
  props: {
    label: {
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  max-width: 450px;
  width: 380px;
  margin: 1.5em auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  overflow: hidden;
  border-radius: 10px;
}
header {
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #4076AD;
  align-items: center;
}
.icon-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.title {
  display: flex;
  flex: 1;
  justify-content: center;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
}
.info {
  font-size: 20px;
  font-weight: 300;
  padding: 10px 0px;
}
</style>
