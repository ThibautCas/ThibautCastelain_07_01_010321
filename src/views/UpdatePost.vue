<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="form.title"
      :rules="[rules.required]"
      label="Title"
      required
    ></v-text-field>

    <v-textarea autoGrow v-model="form.text" label="Text"></v-textarea>

    <!--<v-file-input
    accept="image/*"
    label="File input"
  ></v-file-input>-->

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="I confirm that my post is in accordance with all the company policies."
      required
    ></v-checkbox>
    <div class="text-center">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="updatePost">
        Validate
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
  name: "UpdatePost",
  data: () => ({
    form: {
      title: "",
      text: "",
      //image: this.post.image || ""
    },
    rules: {
      required: (v) => !!v || "Field is required",
    },
    valid: false,
    select: null,
    checkbox: false,
  }),
  beforeCreate() {
    let token = this.$store.state.user.token;
    let postId = localStorage.postId;

    axios
      .get(`http://localhost:3000/api/auth/post/${postId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.form.title = response.data.title;
        this.form.text = response.data.text;
        });
  },
  methods: {
    updatePost: function() {
      let data = {
        title: this.form.title,
        text: this.form.text,
        //image: this.form.image,
      };
      let postId = localStorage.postId;
        let token = localStorage.token;
        axios({
          url: `http://localhost:3000/api/auth/post/update/${postId}`, 
          method: "PUT",
          data: data,
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
