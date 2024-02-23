export default {
  install: (Vue, options) => {
    let cdnServerList = []
    let coreURL = options.coreURL
    let loginURL = options.loginURL
    let bidderURL = options.bidderURL
    let managementURL = options.managementURL
    let cdnBaseURL = options.cdnBaseURL
    let version = options.version
    let region = options.region
    let appCode = options.appCode
    let pageLoader = false
    // TODO: check for values on staging /development/ production
    let bucketConfigurations = process.env.NODE_ENV !== 'production' ? options.cdnConfig : null

    Vue.getBucketConfigByKey = (bucketId) => {
      let result = bucketConfigurations.find(bucket => bucket.bucketId === bucketId)
      return result
    }
    Vue.$PageLoader = pageLoader
    Vue.setPageLoader = (show = false) => {
      alert(show)
      pageLoader = show
    }
    Vue.getCoreURL = () => {
      return coreURL
    }

    Vue.getLoginURL = () => {
      return loginURL
    }

    Vue.getBidderURL = () => {
      return bidderURL
    }
    
    Vue.getManagementURL = () => {
      return managementURL
    }

    Vue.getCDNBaseURL = () => {
      return cdnBaseURL
    }
    Vue.setBaseURL = (str) => {
      baseURL = str
    }

    Vue.getVersion = function () {
      return version
    }
    Vue.setVersion = function (str) {
      version = str
    }

    Vue.getRegion = function () {
      return region
    }
    Vue.setRegion = function (str) {
      region = str
    }

    Vue.getAppCode = function () {
      return appCode
    }
    Vue.setAppCode = function (str) {
      appCode = str
    }
    Vue.getServerList = function (purposeId, bucketId) {
      let result = cdnServerList.find(purpose => (purpose.purposeId === purposeId && purpose.bucketId === bucketId))
      return result
    }
    Vue.setServerList = function (obj) {
      cdnServerList.push(obj)
    }
  }
}
