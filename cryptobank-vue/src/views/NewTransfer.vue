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
              <input v-model.number="valuePay" required type="number" class="input">
              <span class="info-limit">Digite um valor entre $KA 10,00 e $KA 15.000,00</span>
              <div class="info">
                <span class="info-send">Para quem você deseja enviar?</span>
                <div class="select">
                  <select v-model="email" name="select-emails" id="select-emails">
                    <option v-for="account in accounts" :key="account.id" :account="account">{{ account.email }}</option>
                  </select>
                </div>
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
      accounts: []
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

  .info {
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

</style>
