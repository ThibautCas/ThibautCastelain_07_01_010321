<template>
  <v-card>
    <v-list v-for="comment in comments" :key="comment.id">
      <v-list-item>
        {{ comment.text }}
      </v-list-item>
      <v-list-item
          >Posted by : {{ comment.User.firstName }}
          {{ comment.User.lastName }} at {{ comment.createdAt }}</v-list-item
        >
        <v-chip v-if="userId == comment.userId || isAdmin"
            class="mx-3 my-2"
            @click="deleteComment(comment.id)"
            color="error"
            depressed
            >Delete Comment</v-chip
          > 
        <v-divider></v-divider>
    </v-list>
      <v-divider></v-divider>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          New Comment
        </v-btn>
      </template>
      <v-card>
        <v-card-title >New Comment</v-card-title>
        <v-divider></v-divider>
        <v-textarea
          v-model="newComment"
          solo
          name="comment"
          label="Your Comment ..."
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="addComment"
          >
            Post Comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
    name: "CommentDisplay",
    props: {
      postId: {
        type: Number,
      }
    },
    data() {
      
      return {
      newComment: "",
      comments: [],
      dialog: false,
      }
    },
  created() {
    let token = this.$store.state.user.token;
    axios
      .get(`http://localhost:3000/api/auth/comment/${this.postId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => (this.comments = response.data));
  },
  computed: {
    userId: function() {
      return this.$store.state.user.userId;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    addComment: function() {
      let token = this.$store.state.user.token;
      let userId = this.$store.state.user.userId;
      let comment = {
        postId: this.postId,
        text: this.newComment,
        user: userId};
       axios({
        url: "http://localhost:3000/api/auth/comment",
        method: "POST",
        data: comment,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
          window.location.reload();
      })
      .catch((err) => console.log(err));
    },
    deleteComment: function(commentId) {
      let token = localStorage.token;
        axios({
            url: `http://localhost:3000/api/auth/post/delete/${commentId}`,
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
          })
      .then(() => {
         window.location.reload();
      })
      .catch((err) => console.log(err));
    }
  }
};
</script>
