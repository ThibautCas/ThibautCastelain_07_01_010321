<template>
  <v-card>
    <v-list v-for="comment in comments" :key="comment.id">
      <v-list-item>
        {{ comment.text }}
      </v-list-item>
      <!-- <v-list-item-subtitle 
          >Posted by : {{ comment.User.firstName }}
          {{ comment.User.lastName }} at {{ comment.createdAt }}</v-list-item-subtitle
        >  -->
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
  methods: {
    addComment: function() {
      let token = this.$store.state.user.token;
      let userId = this.$store.state.user.userId;
      let comment = {
        post: this.postId,
        text: this.newComment,
        userId: userId};
       axios.post(`http://localhost:3000/api/auth/comment`, {
        data: comment,
        headers: {
          Authorization: "Bearer " + token,
        },
        
        })
      .then(() => {
          this.$router.push("/");
      })
      .catch((err) => console.log(err));
    }
  }
};
</script>
