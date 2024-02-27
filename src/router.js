import { createRouter, createWebHashHistory } from "vue-router";

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
function loadAuctionView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/admin/AuctionPreparation/${view}.vue`);
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
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/inventoryMaster",
      name: "inventoryMaster",
      component: loadView("InventoryMaster"),
      meta: { title: "inventoryMaster", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/",
      name: "home",
      component: loadView("Home"),
      meta: { title: "Home", lang: "en", icon: "mdi mdi-home-outline" },
    },
    // {
    //   path: "/admin/auction-preparation",
    //   name: "ROLE_MAKER",
    //   component: loadAdminView("AuctionPreparation"),
    //   meta: { title: "Auction Preparation",lang: "en", icon: "mdi mdi-home-outline"},
    // },
    {
      path: "/AuctionCheckerDashboard",
      name: "ROLE_CHECKER",
      component: loadDashboardView("AuctionCheckerComponent"),
      meta: { title: "AuctionCheckerComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/AdminDashboard",
      name: "ROLE_ADMIN",
      component: loadDashboardView("AdminComponent"),
      meta: { title: "AdminComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    // {
    //   path: "/AuctionMakerDashboard",
    //   name: "ROLE_MAKER",
    //   component: loadDashboardView("AuctionMakerComponent"),
    //   meta: { title: "AuctionMakerComponent", lang: "en", icon: "mdi mdi-home-outline" },
    // },
    {
      path: "/BidderDashboard",
      name: "ROLE_BIDDER",
      component: loadDashboardView("BidderComponent"),
      meta: { title: "BidderComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/SuperAdminDashboard",
      name: "ROLE_SUPERADMIN",
      component: loadDashboardView("SuperAdminComponent"),
      meta: { title: "SuperAdminComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/OrganizationAdminDashboard",
      name: "ROLE_ORGANIZATION_ADMIN",
      component: loadDashboardView("OrganizationAdminComponent"),
      meta: { title: "OrganizationAdminComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/ApproverDashboard",
      name: "ROLE_APPROVER",
      component: loadDashboardView("ApproverComponent"),
      meta: { title: "ApproverComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/PublisherDashboard",
      name: "ROLE_PUBLISHER",
      component: loadDashboardView("PublisherComponent"),
      meta: { title: "PublisherComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/SchedulerDashboard",
      name: "ROLE_SCHEDULER",
      component: loadDashboardView("SchedulerComponent"),
      meta: { title: "SchedulerComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/WatcherDashboard",
      name: "ROLE_WATCHER",
      component: loadDashboardView("WatcherComponent"),
      meta: { title: "WatcherComponent", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/LandingPage",
      name: "LandingPage",
      component: loadView("LandingPage"),
      meta: { title: "LandingPage", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/TestVue",
      name: "TestVue",
      component: loadMastersView("TestVue"),
      meta: { title: "TestVue", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/master",
      name: "master",
      component: loadMastersView("master"),
      meta: { title: "master", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/CountryMaster",
      name: "CountryMaster",
      component: loadMastersView("CountryMaster"),
      meta: { title: "CountryMaster", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/StateMaster",
      name: "StateMaster",
      component: loadMastersView("StateMaster"),
      meta: { title: "StateMaster", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/DistrictMaster",
      name: "DistrictMaster",
      component: loadMastersView("DistrictMaster"),
      meta: { title: "DistrictMaster", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/TalukaMaster",
      name: "TalukaMaster",
      component: loadMastersView("TalukaMaster"),
      meta: { title: "TalukaMaster", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/ExcelViewer",
      name: "ExcelViewer",
      component: loadMastersView("ExcelViewer"),
      meta: { title: "ExcelViewer", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/UserManagement",
      name: "UserManagement",
      component: loadManagementView("UserManagement"),
      meta: { title: "UserManagement", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/RoleManagement",
      name: "RoleManagement",
      component: loadManagementView("RoleManagement"),
      meta: { title: "RoleManagement", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/about",
      name: "about",
      component: loadView("About"),
      meta: { title: "About", lang: "en", icon: "mdi mdi-information-variant" },
    },
    {
      path: "/",
      name: "login",
      component: loadView("Login"),
      meta: { title: "Login", lang: "mr", icon: "mdi mdi-account" },
    },
    {
      path: "/registration",
      name: "registration",
      component: loadView("Registration"),
      meta: { title: "Registration", lang: "mr", icon: "mdi mdi-account-edit" },
    },
    {
      path: "/view-auction/:workflowStepDetailsId",
      name: "ViewAuction",
      component: loadView("WorkflowManagement/ViewAuction"),
      meta: { title: "ViewAuction", lang: "en", icon: "mdi mdi-home-outline" },
    },

    {
      path: "/mqlRequestDemo",
      name: "mqlRequestDemo",
      component: loadView("MQLRequestDemo"),
      meta: {
        title: "MQLRequestDemo",
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
        lang: "en",
        icon: "mdi mdi-eject-outline",
      },
    },
    {
      path: "/validator",
      name: "validator",
      component: loadView("Validator"),
      meta: { title: "Validator", lang: "en", icon: "mdi mdi-check-all" },
    },
    {
      path: "/encryption",
      name: "encryption",
      component: loadView("Encryption"),
      meta: { title: "Encrypt", lang: "en", icon: "mdi mdi-laptop" },
    },
    {
      path: "/cdnUpload",
      name: "cdnUpload",
      component: loadView("CdnUpload"),
      meta: { title: "Cdn Upload", lang: "en", icon: "mdi mdi-upload" },
    },
    {
      path: "/tableDemo",
      name: "tableDemo",
      component: loadView("TableDemo"),
      meta: {
        title: "Table Demo",
        lang: "en",
        icon: "mdi mdi-file-table-outline",
      },
    },
    {
      path: "/vueMetaExample/:title",
      name: "vueMetaExample",
      component: loadView("vueMetaExample"),
      meta: {
        title: "vueMetaExample",
        lang: "en",
        icon: "mdi mdi-arrow-expand",
      },
    },
    {
      path: "/clipboard",
      name: "clipboard",
      component: loadView("vueClipboard"),
      meta: { title: "vueClipboard", lang: "en", icon: "mdi mdi-arrow-expand" },
    },
    {
      path: "/MqlAssetFDBDemo",
      name: "MqlAssetFDBDemo",
      component: loadView("MqlAssetFDBDemo"),
      meta: {
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
        lang: "en",
        icon: "mdi mdi-upload",
      },
    },
    {
      path: "/downloadmanager",
      name: "downloadmanager",
      component: loadView("DownloadManager"),
      meta: {
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
        title: "sendDynamicMessages",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendStaticEmails",
      component: loadView("sendStaticEmails"),
      meta: {
        title: "sendStaticEmails",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/sendDynamicEmails",
      component: loadView("sendDynamicEmails"),
      meta: {
        title: "sendDynamicEmails",
        lang: "en",
        icon: "mdi mdi-home-outline",
      },
    },
    {
      path: "/generateOTP",
      component: loadView("generateOTP"),
      meta: { title: "generateOTP", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/validateOTP",
      component: loadView("validateOTP"),
      meta: { title: "validateOTP", lang: "en", icon: "mdi mdi-home-outline" },
    },
    // UI
    {
        path: "/ui/datatable",
        name: "Datatable",
        component: loadUI("datatable"),
        meta: { title: "Datatable", lang: "mr", icon: "mdi mdi-account-edit" },
    },
    {
      path: "/StateMaster",
      component: loadMastersView("StateMaster"),
      meta: { title: "stateMaster", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/TalukaMaster",
      component: loadMastersView("TalukaMaster"),
      meta: { title: "talukaMaster", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/EntityRegistration",
      component: loadView("EntityRegistration"),
      meta: { title: "EntityRegistration", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/auction-preparation",
      component: loadAdminView("AuctionPreparation"),
      meta: { title: "AuctionPreparation",lang: "en", icon: "mdi mdi-home-outline"},
    },
    {
      path: "/test",
      component: loadAdminView("test"),
      meta: { title: "test",lang: "en", icon: "mdi mdi-home-outline"},
    },
    {
      path: "/Step1",
      name:"ROLE_MAKER",
      component: loadAuctionView("Step1"),
      meta: { title: "Step1",lang: "en", icon: "mdi mdi-home-outline"},
    },
    {
      path: "/Step2",
      name: "Step2",
      component: loadAdminView("Step2"),
      meta: { title: "Step2",lang: "en", icon: "mdi mdi-home-outline"},
    },
    {
      path: "/Step3",
      name: "Step3",
      component: loadAuctionView("Step3"),
      meta: { title: "Step3",lang: "en", icon: "mdi mdi-home-outline"},
    },
    {
      path: "/Step4",
      name: "Step4",
      component: loadAuctionView("Step4"),
      meta: { title: "Step4",lang: "en", icon: "mdi mdi-home-outline"},
    },

    
    // UI
    {
      path: "/AuctionPreview",
      name: "AuctionPreview",
      component: loadView("AuctionPreview"),
      meta: { title: "AuctionPreview", lang: "en", icon: "mdi mdi-home-outline" },
    },
    {
      path: "/History",
      name: "History",
      component: loadView("History"),
      meta: { title: "History", lang: "en", icon: "mdi mdi-home-outline" },
    },
    
  ],
});
