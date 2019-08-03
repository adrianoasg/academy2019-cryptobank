<template>
  <div class="auth-content">
    <Header>
      <div class="icon-button" @click="signOut">
        <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      </div>
    </Header>
    <div class="card">
      <Card v-for="account in accounts" :key="account.id" :account="account" />
    </div>
    <div class="btn-actions">
      <router-link to="/deposit/new">
        <div class="content">
          <div class="button">
            <img :src="require('../assets/piggy-bank.svg')" alt="Icon">
          </div>
          <div class="text-button">
            <span>Depositar</span>
          </div>
        </div>
      </router-link>
      <router-link to="/pay/new">
        <div class="content">
          <div class="button">
            <img :src="require('../assets/pay.svg')" alt="Icon">
          </div>
          <div class="text-button">
            <span>Pagar</span>
          </div>
        </div>
      </router-link>
      <router-link to="/transfer/new">
        <div class="content">
          <div class="button">
            <img :src="require('../assets/surface1.svg')" alt="Icon">
          </div>
          <div class="text-button">
            <span>Transferir</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from '@/components/home/Card'
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
    signOut () {
      firebase.auth().signOut().then(() => {
        alert('Desconectado com sucesso!')
        this.$router.push('/login')
      }).catch(error => {
        alert('Erro ao desconectar. \n\n' + error)
      })
    }
  }
}
</script>

<style scoped>
  .auth-content {
    overflow: auto;
    background: #333333;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  .icon-button {
    width: 430px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .logo {
    padding-top: 20px;
  }

  .card {
    margin-bottom: 80px;
  }

  .btn-actions {
    display: flex;
    flex-direction: column;
  }

  .btn-actions > a {
    cursor: pointer;
    color: #FFF;
    text-decoration: none;
  }

 /* Buttton */
  .content {
  width: 334px;
  height: 50px;
  background-color: #FA7268;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
}

.button {
  display: flex;
  justify-content: center;
  margin-left: 10px;
}

.text-button {
  font-size: 20px;
  color: #FFF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  margin-right: 10px;
}

</style>
