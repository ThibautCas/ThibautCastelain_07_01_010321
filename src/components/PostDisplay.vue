<template>
  <v-card my-4>
    <v-list-item v-for="post in posts" :key="post.id">
      <v-card class="mx-auto my-4" outlined>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ post.title }}
        </v-list-item-title>
        <v-list-item-content>{{ post.text }}</v-list-item-content>
        <v-list-item-subtitle 
          >Posted by : {{ post.User.firstName }}
          {{ post.User.lastName }} at {{ post.createdAt }}</v-list-item-subtitle
        >
        <v-divider></v-divider>
  <v-row justify="center" class="my-4">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="userId === `{{ post.userId }}` || isAdmin"
          @click="updatePost(post.id)"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Update Post
        </v-btn>
      </template>
    </v-dialog>
  </v-row>
        <v-btn v-if="userId === `{{ post.userId }}` || isAdmin"
            class="mx-3 my-2"
            @click="deletePost(post.id)"
            color="error"
            depressed
            >Delete Post</v-btn
          > 
          <v-divider></v-divider>
        <v-card-actions>
          <v-list-item text>
            <CommentDisplay :postId="post.id"/>
          </v-list-item>
        </v-card-actions>
      </v-list-item-content>
      </v-card>
    </v-list-item>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import axios from "axios";
import CommentDisplay from "./commentDisplay";

export default {
  name: "PostDisplay",
  data() {
    return {
      posts: [],
      dialog: false,
    };
  },
  beforeCreate() {
    let token = this.$store.state.user.token;
    axios
      .get(`http://localhost:3000/api/auth/post/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => (this.posts = response.data));
    localStorage.setItem("posts", this.posts);
  },
  computed: {
    userId: function() {
      return this.$store.state.user.userId;
    },
    isAdmin: function() {
      return this.$store.state.user.isAdmin;
    },
    postId: function() {
      return this.post.id;
    },
  },
  methods: {
    updatePost: function(postId) {
      localStorage.setItem("postId", postId);
      this.$router.push("/update-post");
    },
    deletePost: function(postId) {
      let token = localStorage.token;
        axios({
            url: `http://localhost:3000/api/auth/post/delete/${postId}`,
            method: "DELETE",
            
            headers: { Authorization: "Bearer " + token },
          })
      .then(() => {
         window.location.reload();
      })
      .catch((err) => console.log(err));
  },
  
  },
  components: {
    CommentDisplay,
  },
};
</script>
