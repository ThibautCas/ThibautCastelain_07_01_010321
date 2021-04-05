<template>
  <v-card class="mx-2 my-4" height="300" width="300">
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
                    <v-img v-if="avatar" :src="image" alt="image"></v-img>
              <v-img v-if="!avatar"
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item>
              <v-icon>mdi-home</v-icon>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-forum</v-icon>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-list class="grow">
          <v-list-item>
            {{ firstName }}
            {{ lastName }}</v-list-item
          >
          <router-link to="/user">
            <v-btn
              class="mx-3 mb-1"
              @click="user"
              role="link"
              color="warning"
              depressed
              >Edit infos</v-btn
            >
          </router-link>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn class="mb-1" @click="addPost">Add Post</v-btn>
          </v-list-item>
          <v-list-item>
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="isAdmin"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Admin mode
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Who do you want to upgrade to Admin ?
                </v-card-title>
                <v-text-field
                  v-model="form.email"
                  :rules="[rules.email]"
                  color="blue darken-2"
                  label="Email"
                  required
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="green darken-1" text @click="upgradeToAdmin">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item>
          <v-divider></v-divider>
          <v-btn
            class="mx-4 my-4"
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
    const defaultForm = Object.freeze({
      email: "",
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        email: (v) =>
          !!(v || "").match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "Please enter a valid email",
      },
      defaultForm,
      fonction: localStorage.fonction,
      userId: localStorage.userId,
      mini: true,
      dialog: false,
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    firstName: function() {
      return this.$store.state.user.firstName;
    },
    lastName: function() {
      return this.$store.state.user.lastName;
    },
    avatar: function() {
      return this.$store.state.user.image != "null";
    },
    image: function() {
      return this.$store.state.user.image;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    user: function() {
      this.$router.push("/user");
    },
    addPost: function() {
      this.$router.push("/add-post");
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    upgradeToAdmin: function() {
      let payload = { email: this.form.email };
      this.$store
          .dispatch("upgradeToAdmin", payload)
          .then(() => {
            this.dialog = false;
          })
          .catch((err) => console.log(err));
      } 
    },
};
</script>
