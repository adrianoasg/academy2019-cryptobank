<template>
  <div class="auth-content">
    <Header>
      <div class="auth-modal">
        <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      </div>
    </Header>
    <div class="card">
      <Card v-for="account in accounts" :key="account.id" :account="account" />
    </div>
    <div class="btn-actions">
      <Button labelButton="Depositar" :image="require('../assets/piggy-bank.svg')" :onClickCallback="handleNewDeposit" />
      <Button labelButton="Pagar" :image="require('../assets/pay.svg')" :onClickCallback="handleNewPay" />
      <Button labelButton="Transferir" :image="require('../assets/surface1.svg')" :onClickCallback="handleNewTransfer" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/home/Card'
import Button from '@/components/home/Button'
import firebase from 'firebase'

let accountSnapshotListener = null

export default {
  name: 'home',
  data () {
    return {
      accounts: []
    }
  },
  components: {
    Card,
    Button
  },
  mounted () {
    const userUid = firebase.auth().currentUser.uid

    accountSnapshotListener = firebase.firestore().collection('accounts')
      .where('userUid', '==', userUid)
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
  },
  methods: {
    handleNewDeposit () {
      this.$router.push({ path: '/deposit/new' })
    },
    handleNewPay () {
      this.$router.push({ path: '/pay/new' })
    },
    handleNewTransfer () {
      this.$router.push({ path: '/transfer/new' })
    }
  }
}
</script>

<style scoped>
  .auth-content {
    height: 100%;
    overflow: auto;
    background: #333333;
    background-size: cover;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .auth-modal {
    width: 430px;
    /* padding: 35px; */

    display: flex;
    flex-direction: column;
  }

  .logo {
    padding-top: 20px;
  }

  .card {
    margin-bottom: 100px;
  }

  .btn-actions {
    display: flex;
    flex-direction: column;
  }
</style>
