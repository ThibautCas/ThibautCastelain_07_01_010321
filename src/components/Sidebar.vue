<template>
  <v-card class="mx-2 mt-4" height="250" width="250">
    <v-navigation-drawer permanent width="100%">
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          dark
          mini-variant
          mini-variant-width="56"
          permanent
        >
          <v-list-item class="px-2">
            <v-list-item-avatar class="my-7">
              <v-img
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="link in links" :key="link">
              <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-list class="grow">
          <v-list-item>
            {{ $store.state.firstName }}
            {{ $store.state.lastName }}</v-list-item
          >
          <router-link to="/user" >
            <v-btn class="mx-3 mb-1" @click="user" role="link" color="warning"
              >Edit infos</v-btn
            >
          </router-link>
          <v-divider></v-divider>
          <v-list-item v-for="link in links" :key="link" link>
            <v-list-item-title v-text="link.name"></v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-btn
            class="mx-3 mt-2"
            v-if="isLoggedIn"
            @click="logout"
            color="error"
            depressed
            >Log Out</v-btn
          >
        </v-list>
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Home", icon: "mdi-home" },
        { name: "Add New Post", icon: "mdi-forum" },
      ],
      mini: true,
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    user: function() {
      this.$router.push("/user");
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
