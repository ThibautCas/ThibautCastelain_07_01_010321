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
    update_error(state) {
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

      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios.post("http://localhost:3000/api/signup", {
          headers: {
            "content-type": "multipart/form-data"
          }, data: user,
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
      let emailToUpgrade = payload.email;
      return new Promise((resolve, reject) => {
        let token = localStorage.token;
        axios({
          url: `http://localhost:3000/api/auth/user/byEmail/`,
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
          data: {email: payload.email},
        })
        .then((resp) => {
          alert(`${emailToUpgrade} has been upgraded to Admin`);
          return resolve(resp);
        })
        .catch((err) => {
          alert(`User has not been found, impossible to upgrade`);
          commit("update_error");
          return reject(err);
        });
      })
    },
    updateUser({ commit }, user) {
      let userId = localStorage.userId;
      return new Promise((resolve, reject) => {
        let token = localStorage.token;
        axios.put(`http://localhost:3000/api/auth/user/update/${userId}`, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          }, data: user, userId
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
