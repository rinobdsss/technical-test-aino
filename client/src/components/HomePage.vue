<template>
  <div class="text-center" :style="{ marginTop: '5%' }">
    <h4>Home page</h4>
    Nama :{{ getData.name }} Email :{{ getData.email }}
  </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  data() {
    if (JSON.parse(localStorage.getItem("getUser")) == null) {
      this.$toast.error(`Anda belum login`);
    }
    return {};
  },
  setup() {
    const router = useRouter();
    const getData = ref([]);
    const showData = JSON.parse(localStorage.getItem("getUser"));
    if (showData != null) {
      axios
        .get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: showData.data.token,
          },
        })
        .then((result) => {
          getData.value = result.data.data;
        })
        .catch((err) => {
          // this.toast;
          console.log(err);
          router.push({
            path: `./login`,
          });
        });
    } else {
      router.push({
        path: `./login`,
      });
    }
    return {
      getData,
    };
  },
};
</script>
