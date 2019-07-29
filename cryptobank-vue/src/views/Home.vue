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
      <button type="navigate" id="new-deposit-button" class="center" @click="handleNewDeposit">Depositar</button>
      <button id="btn-pay">Pagar</button>
      <button id="btn-transfer">Transferir</button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
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
    Card
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
      this.$router.push({ path: '/deposit' })
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
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .auth-modal {
    width: 430px;
    padding: 35px;

    display: flex;
    flex-direction: column;
  }

  .btn-actions {
    display: flex;
    flex-direction: column;
  }

  #new-deposit-button {
    margin: 10px;
  }

  #btn-pay {
    margin: 10px;
  }

  #btn-transfer {
    margin: 10px;
  }

</style>
