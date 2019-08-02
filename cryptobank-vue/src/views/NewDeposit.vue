<template>
  <div class="new-deposit">
    <Header>
      <div class="header">
        <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      </div>
    </Header>
      <CardTransaction label="Depositar">
        <form class="form" @submit.prevent="newDeposit">
          <FormControl>
            <div class="input-control">
              <label class="sign">$KA</label>
              <input v-model.number="valueDesposit" required type="number" class="input" step="0.01" >
              <span class="info-limit">Digite um valor entre $KA 10,00 e $KA 15.000,00</span>
              </div>
          </FormControl>
          <div class="actions">
            <Button labelButton="Depositar"/>
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
  name: 'new-deposit',
  data () {
    return {
      valueDesposit: null
    }
  },
  components: {
    CardTransaction,
    FormControl,
    Button
  },

  methods: {
    newDeposit () {
      if (this.valueDesposit >= 10 && this.valueDesposit <= 15000) {
        const db = firebase.firestore()

        const userUid = firebase.auth().currentUser.uid

        // Create a reference to the accounts collection
        const accountRef = db.collection('accounts')
        const query = accountRef.where('userUid', '==', userUid)

        query.get().then(snapshot => {
          snapshot.forEach(doc => {
            const docId = doc.id
            // Create a reference to the accounts collection from the document id
            const accountRefDep = accountRef.doc(docId)

            // Add value to account balance transaction
            db.runTransaction(t => {
              return t.get(accountRefDep).then(doc => {
                const newDepositValue = doc.data().balance + this.valueDesposit
                t.update(accountRefDep, { balance: newDepositValue })
              })
            })
              .then(() => {
                alert('Deposito efetuado sucesso!')
                this.valueDesposit = null
              }).catch(error => {
                alert('Deposito não efetuado! \n\n' + error)
              })
          })
        })
          .catch(error => {
            alert('Erro ao carregar os dados', error)
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
