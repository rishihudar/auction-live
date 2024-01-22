import router from "../../router";
import { defineStore } from "pinia";
import MQL from "@/plugins/mql.js";
export const login = defineStore("login", {
  persist: {
    storage: sessionStorage,
    // paths:['token','status']
  },
  state: () => ({
    token: sessionStorage.getItem("user-token") || "",
    status: "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    MUTATE_AUTH_REQUEST() {
      this.status = "loading";
    },
    MUTATE_AUTH_SUCCESS(token) {
      this.status = "sucess";
      this.token = token;
    },
    MUTATE_AUTH_ERROR() {
      this.status = "error";
    },
    AUTH_REQUEST(payload) {
      return new Promise((resolve) => {
        this.MUTATE_AUTH_REQUEST();
        sessionStorage.setItem("user-token", "token");
        // axios.defaults.headers.common['Authorization'] = 'token'
        new MQL()
          .setLoginActivity()
          .setData(payload)
          // .showConfirmDialog(true)
          .fetch("loginBtn")
          .then((response) => {
            let res = response.getActivity("ldapLogin", false);
            // response.hideElement('loginFormId')
            if (response.isValid("ldapLogin")) {
              let token = response.getHeaders().authorization;
              sessionStorage.setItem("user-token", token);
              this.MUTATE_AUTH_SUCCESS(token);
              resolve(res.result);
            } else {
              this.MUTATE_AUTH_ERROR();
              sessionStorage.removeItem("user-token");
              response.showErrorToast("ldapLogin");
            }
          });
      });
    },

    AUTH_LOGOUT() {
      return new Promise((resolve) => {
        sessionStorage.removeItem("user-token");
        // remove the axios default header
        // delete axios.defaults.headers.common['Authorization']
        router.push({
          name: "login",
        });
        resolve();
      });
    },
  },
});
