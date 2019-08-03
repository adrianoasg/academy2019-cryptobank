<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img class="logo" :src="require('../assets/logo.svg')" alt="Logo"/>
      <form class="login-form" @submit.prevent="submitLogin">
        <div class="input-control">
          <label for="email-input">E-mail</label>
          <input v-model="email" type="email" id="email-input" required name="email" class="input" placeholder="Digite seu e-mail">
        </div>
        <div class="input-control">
          <label for="password-input">Senha</label>
          <input v-model="password" type="password" id="password-input" required name="password" class="input" placeholder="Digite sua senha">
        </div>
        <div class="btn-actions">
          <button type="submit" id="login-button" class="button">
            Entrar
          </button>
        </div>
        <div class="actions">
          <router-link to="/create_account">
            <p><span style="font-weight: 300;">Novo usuário? </span><span style="font-weight: bold;">Criar Conta</span></p>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    submitLogin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('Autenticado com sucesso!')
          this.$router.push({ path: '/home' })
        }).catch(() => {
          alert('Falha na autenticação!')
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

  .login-form {
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

  .login-form > .btn-actions > button[type="submit"] {
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
  width: 100px;
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
