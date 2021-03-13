<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <v-btn v-if="isLoggedIn" @click="logout" color="error" depressed
          >Log Out</v-btn
        >
        <router-view>
          <Login v-if="!isLoggedIn" />
        </router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
import Login from "./components/Login";
export default {
  name: "App",

  components: {
    Login,
  },

  data: () => ({
    //
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
