<template>
    <div>
  <v-chip class="mx-3" color="blue" link outlined pill >
    <v-icon color="red">mdi-heart</v-icon>
    {{ postLike.count }} liked</v-chip
  >
  <v-chip class="mx-3" color="blue" link outlined pill @click="addLike">
      <v-icon color="blue">mdi-thumb-up</v-icon> Add like
  </v-chip>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostLikeDisplay",
  props: {
    postId: {
      type: Number,
    },
  },
  data() {
    return {
      postLike: 0,
    };
  },
  created() {
    let token = this.$store.state.user.token;
    axios
      .get(`http://localhost:3000/api/auth/likePost/${this.postId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => (this.postLike = response.data));
  },
  computed: {
    userId: function() {
      return this.$store.state.user.userId;
    },
  },
  methods: {
    addLike: function() {
      let token = this.$store.state.user.token;
      let userId = this.$store.state.user.userId;
      let postLike = {
        postId: this.postId,
        user: userId,
      };
      axios({
        url: "http://localhost:3000/api/auth/likePost",
        method: "POST",
        data: postLike,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
