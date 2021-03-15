import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    fonction: localStorage.getItem("fonction") || "",
    userId: localStorage.getItem("userId") || ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, firstName, lastName, fonction, userId) {
      state.status = "success";
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.fonction = fonction;
      state.userId = userId
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
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
            const token = resp.data.token;
            const firstName = resp.data.firstName;
            const lastName = resp.data.lastName;
            const fonction = resp.data.fonction;
            const userId = resp.data.id;
            localStorage.setItem("token", token);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("fonction", fonction);
            localStorage.setItem("userId", userId);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, firstName, lastName, fonction);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
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
            const token = resp.data.token;
            const firstName = resp.data.firstName;
            const lastName = resp.data.lastName;
            const fonction = resp.data.fonction;
            localStorage.setItem("token", token);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("fonction", fonction);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, firstName, lastName, fonction);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    update({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_success");
        const userId = this.$store.data.userId;
        axios({
          url: `http://localhost:3000/auth/user/${userId}/update`,
          data: user,
          method: "PUT",
        })
          .then((resp) => {
            const firstName = resp.data.firstName;
            const lastName = resp.data.lastName;
            const fonction = resp.data.fonction;
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("fonction", fonction);
            commit("auth_success", firstName, lastName, fonction);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    deleteUser({ commit }, user) {
      return new Promise ((resolve, reject) => {
        commit("logout");
        const userId = this.$store.data.userId;
        axios({
          url: `http://localhost:3000/auth/user/${userId}/delete`,
          data: user,
          method: "PUT",
        })
        .then((resp) => {
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
      })
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
});
