<template>
  <div class="new-transfer">
    <Header>
      <div class="header">
        <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      </div>
    </Header>
      <CardTransaction label="Tranferir">
        <form class="form" @submit.prevent="newTransfer">
          <FormControl>
            <div class="input-control">
              <label class="sign">$KA</label>
              <input v-model.number="valueTransfer" required type="number" class="input">
              <span class="info-limit">Digite um valor entre $KA 10,00 e $KA 15.000,00</span>
              </div>
              <div class="info">
                <p class="info-send">Para <span style="font-weight: bold;">quem</span> você deseja desejada <span style="font-weight: bold;">enviar</span>?</p>
                <div class="select">
                  <select class="custom-select" id="email" v-model="email" required>
                    <option v-for="account in accounts" :key="account.id" :account="account">{{ account.email }}</option>
                  </select>
                </div>
              </div>
          </FormControl>
          <div class="actions">
            <Button labelButton="Transferir"/>
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

let accountSnapshotListener = null
let accountSnapshotListener2 = null

export default {
  name: 'new-transfer',
  data () {
    return {
      valueTransfer: null,
      accounts: [],
      email: ''
    }
  },
  components: {
    CardTransaction,
    FormControl,
    Button
  },
  mounted () {
    const userUidCurrent = firebase.auth().currentUser.uid

    accountSnapshotListener = firebase.firestore().collection('accounts')
      .where('userUid', '<', userUidCurrent)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.accounts.push(change.doc.data())
          }

          if (change.type === 'modified') {
            const { id } = change.doc.data()
            const currentObject = this.accounts.filter(account => account.id === id)[0]

            this.accounts[this.accounts.indexOf(currentObject)] = change.doc.data()
            this.$forceUpdate()
          }

          if (change.type === 'removed') {
            const { id } = change.doc.data()
            const currentObject = this.accounts.filter(account => account.id === id)[0]

            this.accounts.splice(this.accounts.indexOf(currentObject), 1)
            this.$forceUpdate()
          }
        })
      })

    accountSnapshotListener2 = firebase.firestore().collection('accounts')
      .where('userUid', '>', userUidCurrent)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.accounts.push(change.doc.data())
          }

          if (change.type === 'modified') {
            const { id } = change.doc.data()
            const currentObject = this.accounts.filter(account => account.id === id)[0]

            this.accounts[this.accounts.indexOf(currentObject)] = change.doc.data()
            this.$forceUpdate()
          }

          if (change.type === 'removed') {
            const { id } = change.doc.data()
            const currentObject = this.accounts.filter(account => account.id === id)[0]

            this.accounts.splice(this.accounts.indexOf(currentObject), 1)
            this.$forceUpdate()
          }
        })
      })
  },
  destroyed () {
    // unsubscribe listener
    accountSnapshotListener()
    accountSnapshotListener2()
  },

  methods: {
    newTransfer () {
      const db = firebase.firestore()

      const userUid = firebase.auth().currentUser.uid

      // Create a reference to the accounts collection
      const accountRef = db.collection('accounts')
      const queryPay = accountRef.where('userUid', '==', userUid)
      const queryDep = accountRef.where('email', '==', this.email)

      // Function remove value to account balance transaction
      const withdrawValueAccount = () => {
        queryPay.get().then(snapshot => {
          snapshot.forEach(doc => {
            const docIdPay = doc.id

            // Create a reference to the accounts collection from the document id
            const accountRefPay = accountRef.doc(docIdPay)

            // Remove value to account balance transaction
            db.runTransaction(t => {
              return t.get(accountRefPay).then(doc => {
                const limiteBalance = doc.data().balance

                if (this.valueTransfer <= limiteBalance) {
                  const newValueAccount = doc.data().balance - this.valueTransfer
                  t.update(accountRefPay, { balance: newValueAccount })

                  // AddValueAccount if withdrawValueAccount is executed
                  addValueAccount()
                } else {
                  alert('Saldo em conta insuficiente para efetuar transferência!')
                }
              })
            })
              .then(() => {
                console.log('Retirada efetuada sucesso!')
              }).catch(error => {
                console.log('Retirada não efetuada! \n\n' + error)
              })
          })
        })
          .catch(error => {
            alert('Erro ao carregar os dados', error)
          })
      }

      // Function add value to account balance transaction
      const addValueAccount = () => {
        queryDep.get().then(snapshot => {
          snapshot.forEach(doc => {
            const docId = doc.id
            // Create a reference to the cities collection
            const accountRefDep = accountRef.doc(docId)

            // Add value to account balance transaction
            db.runTransaction(t => {
              return t.get(accountRefDep).then(doc => {
                const newDepositValue = doc.data().balance + this.valueTransfer
                t.update(accountRefDep, { balance: newDepositValue })
              })
            })
              .then(() => {
                alert('Transferência efetuada com sucesso!')
              }).catch(error => {
                alert('Transferência não efetuada!', error)
              })
          })
        })
      }

      if (this.valueTransfer >= 10 && this.valueTransfer <= 15000) {
        withdrawValueAccount()
      } else {
        alert('Digite um valor entre $KA 10,00 e $KA 15.000,00')
      }
    }
  }
}
</script>

<style scoped>
  .new-transfer{
      height: 100%;
      overflow: auto;
      background: #333333;
      background-size: cover;
      display: flex;
      align-items: center;
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
    margin-bottom: 10px;
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

  .info {
    background-color: #F5F5F5;
    color: #333333;
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }

  .info-limit {
    padding-top: 10px;
    font-size: 10px;
    font-weight: 400;
    margin: .2em 0;
  }

  .info-send {
    padding-top: 10px;
    font-size: 20px;
    font-weight: 400;
    margin: .2em 0;
  }

  .actions {
    background-color: #F5F5F5;
  }

</style>
