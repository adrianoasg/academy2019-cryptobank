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
              <input v-model.number="account.valuePay" required type="number">
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
  data: () => ({
    account: {
      valuePay: null
    }
  }),
  components: {
    CardTransaction,
    FormControl,
    Button
  },
  methods: {
    newPay (...args) {
      const { valuePay } = this.account

      if (valuePay >= 10 && valuePay <= 15000) {
        const db = firebase.firestore()

        const userUid = firebase.auth().currentUser.uid
        const accountRef = db.collection('accounts')
        const query = accountRef.where('userUid', '==', userUid)

        query.get().then(snapshot => {
          snapshot.forEach(doc => {
            const docId = doc.id
            // Create a reference to the accounts collection
            const accountRefPay = accountRef.doc(docId)

            db.runTransaction(t => {
              return t.get(accountRefPay).then(doc => {
                const limiteValue = doc.data().value

                if (valuePay <= limiteValue) {
                  const newValueAccount = doc.data().value - valuePay
                  t.update(accountRefPay, { value: newValueAccount })
                } else {
                  alert('Valor em conta insuficiente!')
                }
              })
            })
              .then(() => {
                alert('Pagamento efetuado com sucesso!')
              }).catch(error => {
                alert('Erro ao efetuar pagamento!', error)
              })
          })
        })
          .catch(error => {
            alert('Error getting documents', error)
          })
      } else {
        alert('Digite um valor entre $KA 10,00 e $KA 15.000,00')
      }
    }
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
