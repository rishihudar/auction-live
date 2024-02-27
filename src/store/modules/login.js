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
    loginDetails : {},
    roles :[],
    currentRole: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    roleNames: (state) => state.roles

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
    SET_LOGIN_USER_DETAILS(newData){
      this.loginDetails = newData
    },
    SET_ROLES(data){
      this.roles = data
    },
    SET_ROLE(data){
      this.currentRole = data
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
    userLogin (user) {
      return new Promise((resolve, reject) => {
        // console.log('login.js',user)
        new MQL()
        .useLoginServer()
          .setActivity('o.[UserLogin]')
          .setData(user)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity('UserLogin', true)
            if (rs.isValid('UserLogin')) {
              console.log("res.result",res.result)
              // const bidderUserId=res.result.pklLoginId
              // console.log("bidderUserId",bidderUserId)
              // console.log('user', res.result.userEnable === 1)
              // if (res.result.userEnable === 1) {
              // console.log('Bidder approved')
                  let token = rs.getHeaders().authorization
              // console.log('token',token)
                  sessionStorage.setItem('user-token', token)
                  let roles = JSON.parse(atob(token.split('.')[1])).groups
              console.log('role',roles)
                 let loginUserDetails = JSON.parse(atob(token.split('.')[1]))
                   .metadata
              // console.log('metaDATA', JSON.parse(atob(token.split('.')[1]))
              // .metadata )
                 loginUserDetails = JSON.parse(loginUserDetails)
                  this.SET_LOGIN_USER_DETAILS(loginUserDetails)
                  this.SET_ROLES(roles)
             // }
              resolve(res)
            } else {
               rs.showErrorToast('UserLogin')
               reject(res)
            }
          })
      })
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
