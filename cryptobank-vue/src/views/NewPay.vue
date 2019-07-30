<template>
  <div class="new-deposit">
    <Header>
      <div class="header">
        <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      </div>
    </Header>
      <CardTransaction label="Efetuar Pagamento">
        <form class="form" @submit.prevent="newPay">
          <FormControl>
            <div class="input-control">
              <label class="sign">$KA</label>
              <input v-model="account.valuePay" required type="number">
              <span class="info-limit">Digite um valor entre $KA 10,00 e $KA 15.000,00</span>
              </div>
          </FormControl>
          <div class="actions">
            <Button labelButton="Pagar"/>
          </div>
        </form>
      </CardTransaction>
  </div>
</template>

<script>
import CardTransaction from '@/components/CardTransaction'
import FormControl from '@/components/form/FormControl'
import Button from '@/components/form/Button'
import * as firebase from 'firebase'

export default {
  name: 'new-pay',
  data () {
    return {
      account: {
        valuePay: 0
      }
    }
  },

  components: {
    CardTransaction,
    FormControl,
    Button
  }
}
</script>

<style scoped>
  .new-deposit{
      height: 100%;
      overflow: auto;
      background: #333333;
      background-size: cover;
      display: flex;
      align-items: center;
      display: flex;
      flex-direction: column;
  }

  .header {
    width: 430px;

    display: flex;
    flex-direction: column;
  }

  .logo {
    padding: 20px;
    padding-bottom: 100px;
  }

  .form > input:focus {
  outline: 2px solid #354463;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-control {
    color: #333333;
    display: flex;
    flex-wrap: wrap;
    flex-direction:row;
    justify-content: center;
    align-items: center;
  }

  input {
    color: #707070;
    font-size: 30px;
    width: 153px;
    margin: .2em 0;
    border: 0;
  }

  .sign {
    color: #707070;
    font-size: 30px;
    margin: .2em 0;
    padding-right: 5px;
  }

  .info-limit {
    padding-top: 10px;
    font-size: 10px;
    font-weight: 400;
    margin: .2em 0;
  }

</style>
