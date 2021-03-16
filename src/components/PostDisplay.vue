<template>
  <v-card class="mx-auto my-4" outlined>
    <v-list-item v-for="post in posts" :key="post.id">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ post.title }}
        </v-list-item-title>
        <v-list-item-content>{{ post.text }}</v-list-item-content>
        <v-list-item-subtitle
          >{{ post.User.firstname }}
          {{ post.User.lastname }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <v-list-item text>
        Comment
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "PostDisplay",
  data() {
    return {
      posts: localStorage.posts || "",
  }
  },
  created() {
    let token = this.$store.state.user.token
    axios.get(`http://localhost:3000/api/auth/post/`, {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(response => (this.posts = response.data));
    localStorage.setItem("posts", this.posts);
  },

};
</script>
