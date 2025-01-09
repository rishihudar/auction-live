import router from "../../router";
import { defineStore } from "pinia";
import MQL from "@/plugins/mql.js";
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
import { getActivePinia } from "pinia"

export const login = defineStore("login", {
  persist: {
    storage: sessionStorage,
    // paths:['token','status']
  },
  state: () => ({
    token: sessionStorage.getItem("user-token") || "",
    status: "",
    loginDetails: {},
    menus: [],
    roles: [],
    currentRole: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    roleNames: (state) => state.roles,
    username: (state) => state.loginDetails.fullName,
    fullname: (state) => state.loginDetails.username,
    role: (state) => state.currentRole,
    menu: (state) => state.menus,
    loginId: (state) => state.loginDetails.loginId,
    entityId: (state) => state.loginDetails.entityId,
    organizationId: (state) => state.loginDetails.organizationId,
   // userName:(state)=>state.loginDetails.userName,
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
    SET_LOGIN_USER_DETAILS(newData) {
      this.loginDetails = newData;
    },
    SET_ROLES(data) {
      this.roles = data;
    },
    SET_ROLE(data) {
      this.currentRole = data;
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
    checkSessionExists(payload) {
      return new Promise((resolve, reject) => {
        // API call to check if a session exists for the user
        new MQL()
          .useLoginServer()
          .setActivity("o.[SessionExist]")
          .setData({ userId:payload.userId })
          .fetch()
          .then(rs => {
            let res = rs.getActivity("SessionExist", true);
            if (rs.isValid("SessionExist")) {
              let response = res.result;
              console.log("Session exists: ", response);
            //  resolve(response); // Resolve the promise with the response
              // If session exists is null, resolve to allow login
          if (!response || !response.sessionId) {
            resolve(false);  // No session exists, allow login
          } else {
            resolve(true);  // Session exists, deny login
          }
            } else {
              rs.showErrorToast("SessionExist");
              reject("Error checking session existence");
            }
          })
          .catch((error) => {
            reject(error); // Reject the promise on error
          });
      });
    },
    userLogin(user) {
      return new Promise((resolve, reject) => {
        // Check if a session already exists for the user 
        this.checkSessionExists({ userId: user.userName }).then((sessionExists) => {
        // //console.log('login.js',user)
        new MQL()
          .useLoginServer()
          .setActivity("o.[UserLogin]")
          .setData(user)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("UserLogin", true);
            if (rs.isValid("UserLogin")) {
              if(res.result==null){
                toaster.error("Invalid Username or Password");
              }
              //console.log("res.result", res.result);
              //console.log(res.result.roles);
              if( res.result.roles==null || res.result.roles.length==0 ){
                toaster.error("Access Denied: No roles assigned to your account.");
                return;
              }
              if (res.result.roles.findIndex((r) => r.roleCode == 'ROLE_BIDDER') > -1) {
               //console.log(res.result.roles);
                reject({
                  'error': "BIDDER_LOGIN"
                })
              }
              if (sessionExists) {
                // toaster.error("You already have an active session. Please log out first.");
                 resolve(sessionExists);
                 return; // Stop further execution if session exists
               }
               else{
                let token = rs.getHeaders().authorization;
                //console.log("token", token);
                sessionStorage.setItem("user-token", token);
                this.token = token;
                let loginUserDetails = JSON.parse(JSON.parse(atob(token.split(".")[1])).metadata);
                //console.log("metaDATA", JSON.parse(JSON.parse(atob(token.split(".")[1])).metadata));
                //console.log(loginUserDetails);
                this.menus = res.result.rolesMenuData;
                this.roles = res.result.roles;
                this.SET_LOGIN_USER_DETAILS(loginUserDetails);
                this.storeSessionInDatabase({
                  userId: loginUserDetails.username,
                  sessionId: token,
                });
                resolve(res);
              }
               }
           else {
              // rs.showErrorToast("UserLogin");
              try {
                let lockStatus = JSON.parse(res.error).messageIds[0];
                toaster.error("Account is locked");
              }
              catch(err) {
                rs.showErrorToast("UserLogin")
                this.invalidAttempts(user)
              }
              reject(res);
            }
          });
        });
      });
    },
          

    invalidAttempts(user) {

      return new Promise((resolve,reject) => {

			new MQL()
      .useLoginServer()
			.setActivity("o.[UpdateInvalidAttemptCount]")
			.setData(user)
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateInvalidAttemptCount",true)
			if (rs.isValid("UpdateInvalidAttemptCount")) {
        resolve(res);
			} else
			 { 
			rs.showErrorToast("UpdateInvalidAttemptCount")
			}
			})
			

      }

      )

    },
    updateLogoutDate(user) {

      return new Promise((resolve,reject) => {

			new MQL()
      .useLoginServer()
			.setActivity("o.[UpdateLoginLogsLogoutDate]")
			.setData({"userId":user})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateLoginLogsLogoutDate",true)
			if (rs.isValid("UpdateLoginLogsLogoutDate")) {
        resolve(res);
			} else
			 { 
			rs.showErrorToast("UpdateLoginLogsLogoutDate")
			}
			})
			

      }

      )

    },

    LOGOUT_LOG() {
      // Automatically generated
      new MQL()
        .useLoginServer()
        .setActivity("o.[LogoutLog]")
        .setData({ userId: this.loginId })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("LogoutLog", true);
          if (rs.isValid("LogoutLog")) {
          } else {
            rs.showErrorToast("LogoutLog");
          }
        });
    },

    storeSessionInDatabase(sessionData) {
      console.log("Storing session in database", sessionData);
      return new Promise((resolve, reject) => {
        new MQL()
          .useLoginServer()
          .setActivity("o.[StoreSessionId]") // Replace with your actual API activity name
          .setData(sessionData)
          .fetch()
          .then((rs) => {
            let res = rs.getActivity("StoreSessionId", true);
            if (rs.isValid("StoreSessionId")) {
             // toaster.success("Session stored successfully");
              resolve(res);
             // console.log("Session stored successfully");
              //console.log("Session stored successfully", res);
            } else {
              rs.showErrorToast("StoreSessionId");
              reject(res);
            }
          })
          .catch((error) => {
            toaster.error("Failed to store session");
            reject(error);
          });
      });
    },

    AUTH_LOGOUT() {
      return new Promise((resolve) => {
        sessionStorage.removeItem("user-token");
        this.LOGOUT_LOG();
         // map through that list and use the **$reset** fn to reset the state
         getActivePinia()._s.forEach(store => store.$reset());
        // remove the axios default header
        // TODO: Add logout log activity
        delete axios.defaults.headers.common["Authorization"];
        this.$reset();
        router.push({ name: "login" });
        resolve();
      });
    },
  },
});
