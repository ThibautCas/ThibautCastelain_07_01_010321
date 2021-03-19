<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.title"
      :rules="[rules.required]"
      label="Title"
      required
    ></v-text-field>

    <v-textarea
      autoGrow
      v-model="form.text"
      label="Text"
    ></v-textarea>

    <!--<v-file-input
    accept="image/*"
    label="File input"
  ></v-file-input>-->

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="I confirm that my post is in accordance with all the company policies."
      required
    ></v-checkbox>
    <div class="text-center">
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="warning"
      @click="goBack"
    >
      Back home
    </v-btn>
    </div>
  </v-form>
</template>

<script>

  export default {
    data: () => ({
        form: {
            title: this.post.title || "",
            text: this.post.text || "",
            //image: this.post.image || ""
        },
        rules: {
            required: (v) => !!v || "Field is required",
            },
      valid: false,
      select: null,
      checkbox: false,
    }),

    methods: {
        updatePost: function() {
      let data = {
        title: this.form.title,
        text: this.form.text,
        //image: this.form.image,
      };
      this.$store
        .dispatch("updatePost", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
  },
      goBack () {
        this.$router.push('/')
      },
    },
  }
</script>