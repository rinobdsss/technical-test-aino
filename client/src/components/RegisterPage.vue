<template>
  <div :style="{ marginTop: '15%' }">
    <div
      class="card shadow p-4"
      :style="{
        width: '50%',
        display: 'flex',
        margin: '0 auto',
      }"
    >
      <h4 class="text-center">Register</h4>
      <div class="form-group">
        <label for="">Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="email"
          v-model="email"
        />
      </div>
      <div class="form-group mt-4">
        <label for="">Username</label>
        <input
          type="text"
          class="form-control"
          placeholder="name"
          v-model="name"
        />
      </div>
      <div class="form-group mt-4">
        <label for="">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="password"
          v-model="password"
        />
      </div>
      <div class="form-group mt-4">
        <button class="btn btn-success mt-4" @click="onSubmit()">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(data);
      axios
        .post("http://localhost:8080/api/auth/register", data)
        .then(() => {
          this.$toast.success("Registrasi berhasil");
          this.$router.push({
            path: "/login",
          });
        })
        .catch((err) => {
          this.$toast.error(err);
        });
    },
  },
};
</script>
