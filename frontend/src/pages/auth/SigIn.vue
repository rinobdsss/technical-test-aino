<template>
  <div class="auth">
    <div class="header">Masuk</div>
    <div class="subtitle">
      Silahkan masuk untuk mengakses fitur Teacher Sekolah Ananda
    </div>
    <q-form @submit="submit" class="q-gutter-y-sm q-pt-lg">
      <div class="input q-gutter-y-sm">
        <div>Email</div>
        <q-input
          square
          outlined
          dense
          type="email"
          v-model="state.email"
        >
          <template v-slot:append>
            <q-icon name="mail_outline" color="grey" />
          </template>
        </q-input>
      </div>
      <div class="input q-gutter-y-sm">
        <div>Password</div>
        <q-input
          square
          outlined
          dense
          v-model="state.password"
          type="password"
        >
        </q-input>
      </div>
      <div class="q-pt-lg">
        <q-btn class="submitbutton" unelevated label="Masuk" no-caps type="submit" />
      </div>
    </q-form>
  </div>
</template>
<script setup>

import Global from '../../methods/global'
import { reactive } from 'vue'

const { axios, $q, $store, $router, showNotificationMessage } = Global()

const state = reactive({
  email: '',
  password: ''
})

const submit = async (e) => {
  try {
    axios.post('api/v1/login', {
      email: state.email,
      password: state.password
    }).then((response) => {
      console.log(response.data.token)
      $q.cookies.set('token', response.data.token, {
        expires: 30
      })
      axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
      $q.cookies.set('token', response.data.token)
      $store.commit('storage/set', ['isAuthenticated', true])
      showNotificationMessage('Anda berhasil login', 'positive')
      $router.replace({ name: 'Profile' })
    })
  } catch (e) {
    console.log(e)
  }
}

</script>
<style lang="scss" scoped>
.header {
  font-family: "Nunito Sans";
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  color: #03337b;
}
.subtitle {
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: rgba(51, 51, 51, 0.75);
}
.input {
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 600;
  color: rgba(51, 51, 51, 0.75);
}
.remember {
  margin-left: -8px;
  font-family: "Nunito Sans";
}
.forgot {
  text-align: right;
  font-family: "Nunito Sans";
  color: grey;
  text-decoration: none;
  cursor: pointer;
}
.forgot:hover {
  text-decoration: underline;
}
.submitbutton {
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background: linear-gradient(90deg, #03337b -0.91%, #03337b 100.91%);
  color: #FFFF;
}
</style>
