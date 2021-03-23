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
      ref="image"
      label="Submit your image"
      @change="Preview_image"
    ></v-file-input>
    <v-img v-if="image" :src="url"></v-img> 

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
      image: "",
    },
    rules: {
      required: (v) => !!v || "Field is required",
    },
    valid: false,
    select: null,
    checkbox: false,
  }),
  computed: {
    image: function() {
      return this.form.image.file || "";
    },
  },
  methods: {
    validate() {
      let data = {
        title: this.form.title,
        text: this.form.text || "",
        image: this.form.image.file || "",
      };
      let token = this.$store.state.user.token;
      
      axios({
        url: "http://localhost:3000/api/auth/post",
        method: "POST",
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
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
