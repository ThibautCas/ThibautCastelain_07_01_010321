<template>
    <v-card width="500" class="mx-auto mt-5">
      <v-form ref="form" @submit.prevent="update">
        <h1 class="text-center ma-4">User Informations</h1>
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
            Update
          </v-btn>
        </v-card-actions>
      </v-form>
      <v-btn @click="deleteUser">Delete Your Account</v-btn>
    </v-card>
</template>

<script>
export default {
  name: "Signup",
  data() {
    const defaultForm = Object.freeze({
      firstName: this.$store.state.firstName || "",
      lastName: this.$store.state.lastName || "",
      email: this.$store.state.email || "",
      fonction: this.$store.state.fonction || "",
      password: "",
      userId: this.$store.state.userId || "",
      terms: false,
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        required: (v) => !!v || "Field is required",
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
      terms: false,
      defaultForm,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.form.firstName &&
        this.form.lastName &&
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
    update: function() {
      if (this.form.password === this.form.passwordCheck) {
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        fonction: this.form.fonction,
        password: this.form.password,
        userId: this.state.userId
      };
      this.$store
        .dispatch("update", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    } else alert("You did not entered the same password twice !!");
  },
  deleteUser: function() {
      let data = {
          userId: this.state.userId
      };
      this.$store.dispatch("deleteUser", data)
      .then(() => {
          this.$router.push("/");
      })
      .catch((err) => console.log(err));
  }
  }
};
</script>