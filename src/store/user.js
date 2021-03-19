import axios from "axios";

export const user = {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    fonction: localStorage.getItem("fonction") || "",
    userId: localStorage.getItem("userId") || "",
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
    },
    update_success(state, payload) {
      state.status = "success";
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.fonction = payload.fonction;
      state.userId = payload.id || state.userId;
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
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/signup",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const payload = resp.data;
            localStorage.setItem("token", payload.token);
            localStorage.setItem("firstName", payload.firstName);
            localStorage.setItem("lastName", payload.lastName);
            localStorage.setItem("fonction", payload.fonction);
            localStorage.setItem("userId", payload.userId);
            localStorage.setItem("image", payload.image);
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
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
