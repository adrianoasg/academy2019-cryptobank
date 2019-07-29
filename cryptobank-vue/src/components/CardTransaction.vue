<template>
  <article class="card">
    <header>
      <div class="title">
        <span>Depositar</span>
      </div>
      <div class="infoDeposit">
        <span class="info">Informe a quantia desejada</span>
        <span class="value">$KA </span>
        <input type="number">
        <span class="infoValue">Digite um valor entre $KA 10,00 e $KA 15.000,00</span>
      </div>
      <div class="btn-actions">
      <button id="btn-deposit">Depositar</button>
    </div>
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
  padding: .5em 1em;

  display: flex;
  flex-direction: column;
}

.infoDeposit {
  display: flex;
  flex-direction: column;
}

.title {
  background: #4076AD;
  border-radius: 3px;
  color: #FFFFFF;
  font-size: 13px;
  padding: 0px 5px;
}

.info {
  font-size: 15px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
}

.value {
  font-size: 40px;
  font-weight: 700;
  margin: .2em 0;
}

.infoValue {
  font-size: 10px;
  font-weight: 400;
  margin: .2em 0;
}

.btn-actions {
  padding: 15px;
}

</style>
