<template>
    <v-card width="500" class="mx-auto mt-5">
      <v-form ref="form" @submit.prevent="updateUser">
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
            I hereby confirm that all the informations I entered are true.
          </template>
        </v-checkbox>
        <v-card-actions>
          <v-btn text @click="goBack">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text color="primary" type="submit">
            Update
          </v-btn>
        </v-card-actions>
      </v-form>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Delete Your Account
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Confirmation
        </v-card-title>

        <v-card-text>
          I confirm that I want to delete my account, which will cancel my access to this network and delete all my posts and comments.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="deleteUser"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </v-card>
</template>

<script>
export default {
  name: "Signup",
  data() {
    const defaultForm = Object.freeze({
      firstName: this.$store.state.user.firstName || "",
      lastName: this.$store.state.user.lastName || "",
      email: this.$store.state.user.email || "",
      fonction: this.$store.state.user.fonction || "",
      password: "",
      userId: this.$store.state.user.userId || "",
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
      dialog: false,
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
    goBack() {
      this.$router.push("/");
    },
    updateUser: function() {
      if (this.form.password === this.form.passwordCheck) {
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        fonction: this.form.fonction,
        password: this.form.password,
        userId: this.$store.state.userId
      };
      this.$store
        .dispatch("updateUser", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    } else alert("You did not entered the same password twice !!");
  },
  deleteUser: function() {
      let data = {
          userId: this.$store.state.userId
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