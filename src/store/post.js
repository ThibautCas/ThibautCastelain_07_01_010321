import axios from "axios";

export const post = {
  actions: {
    addpost(data) {
      axios({
        url: "http://localhost:3000/api/auth/post",
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${this.$state.user.token}`,
        },
      })
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePost(payload) {
      let token = localStorage.token;
        axios({
            url: "http://localhost:3000/api/auth/post/",
            method: "DELETE",
            params: {id: payload.id},
            headers: { Authorization: "Bearer " + token },
          })
    },
  },
};
