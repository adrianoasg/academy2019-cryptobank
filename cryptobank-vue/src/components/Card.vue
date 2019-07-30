<template>
  <article class="card">
    <header>
      <span class="info">Saldo disponível</span>
      <span class="value">$KA {{ account.value }}</span>
    </header>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: {
    account: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  max-width: 450px;
  width: 334px;
  margin: 2.5em auto;
  border: 1px solid #dedede;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  overflow: hidden;
  border-radius: 5px;
}
header {
  background: #ffffff;
  overflow: hidden;
  padding: .5em 1em;

  display: flex;
  flex-direction: column;
}

.info {
  font-size: 15px;
  font-weight: 300;
}

.value {
  color: #000000;
  font-size: 40px;
  font-weight: 700;
  margin: .2em 0;
}

</style>
