<template>
  <v-card my-4>
    <v-list-item v-for="post in posts" :key="post.id">
      <v-card class="mx-auto my-4" outlined>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ post.title }}
        </v-list-item-title>
        <v-list-item-content>{{ post.text }}</v-list-item-content>
        <v-list-item-subtitle v-if="post.User"
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
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Update Post
        </v-btn>
      </template>
      <UpdatePost />
    </v-dialog>
  </v-row>
        <v-btn
            class="mx-3 my-2"
            @click="deletePost"
            color="error"
            depressed
            >Delete Post</v-btn
          > 
          <v-divider></v-divider>
        <v-card-actions>
          <v-list-item text>
            <CommentDisplay />
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
import UpdatePost from "./UpdatePost";

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
  methods: {
    deletePost: function() {
      let data = {
          id: this.post.id
      };
      this.$store.dispatch("deletePost", data)
      .then(() => {
          this.$router.push("/");
      })
      .catch((err) => console.log(err));
  },
  updatePost: function() {
    
  }
  },
  components: {
    CommentDisplay,
    UpdatePost
  },
};
</script>
