<template>
  <v-app>
    <div>
      <v-container>
        <Header />
          <Login v-if="!isLoggedIn" />
          <v-row>
          <v-col cols="4" sm="12"><Sidebar v-if="isLoggedIn" /></v-col>
          <v-col cols="8" sm="12"><PostDisplay v-if="isLoggedIn" /></v-col>
          </v-row>
        <Footer />
      </v-container>
    </div>
  </v-app>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import PostDisplay from "../components/PostDisplay";
import Footer from "../components/Footer"

export default {
  name: "Home",

  components: {
    Header,
    Login,
    Sidebar,
    PostDisplay,
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