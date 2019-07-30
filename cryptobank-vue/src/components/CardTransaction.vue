<template>
  <article class="card">
    <header>
      <div class="header">
        <div class="icon-button" tag="button" @click="returnToHome">
          <img class="icon" :src="require('../assets/left-arrow.png')"/>
        </div>
        <label class="label">{{ label }}</label>
      </div>
      <div class="info">
        <span>Informe a quantia desejada</span>
      </div>
      <slot />
    </header>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: {
    label: {
      required: true
    }
  },
  methods: {
    returnToHome () {
      this.$router.push({ path: '/home' })
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
  border: 1px solid #dedede;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  overflow: hidden;
  border-radius: 4px;
}
header {
  background: #ffffff;
  overflow: hidden;
  /* padding: 0em 1em; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  width: 100%;
  height: 32px;
  background: #4076AD;
  border-radius: 3px;
  color: #FFFFFF;
  font-size: 13px;
  display: flex;
  text-align: center;
}

.icon {
  padding-top: 5px;
  cursor: pointer;
}

label {
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  padding-top: 5px;
  padding-left: 150px;
}

.info {
  font-size: 20px;
  font-weight: 300;
  padding: 15px 0px;
}

</style>
