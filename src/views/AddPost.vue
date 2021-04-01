<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.title"
      :rules="[rules.required]"
      label="Title"
      required
    ></v-text-field>

    <v-textarea autoGrow v-model="form.text" label="Text"></v-textarea>

    <v-file-input
      v-model="form.image"
      chips
      prepend-icon="mdi-camera"
      accept="image/png, image/jpeg, image/gif"
      label="Submit your image"
      @change="Preview_image"
    ></v-file-input>
    <v-img v-if="form.image" :src="url"></v-img>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="I confirm that my post is in accordance with all the company policies."
      required
    ></v-checkbox>
    <div class="text-center">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Clear form
      </v-btn>

      <v-btn color="warning" @click="goBack">
        Back home
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    form: {
      title: "",
      text: "",
      image: {},
    },
    rules: {
      required: (v) => !!v || "Field is required",
    },
    valid: false,
    select: null,
    checkbox: false,
    url: "",
  }),
  computed: {
    image: function() {
      return this.form.image || "";
    },
  },
  methods: {
    validate() {
      let formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("text", this.form.text || "");
        formData.append("image", this.form.image || "");
      let token = this.$store.state.user.token;

      axios.post("http://localhost:3000/api/auth/post", formData,
        {headers: {
          Authorization: "Bearer " + token,
           "content-type": "multipart/form-data"
        },
      })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    }
    ,
    Preview_image() {
      this.url = URL.createObjectURL(this.form.image) || "";
    },
    reset() {
      this.$refs.form.reset();
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
