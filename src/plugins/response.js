import router from '@/router.js'
class Response {
  constructor(objRaw) {
    this.raw = objRaw.data
    this.headers = objRaw.headers
    this.isReactive = false
    if (this.headers !== undefined) {
      if (this.headers.authorization !== undefined) {
        sessionStorage.setItem('user-token', this.headers.authorization)
      }
    }

    this.setReactivity = isReactive => {
      this.isReactive = isReactive
    }
    this.deepFreeze = object => {
      // Retrieve the property names defined on object
      if (object === undefined || object === null) {
        return object
      }
      var propNames = Object.getOwnPropertyNames(object)
      // Freeze properties before freezing self
      for (let name of propNames) {
        let value = object[name]
        object[name] =
          value && typeof value === 'object' ? this.deepFreeze(value) : value
      }
      return Object.freeze(object)
    }
    this.getRaw = function (isReactive = false) {
      return isReactive ? this.raw : this.deepFreeze(this.raw)
    }
    this.getHeaders = function () {
      return this.headers
    }
    this.showElement = function (strDocId) {
      if (strDocId != null) {
        var x = document.getElementById(strDocId)
        if (x.style.display === 'none') {
          x.style.display = 'block'
        }
      }
    }
    this.hideElement = function (strDocId) {
      if (strDocId != null) {
        var x = document.getElementById(strDocId)
        x.style.display = 'none'
      }
    }
    this.getActivity = function (strActivity, isReactive = false) {
      // TODO: if calling auto set the local cache property
// console.log('strActivity', strActivity);
// console.log('strRaw', this.raw);
      if (strActivity.split('_').length > 1) {
        //     alert('query')
        return isReactive
          ? this.raw.FetchQueryData.result[strActivity.substring('query_'.length, strActivity.length)]
          : this.deepFreeze(
            this.raw.FetchQueryData.result[strActivity.substring('query_'.length, strActivity.length)]
          )
      } else {
        return isReactive
          ? this.raw[strActivity]
          : this.deepFreeze(this.raw[strActivity])
      }
    }
    this.Navigate = function (
      str_routeName = null,
      str_activityData = null,
      str_key = null
    ) {
      router.push({
        name: str_routeName,
        params: { [str_key]: this.getActivity(str_activityData, true) }
      })
    }

    this.isValid = function (strActivity = null) {
      // NOTE: check global error and activity specific error
      if (strActivity === null) {
        // check for global errorCode
        return !!(this.raw.errorCode === 1000 || this.raw.errorCode === 0)
      } else {
        // check for specific
        if (strActivity.split('_').length > 1) {
          // query activity
          return !!(
            this.raw['FetchQueryData'].errorCode === 1000 ||
            this.raw['FetchQueryData'].errorCode === 0
          )
        } else {
          return !!(
            this.raw[strActivity].errorCode === 1000 ||
            this.raw[strActivity].errorCode === 0
          )
        }
      }
    }
    this.uploadedFileURL = function () {
      return this.raw.result
    }

    this.getAssetPath = function () {
      return this.raw.result.path // returns path where your asset is stored
    }

    // this.getAssetContent = function () {
    //   return this.raw.result // returns the data in your asset
    // }

    this.showErrorToast = function (strActivity = null) {
      if (strActivity === null) {
         window.app.$toast.error(this.raw.error)
      } else {
        if (strActivity.split('_').length > 1) {
            window.app.$toast.error(this.raw['FetchQueryData'].error)
        } else {
          window.app.$toast.error(this.raw[strActivity].error)
        }
      }
      return this
    }
  }
}
export default Response
