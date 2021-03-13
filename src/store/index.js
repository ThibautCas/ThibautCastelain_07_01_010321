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
    fonction: localStorage.getItem("fonction") || ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, firstName, lastName, fonction) {
      state.status = "success";
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.fonction = fonction;
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
            localStorage.setItem("token", token);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("fonction", fonction);
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
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("fonction");
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
