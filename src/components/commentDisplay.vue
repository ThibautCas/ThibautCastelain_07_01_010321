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
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
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
            @click="dialog = false"
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
};
</script>
