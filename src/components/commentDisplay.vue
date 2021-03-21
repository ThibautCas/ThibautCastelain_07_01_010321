<template>
  <v-card>
    <v-list v-for="comment in comments" :key="comment.id">
      <v-list-item>
        {{ comment.text }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
    name: "CommentDisplay",
  created() {
    let token = this.$store.state.user.token;
    axios
      .get(`http://localhost:3000/api/auth/comment/{{ postId }}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => (this.comments = response.data));
  },
  computed: {
    postId: function() {
      return this.$parent.postId
    }
  }
};
</script>
