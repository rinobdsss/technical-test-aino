<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-md-6 col-12 container" v-if="$q.screen.gt.xs">
            <q-img :src="background" :ratio="1/1.05" style="position: relative;"/>
            <q-img :src="logo" class="logo" />
            <div>
              <div class="title">Toko Buku</div>
              <div class="name">Book Store</div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import background from 'assets/background.png'
import logo from 'assets/LogoYayasan.png'
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.logo {
  height: auto;
  max-width: 50%;
  position: absolute;
  margin: auto;
  display: block;
  top: 15%;
  left: 25%;
  right: 25%;
}
.title {
  position: absolute;
  margin: auto;
  top: 65%;
  left: 50px;
  right: 50px;
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 150%;
  /* identical to box height, or 63px */

  text-align: center;

  color: #FFFFFF;
}
.name {
  position: absolute;
  margin: auto;
  top: 73%;
  left: 25%;
  right: 25%;

  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 150%;
  /* identical to box height, or 54px */

  text-align: center;

  color: #E37C25;
}
</style>
