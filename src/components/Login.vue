<template>
 <div>
   <v-card width="400" class="mx-auto ma-5">
      <v-card-title class="pb-3">
      <h1 class="text-center ma-4">Login</h1>
      </v-card-title>
      <v-card-text>
   <v-form class="login" @submit.prevent="login">
          <v-text-field
            v-model="form.email"
            :rules="[rules.email, rules.required]"
            color="blue darken-2"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :rules="[rules.password, rules.length(8)]"
            color="blue darken-2"
            label="Password"
            type="password"
          ></v-text-field>
          </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="text-center">
        <v-btn color="success" :disabled="!formIsValid" @click="login">Login</v-btn>
        <v-btn text @click="resetForm">
          Cancel
        </v-btn>
      </v-card-actions>
      <span class="mt-3" cols="6"
        >Still not registered on our social network, click here to create an
        account :</span
      >
      <router-link to="/register" custom v-slot="{ navigate }">
        <v-btn @click="navigate" role="link" color="success">Sign Up</v-btn>
      </router-link>
      </v-card>
 </div>
</template>

<script>
export default {
  name: "Login",
    data(){
      const defaultForm = Object.freeze({
      email: "",
      password: "",
    });

      return {
        form: Object.assign({}, defaultForm),
      rules: {
        required: (v) => !!v || "Field is required",
        email: (v) =>
          !!(v || "").match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: (v) =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
      },
      defaultForm,
      }
    },
    computed: {
    formIsValid() {
      return this.form.email && this.form.password;
    },
  },
    methods: {
      resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
      login() {
        let email = this.form.email
        let password = this.form.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>