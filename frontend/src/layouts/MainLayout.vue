<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
          <q-btn to="/" flat round dense icon="store" />
          <q-toolbar-title>Toko Buku</q-toolbar-title>
          <q-space />
          <div v-if="isAuthenticated">
            <q-btn to="/profile" flat class="q-mr-xs" label="Profile"/>
            <q-btn @click="logout" flat class="q-mr-xs" label="Logout"/>
          </div>
          <div v-else>
            <q-btn to="/login" flat class="q-mr-xs" label="Login"/>
            <q-btn to="/register" flat class="q-mr-xs" label="Register"/>
          </div>
        </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import Global from '../methods/global'
import { computed } from 'vue'
const { $store, showNotificationMessage, $q } = Global()
const isAuthenticated = computed(() => $store.state.storage.isAuthenticated)
const logout = async () => {
  $q.cookies.remove('token')
  $store.commit('storage/set', ['isAuthenticated', false])
  showNotificationMessage('Anda berhasil logout', 'positive')
  window.location.replace('/')
}

</script>
