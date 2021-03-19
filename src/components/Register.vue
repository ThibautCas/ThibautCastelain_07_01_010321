<template>
    <v-card width="500" class="mx-auto mt-5">
      <v-snackbar v-model="snackbar" color="success">
        <div class="text-center">
          <span>Registration successful! </span>
          <v-icon dark>
            mdi-checkbox-marked-circle
          </v-icon>
        </div>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="register">
        <h1 class="text-center ma-4">Sign Up</h1>
        <v-text-field
          v-model="form.firstName"
          :rules="[rules.required]"
          color="blue darken-2"
          label="First name"
          required
          autofocus
        ></v-text-field>
        <v-text-field
          v-model="form.lastName"
          :rules="[rules.required]"
          color="blue darken-2"
          label="Last name"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.fonction"
          :rules="[rules.required]"
          color="blue darken-2"
          label="Function in the Company"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          :rules="[rules.email]"
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
        <v-text-field
          v-model="form.passwordCheck"
          :rules="[rules.password, rules.length(8)]"
          color="blue darken-2"
          label="Retype your password"
          type="password"
        ></v-text-field>
        <v-checkbox v-model="form.terms" color="green">
          <template v-slot:label>
            I hereby confirm that I'm an employee of Groupomania and I want to
            register in this social network.
          </template>
        </v-checkbox>
        <v-card-actions>
          <v-btn text @click="resetForm">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text color="primary" type="submit">
            Register
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<script>
export default {
  name: "Signup",
  data() {
    const defaultForm = Object.freeze({
      firstName: "",
      lastName: "",
      email: "",
      fonction: "",
      password: "",
      terms: false,
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
      conditions: false,
      snackbar: false,
      terms: false,
      defaultForm,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.form.firstName &&
        this.form.lastName &&
        this.form.email &&
        this.form.fonction &&
        this.form.password &&
        this.form.terms
      );
    },
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    register: function() {
      if (this.form.password === this.form.passwordCheck) {
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        fonction: this.form.fonction,
        password: this.form.password,
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          (this.snackbar = true),
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    } else alert("You did not entered the same password twice !!");
  },
  }
};
</script>
