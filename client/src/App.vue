<template>
  <nav
    class="navbar navbar-expand-sm bg-primary navbar-dark justify-content-center"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/login" class="nav-link" v-if="checkData"
          >Login</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/register" class="nav-link" v-if="checkData"
          >register</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/home" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item" v-if="checkLogout">
        <span
          class="nav-link"
          :style="{ cursor: 'pointer' }"
          @click="logoutSubmit()"
          >Logout</span
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      checkLogout: false,
      checkData: true,
    };
  },
  mounted() {
    const showData = JSON.parse(localStorage.getItem("getUser"));
    console.log(showData);
    if (showData != null) {
      this.checkLogout = true;
      this.checkData = false;
    }
  },
  methods: {
    logoutSubmit() {
      window.location = "/home";
      localStorage.removeItem("getUser");
    },
  },
};
</script>

<style></style>
