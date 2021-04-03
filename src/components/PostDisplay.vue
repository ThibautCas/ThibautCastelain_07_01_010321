<template>
  <v-card class="mx-2 my-4">
    <v-list-item v-for="post in posts" :key="post.id">
      <v-card class="mx-auto my-4" outlined>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ post.title }}
          </v-list-item-title>
          <div v-if="post.image" class="post-img">
            <img :src="post.image" alt="image" />
          </div>
          <v-list-item-content>{{ post.text }}</v-list-item-content>
          <PostLikeDisplay :postId="post.id" />
          <v-list-item-subtitle
            >Posted by : {{ post.User.firstName }} {{ post.User.lastName }} at
            {{ post.createdAt }}</v-list-item-subtitle
          >
          <v-divider></v-divider>
          <v-row justify="center" class="my-4">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="userId == post.userId"
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
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="userId == post.userId || isAdmin"
                @click="deletePost(post.id)"
                color="error"
                v-bind="attrs"
                v-on="on"
                >Delete Post</v-btn
              >
            </template>
          </v-dialog>
          <v-divider v-if="userId == post.userId || isAdmin"></v-divider>
          <v-card-actions>
            <v-list-item text>
              <CommentDisplay :postId="post.id" />
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
import PostLikeDisplay from "./PostLikeDisplay";

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
      return this.$store.getters.isAdmin;
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
    PostLikeDisplay,
  },
};
</script>
<style lang="scss">
.post-img {
  height: auto;
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
