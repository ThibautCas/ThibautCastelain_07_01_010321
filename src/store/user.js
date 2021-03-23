import axios from "axios";

export const user = {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    fonction: localStorage.getItem("fonction") || "",
    userId: localStorage.getItem("userId") || "",
    isAdmin: localStorage.getItem("isAdmin") || "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token || state.token;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.fonction = payload.fonction;
      state.userId = payload.id || state.userId;
      state.isAdmin = payload.isAdmin || state.isAdmin;
    },
    update_success(state, payload) {
      state.status = "success";
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.fonction = payload.fonction;
      state.userId = payload.id || state.userId;
      state.isAdmin = payload.isAdmin || state.isAdmin;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.firstName = "";
      state.lastName = "";
      state.fonction = "";
      state.userId = "";
      state.isAdmin = "";
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const payload = resp.data;
            localStorage.setItem("token", payload.token);
            localStorage.setItem("firstName", payload.firstName);
            localStorage.setItem("lastName", payload.lastName);
            localStorage.setItem("fonction", payload.fonction);
            localStorage.setItem("userId", payload.id);
            localStorage.setItem("isAdmin", payload.isAdmin);
            axios.defaults.headers.common["Authorization"] = payload.token;
            commit("auth_success", payload);
            return resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            return reject(err);
          });
      });
    },
    register({ commit }, user) {
      let form = new FormData();
      form.append("file", user.image);
      form.append("firstName", user.firstName);
      form.append("lastName", user.lastName);
      form.append("email", user.email);
      form.append("fonction", user.fonction);
      form.append("password", user.password);

      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios.post("http://localhost:3000/api/signup", form, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
          .then((resp) => {
            const payload = resp.data;
            localStorage.setItem("token", payload.token);
            localStorage.setItem("firstName", payload.firstName);
            localStorage.setItem("lastName", payload.lastName);
            localStorage.setItem("fonction", payload.fonction);
            localStorage.setItem("userId", payload.userId);
            localStorage.setItem("image", payload.image);
            localStorage.setItem("isAdmin", payload.isAdmin);
            axios.defaults.headers.common["Authorization"] = payload.token;
            commit("auth_success", payload);
            return resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            return reject(err);
          });
      });
    },
    upgradeToAdmin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let token = localStorage.token;
        axios({
          url: `http://localhost:3000/api/auth/user/byEmail/`,
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
          params: {email: payload.email},
        })
        .then((resp) => {
          const firstName = resp.data.firstName;
          const lastName = resp.data.lastName;
          alert(`${firstName} ${lastName} has been upgraded to Admin`);
          commit("update_success", payload);
          return resolve(resp);
        })
        .catch((err) => {
          alert(`User has not been found, impossible to upgrade`)
          return reject(err);
        });
      })
    },
    updateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        let userId = localStorage.userId;
        let token = localStorage.token;

        axios({
          url: `http://localhost:3000/api/auth/user/update/${userId}`,
          data: user,
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        })
          .then((resp) => {
            const payload = resp.data;
            localStorage.setItem("firstName", payload.firstName);
            localStorage.setItem("lastName", payload.lastName);
            localStorage.setItem("fonction", payload.fonction);
            localStorage.setItem("userId", payload.userId);
            commit("update_success", payload);
            return resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            return reject(err);
          });
      });
    },
    deleteUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.userId;
        let token = localStorage.token;

        axios({
          url: `http://localhost:3000/api/auth/user/delete/${userId}`,
          data: user,
          headers: { Authorization: "Bearer " + token },
          method: "DELETE",
        })
          .then((resp) => {
            commit("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("fonction");
            localStorage.removeItem("userId");
            localStorage.removeItem("isAdmin");
            delete axios.defaults.headers.common["Authorization"];
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("fonction");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => !!state.isAdmin,
    authStatus: (state) => state.status,
  },
};
