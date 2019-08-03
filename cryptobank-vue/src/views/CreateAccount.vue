<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      <form class="createaccount-form" @submit.prevent="createAccountUser">
        <div class="input-control">
          <label for="email-input">E-mail</label>
          <input v-model="account.email" type="email" id="email-input" required name="email" class="input" placeholder="Digite seu e-mail">
        </div>
        <div class="input-control">
          <label for="password-input">Senha</label>
          <input v-model="account.password" type="password" id="password-input" required name="password" class="input" placeholder="Digite sua senha">
        </div>
        <div class="btn-actions">
          <button type="submit" id="creat-account" class="button">
            Criar conta
          </button>
        </div>
        <div class="actions">
          <router-link to="/login">
            <p><span style="font-weight: 300;">Já possui Conta? </span><span style="font-weight: bold;">Acessar</span></p>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'create-account',
  data () {
    return {
      account: {
        email: '',
        password: '',
        balance: 0
      }
    }
  },

  methods: {
    createAccountUser (...args) {
      const { email, password } = this.account

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.createAccountBank()
          this.$router.push({ path: '/login' })
        }).catch((error) => {
          alert('Erro ao criar usuário \n\n' + error)
        })
    },
    createAccountBank (...args) {
      const { email, balance } = this.account

      // const email = this.email
      const docId = firebase.firestore().collection('posts').doc().id
      const userUid = firebase.auth().currentUser.uid

      firebase.firestore()
        .collection('accounts').doc(docId).set({ id: docId, email, balance, userUid })
        .then(() => {
          alert('Conta criada com sucesso!')
        }).catch(error => {
          alert('Erro ao criar conta! \n\n' + error)
        })
    }
  }
}
</script>

<style scoped>
  .auth-content {
    height: 100%;
    overflow: auto;
    background: url("../assets/fundo.png") no-repeat center center fixed;
    background-color: #000000;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .auth-modal {
    width: 430px;
    padding: 35px;

    display: flex;
    flex-direction: column;
  }

  .createaccount-form {
    display: flex;
    flex-direction: column;
    margin-top: 45px;
  }

  .input-control {
    margin-bottom: 20px;
  }

  .input-control > label {
    display: block;
    padding: 10px 0px;
    color: #FFF;
    font-weight: 700;
  }

  .input-control > .input {
    height: 45px;
    width: 100%;
    border-radius: 5px;
    border-width: 0;
    background: #FFF;

    font-family: 'Roboto', sans-serif;
    font-size: 15px;

    padding: 0 15px;
  }

  .input-control > .input:focus {
    background: #F2F2F2;
  }

  .btn-actions {
    display: flex;
    justify-content: center;
  }

  .createaccount-form > .btn-actions > button[type="submit"] {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FA7268;
  font-family: 'Roboto', sans-serif;
  border: 0;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
  width: 130px;
  height: 45px;
  cursor: pointer;
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .actions > a {
    cursor: pointer;
    color: #FFF;
    text-decoration: none;
    padding: 15px;
  }

 .logo {
   margin: auto;
   display: block;
  }
</style>
