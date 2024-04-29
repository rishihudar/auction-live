import { createToaster  } from "@meforma/vue-toaster";
import { createRouter, createWebHashHistory } from "vue-router";
import { login } from "./store/modules/login";
const toaster = createToaster({ position: "top-right", duration: 3000 });

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
function loadWorkflowView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/WorkflowManagement/${view}.vue`);
}
function loadAuctionView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/admin/AuctionPreparation/${view}.vue`);
}
function loadAuctionPublishView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/admin/AuctionPublishing/${view}.vue`);
}
function loadAuctionSchedulingView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/admin/AuctionScheduling/${view}.vue`);
}
function loadAdminView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/admin/${view}.vue`);
}
function loadDashboardView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/Dashboard/${view}.vue`);
}
function loadMastersView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/masters/${view}.vue`);
}
function loadManagementView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/management/${view}.vue`);
}
function loadUI(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/ui/${view}.vue`)
}
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/inventoryMaster",
      name: "inventoryMaster",
      component: loadView("InventoryMaster"),
      meta: { title: "inventoryMaster", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/inventoryMasterCard",
      name: "inventoryMasterCard",
      component: loadDashboardView("InventoryMasterCard"),
      meta: { title: "inventoryMasterCard", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/home",
      name: "home",
      component: loadView("Home"),
      meta: { title: "Home", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    // {
    //   path: "/UserDashboard",
    //   name: "ROLE_CHECKER",
    //   component: loadDashboardView("UserDashboard"),
    //   meta: { title: "UserDashboard", lang: "en", icon: "mdi mdi-home-outline" , requiresAuth: true,roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_SCHEDULER']},
    // },
    {
      path: "/add-menu",
      name: "AddMenuUI",
      component: loadAdminView("AddMenuUI"),
      meta: { title: "AddMenuUI",lang: "en", icon: "mdi mdi-home-outline",requiresAuth: true, roles: ['ROLE_SUPERADMIN']},
    },
    {
      path: "/auction-publishing",
      name: "ROLE_ADMIN",
      component: loadDashboardView("AdminComponent"),
      meta: { title: "AdminComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/auction-approval",
      name: "ROLE_ADMIN",
      component: loadDashboardView("AdminComponent"),
      meta: { title: "AdminComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    // {
    //   path: "/AuctionMakerDashboard",
    //   name: "ROLE_MAKER",
    //   component: loadDashboardView("AuctionMakerComponent"),
    //   meta: { title: "AuctionMakerComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    // },
    // {
    //   path: "/UserDashboard",
    //   name:"ROLE_MAKER",
    //   component: loadDashboardView("UserDashboard"),
    //   meta: { title: "UserDashboard",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER']},
    // },
  
    {
      path: "/BidderDashboard",
      name: "ROLE_BIDDER",
      component: loadDashboardView("BidderComponent"),
      meta: { title: "BidderComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/SuperAdminDashboard",
      name: "ROLE_SUPERADMIN",
      component: loadDashboardView("SuperAdminComponent"),
      meta: { title: "SuperAdminComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_SUPERADMIN']},
    },
    // {
    //   path: "/UserDashboard",
    //   name: "UserDashboard",
    //   component: loadDashboardView("UserDashboard"),
    //   meta: { title: "UserDashboard", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    // },
    {
      path: "/UpcomingAuction",
      name:"UpcomingAuction",
      component: loadDashboardView("UpcomingAuction"),
      meta: { title: "UpcomingAuction",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_PUBLISHER','ROLE_SCHEDULER','ROLE_SUPERADMIN']},
    },
    {
      path: "/OrganizationAdminDashboard",
      name: "ROLE_ORGANIZATION_ADMIN",
      component: loadDashboardView("OrganizationAdminComponent"),
      meta: { title: "OrganizationAdminComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    // {
    //   path: "/UserDashboard",
    //   name: "ROLE_APPROVER",
    //   component: loadDashboardView("UserDashboard"),
    //   meta: { title: "UserDashboard", lang: "en", icon: "mdi mdi-home-outline", requiresAuth: true , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    // },
    {
      path: "/task-details",
      name: "MyTask",
      component: loadAdminView("MyTask"),
      meta: { title: "MyTask",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/PublisherDashboard",
      name: "PublisherDashboard",
      component: loadDashboardView("PublisherComponent"),
      meta: { title: "PublisherComponent", lang: "en", icon: "mdi mdi-home-outline",requiresAuth: true  , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_PUBLISHER']},
    },
    {
      path: "/UserDashboard",
      name: "UserDashboard",
      component: loadDashboardView("UserDashboard"),
      meta: { title: "UserDashboard", lang: "en", icon: "mdi mdi-home-outline" ,requiresAuth: true, roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_SCHEDULER','ROLE_SUPERADMIN']},
    },
    {
      path: "/add-Dashboard",
      name: "ROLE_SUPERADMIN",
      component: loadDashboardView("AddDashboardUI"),
      meta: { title: "AddUserDashboard", lang: "en", icon: "mdi mdi-home-outline" ,requiresAuth: true, roles: ['ROLE_SUPERADMIN']},
    },
    {
      path: "/SchedulerDashboard",
      name: "ROLE_SCHEDULER_",
      component: loadAuctionSchedulingView("SchedulerComponent"),
      meta: { title: "SchedulerComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_SCHEDULER']},
    },
    {
      path: "/auction-concluded",
      name:"Auction Concluded",
      component: loadAdminView("ConcludedAuctionAdmin"),
      meta: { title: "ConcludedAuctionAdmin",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_SUPERADMIN','ROLE_APPROVER']},
    },
    {
      path: "/h1BiddersApproval",
      name:"H1 Bidder Approval",
      component: loadAdminView("H1BidderApprovalRejection"),
      meta: { title: "H1BidderApprovalRejection",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_APPROVER']},
    },
    {
      path: "/WatcherDashboard",
      name: "ROLE_WATCHER",
      component: loadDashboardView("WatcherComponent"),
      meta: { title: "WatcherComponent", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/role-select",
      name: "RoleSelection",
      component: loadView("LandingPage"),
      meta: { title: "Role Selection", lang: "en", icon: "mdi mdi-home-outline", isSideBarVisible: true, requiresAuth: false  },
      beforeEnter: (to,from) => {
        const loginStore = login()
      console.log(to.meta.roles,loginStore.roles);
      if (loginStore.roles.findIndex((r) => r.roleCode == 'ROLE_BIDDER') > -1) {
        toaster.error('Access Denied')
        return false
      }
      }
    },
    {
      path: "/TestVue",
      name: "TestVue",
      component: loadMastersView("TestVue"),
      meta: { title: "TestVue", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/master",
      name: "master",
      component: loadMastersView("master"),
      meta: { title: "master", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/CountryMaster",
      name: "CountryMaster",
      component: loadMastersView("CountryMaster"),
      meta: { title: "CountryMaster", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/StateMaster",
      name: "StateMaster",
      component: loadMastersView("StateMaster"),
      meta: { title: "StateMaster", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/DistrictMaster",
      name: "DistrictMaster",
      component: loadMastersView("DistrictMaster"),
      meta: { title: "DistrictMaster", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/TalukaMaster",
      name: "TalukaMaster",
      component: loadMastersView("TalukaMaster"),
      meta: { title: "TalukaMaster", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/ExcelViewer",
      name: "ExcelViewer",
      component: loadMastersView("ExcelViewer"),
      meta: { title: "ExcelViewer", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/UserManagement",
      name: "UserManagement",
      component: loadManagementView("UserManagement"),
      meta: { title: "UserManagement", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/RoleManagement",
      name: "RoleManagement",
      component: loadManagementView("RoleManagement"),
      meta: { title: "RoleManagement", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/about",
      name: "about",
      component: loadView("About"),
      meta: { title: "About", lang: "en", icon: "mdi mdi-information-variant" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/",
      name: "login",
      component: loadView("Login"),
      meta: { title: "Login", lang: "mr", icon: "mdi mdi-account", isSideBarVisible: false , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: loadView("forgotPassword"),
      meta: { title: "forgotPassword", lang: "mr", icon: "mdi mdi-account", isSideBarVisible: false , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/registration",
      name: "registration",
      component: loadView("Registration"),
      meta: { title: "Registration", lang: "mr", icon: "mdi mdi-account-edit" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/view-auction/:workflowStepDetailsId",
      name: "ViewAuction",
      component: loadWorkflowView("ViewAuction"),
      meta: { title: "ViewAuction", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },

    {
      path: "/mqlRequestDemo",
      name: "mqlRequestDemo",
      component: loadView("MQLRequestDemo"),
      meta: {
        title: "MQLRequestDemo",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        lang: "en",
        icon: "mdi mdi-presentation-play",
      },
    },
    {
      path: "/i18Demo",
      name: "i18Demo",
      component: loadView("I18Demo"),
      meta: {
        title: "Language Demo",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        lang: "en",
        icon: "mdi mdi-eject-outline",
      },
    },
    {
      path: "/validator",
      name: "validator",
      component: loadView("Validator"),
      meta: { title: "Validator", lang: "en", icon: "mdi mdi-check-all" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/encryption",
      name: "encryption",
      component: loadView("Encryption"),
      meta: { title: "Encrypt", lang: "en", icon: "mdi mdi-laptop" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/cdnUpload",
      name: "cdnUpload",
      component: loadView("CdnUpload"),
      meta: { title: "Cdn Upload", lang: "en", icon: "mdi mdi-upload" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/tableDemo",
      name: "tableDemo",
      component: loadView("TableDemo"),
      meta: {
        title: "Table Demo",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        lang: "en",
        icon: "mdi mdi-file-table-outline",
      },
    },
    {
      path: "/vueMetaExample/:title",
      name: "vueMetaExample",
      component: loadView("vueMetaExample",),
      meta: {
        title: "vueMetaExample",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        lang: "en",
        icon: "mdi mdi-arrow-expand",
      },
    },
    {
      path: "/clipboard",
      name: "clipboard",
      component: loadView("vueClipboard"),
      meta: { title: "vueClipboard", lang: "en", icon: "mdi mdi-arrow-expand" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/MqlAssetFDBDemo",
      name: "MqlAssetFDBDemo",
      component: loadView("MqlAssetFDBDemo"),
      meta: {
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Mql Request For Asset FDB Demo",
        lang: "en",
        icon: "mdi mdi-database-plus",
      },
    },
    {
      path: "/sessionmgr",
      name: "sessionmgr",
      component: loadView("SessionManager"),
      meta: {
        title: "Session Manager Demo",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'] ,
        lang: "en",
        icon: "mdi mdi-compass",
      },
    },
    {
      path: "/uploadmanager",
      name: "uploadmanager",
      component: loadView("UploadManager"),
      meta: {
        title: "Upload Manager Demo",
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        lang: "en",
        icon: "mdi mdi-upload",
      },
    },
    {
      path: "/downloadmanager",
      name: "downloadmanager",
      component: loadView("DownloadManager"),
      meta: {
        roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Download Manager Demo",
        lang: "en",
        icon: "mdi mdi-download",
      },
    },
    {
      path: "/serversidepagination",
      name: "serversidepagination",
      component: loadView("ServerSidePagination"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Server Side Pagination Demo",
        lang: "en",
        icon: "mdi mdi-google-pages",
      },
    },
    {
      path: "/keymapper",
      name: "keymapper",
      component: loadView("KeyMapper"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Key Mapper Demo",
        lang: "en",
        icon: "mdi mdi-sort",
      },
    },
    {
      path: "/excel",
      name: "excel",
      component: loadView("Excel"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Excel Demo",
        lang: "en",
        icon: "mdi mdi-file-excel",
      },
    },
    {
      path: "/lastinsertedId",
      name: "lastinsertedId",
      component: loadView("LastInsertedId"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Last Inserted Id Demo",
        lang: "en",
        icon: "mdi  mdi-border-color",
      },
    },
    {
      path: "/forloop",
      name: "forloop",
      component: loadView("ForLoop"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "For Loop Demo",
        lang: "en",
        icon: "mdi  mdi-refresh",
      },
    },
    {
      path: "/sendSms",
      name: "sendSms",
      component: loadView("sms"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "SMS Demo",
        lang: "en",
        icon: "mdi  mdi-comment-text-outline",
      },
    },
    {
      path: "/sendEmail",
      name: "sendEmail",
      component: loadView("email"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Email Demo",
        lang: "en",
        icon: "mdi  mdi-email",
      },
    },
    {
      path: "/sendOtp",
      name: "sendOtp",
      component: loadView("otp"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "OTP Demo",
        lang: "en",
        icon: "mdi  mdi-numeric-0-box",
      },
    },
    {
      path: "/autoBL",
      name: "autoBL",
      component: loadView("autoBL"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "AutoBL Demo",
        lang: "en",
        icon: "mdi  mdi-code-array",
      },
    },
    {
      path: "/updateUserDataUsingBL",
      name: "updateUserDataUsingBL",
      component: loadView("updateUserDataUsingBL"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Update User Data Using BL Demo",
        lang: "en",
        icon: "mdi  mdi-crop-free",
      },
    },
    {
      path: "/insertCustomMongoId",
      name: "insertCustomMongoId",
      component: loadView("insertCustomMongoId"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Insert Custom Mongo Id",
        lang: "en",
        icon: "mdi  mdi-code-braces",
      },
    },
    {
      path: "/classroom",
      name: "classroom",
      component: loadView("Classroom"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Insert Custom Mongo Id",
        lang: "en",
        icon: "mdi  mdi-library-books",
      },
    },
    {
      path: "/tailwindForm",
      name: "tailwindForm",
      component: loadView("tailwindForm"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "Insert Custom Mongo Id",
        lang: "en",
        icon: "mdi  mdi-library-books",
      },
    },
    {
      path: "/formkitcomposition",
      name: "FormKitComposition",
      component: loadView("FormKitCustomComposition"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "FormKitComposition",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/formkitoption",
      name: "FormKitOption",
      component: loadView("FormKitCustomOption"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "FormKitOption",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendStaticMessages",
      name: "SendStaticMessages",
      component: loadView("sendStaticMessages"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "sendStaticMessages",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendDynamicMessages",
      name: "SendDynamicMessages",
      component: loadView("sendDynamicMessages"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "sendDynamicMessages",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendStaticEmails",
      component: loadView("sendStaticEmails"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "sendStaticEmails",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendDynamicEmails",
      component: loadView("sendDynamicEmails"),
      meta: {
         roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'],
        title: "sendDynamicEmails",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/generateOTP",
      component: loadView("generateOTP"),
      meta: { title: "generateOTP", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/validateOTP",
      component: loadView("validateOTP"),
      meta: { title: "validateOTP", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    // UI
    {
        path: "/ui/datatable",
        name: "Datatable",
        component: loadUI("datatable"),
        meta: { title: "Datatable", lang: "mr", icon: "mdi mdi-account-edit" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/StateMaster",
      component: loadMastersView("StateMaster"),
      meta: { title: "stateMaster", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/TalukaMaster",
      component: loadMastersView("TalukaMaster"),
      meta: { title: "talukaMaster", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/EntityRegistration",
      component: loadView("EntityRegistration"),
      meta: { title: "EntityRegistration", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/auction-preparation",
      name:"AuctionPreparation",
      component: loadAdminView("AuctionPreparation"),
      meta: { title: "AuctionPreparation",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER']},
    },
    {
        path: "/auction-list",
        name:"AuctionList",
        component: loadAdminView("AuctionList"),
        meta: { title: "AuctionList",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER']},
      meta: { title: "AuctionPreparation",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER'], requiresAuth: true},
    },
    {
      path: "/test",
      component: loadAdminView("test"),
      meta: { title: "test",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/Step1",
      name:"Step",
      component: loadAuctionView("Step1"),
      meta: { title: "Step1",lang: "en", icon: "mdi mdi-home-outline", requiresAuth: true, roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/Step2",
      name: "Step2",
      component: loadAuctionView("Step2"),
      meta: { title: "Step2",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/Step3",
      name: "Step3",
      component: loadAuctionView("Step3"),
      meta: { title: "Step3",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/Step4",
      name: "Step4",
      component: loadAuctionView("Step4"),
      meta: { title: "Step4",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/auction-publishing-details",
      name: "ROLE_PUBLISHER",
      component: loadAuctionPublishView("AuctionPublishingDetails"),
      meta: { title: "AuctionPublishingDetails",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER', 'ROLE_PUBLISHER']},
    },
    
    // UI
    {
      path: "/AuctionPreview",
      name: "AuctionPreview",
      component: loadView("AuctionPreview"),
      meta: { title: "AuctionPreview", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/History",
      name: "History",
      component: loadView("History"),
      meta: { title: "History", lang: "en", icon: "mdi mdi-home-outline" , roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER']},
    },
    {
      path: "/AuctionDetailsForAdmin",
      name: "AuctionDetailsForAdmin",
      component: loadAdminView("AuctionDetailsForAdmin"),
      meta: { title: "AuctionDetailsForAdmin", lang: "en", icon: "mdi mdi-home-outline" },
    },
    

    {
      path: "/auction-list",
      name:"AuctionList",
      component: loadAdminView("AuctionList"),
      meta: { title: "AuctionList",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_SCHEDULER']},
    },
    {
      path: "/admin/AdminAuctionBidding",
      component: loadAdminView("AdminAuctionBidding"),
      meta: { title: "Bidding",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_SCHEDULER'], isSideBarVisible: false },
    },
    {
      path: "/current-auction",
      component: loadAdminView("CurrentAuction"),
      meta: { title: "Current Auction",lang: "en", icon: "mdi mdi-home-outline", roles: ['ROLE_MAKER','ROLE_CHECKER','ROLE_APPROVER','ROLE_SCHEDULER']},
    },

  ],
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!(!!sessionStorage.getItem('user-token'))) {
      toaster.error('Please Login')
        next({ path: '/' })
    } else {
      const loginStore = login()
      console.log(to.meta.roles,loginStore.role?.roleCode);
      let allowed = to.meta.roles?.findIndex((r) => r == loginStore.role?.roleCode) > -1
      if (!allowed) {
        toaster.error('Access Denied')
      next({path: from.path})
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
