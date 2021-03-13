<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <Header />
        <router-view>
          <Login v-if="!isLoggedIn" />
          <Connected v-if="isLoggedIn" />
        </router-view>
        <Footer />
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
import Connected from "../components/Connected";
import Footer from "../components/Footer"

export default {
  name: "Home",

  components: {
    Header,
    Login,
    Connected,
    Footer
  },

  data: () => ({
    //
  }),
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>