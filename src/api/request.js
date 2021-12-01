// axios的封装
import axios from 'axios'
import Vue from 'vue'
// axios.defaults.baseURL = process.env.VUE_APP_URL
// 导入Toast  Toash===this.$toast
// import { Toast } from 'vant'
// import { removeLocal, getLocal } from '@/utils/local.js'
// 导入vuex实例化对象
// import Store from '@/store' // Store===this.$store
// 导入router实例化对象
// import Router from '@/router' // Router===this.$router
const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
})
let loading = false
function openLoading (loadingDom) {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading',
    background: 'rgba(255, 255, 255, 0.7)',
    target: loadingDom || 'body'
  })
}
function closeLoading () {
  loading && loading.close()
}

let cancelArr = []
// 找出cancelArr中相同url的取消方法并调用
window.cancelEvent = function (url, cancelAll) {
  // const _index = cancelArr.findIndex((item, index) => {
  //   return item.url === url
  // })
  // if (_index !== -1) {
  //   cancelArr[_index].fn()
  // }
  cancelArr = cancelArr.filter((item, index) => {
    if (cancelAll) {
      item.fn()
      return false
    } else {
      if (item.url === url) {
        item.fn()
        return false
      } else {
        return true
      }
    }
  })
}
/*请求拦截*/
_fetch.interceptors.request.use(
  function (config) {
    // window.console.log('config', config)
    // 有部分开发人员,你多传参数也ok,有部分开发,写代码很严格.,你多传任意参数它都报错
    // 需要请求头,就传,不需要就不要传
    // 调用取消,找出相同url的取消方法调用
    window.cancelEvent(config.url, false)
    if (config.needToken) {
      config.headers.authorization = `Bearer ${getLocal()}`
    }
    // 设置 loading
    if (config.loading) {
      openLoading(config.loadingDom)
    }
    config.cancelToken = new axios.CancelToken(function (cancel) {
      cancelArr.push({
        fn: cancel,
        url: config.url
      })
    })
    // window.console.log('cancelArr', cancelArr)

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/*响应拦截*/
_fetch.interceptors.response.use(
  function (res) {
    if (res.config.loading) { closeLoading() }
    return res
    // window.console.log('响应拦截', res)
    // if (res.data.code === 200) {
    //   return res
    // } else {
    //   if (res.data.code === 401 || res.data.code === 403) {
    //     /*
    //     401/403
    //       1:提示一下
    //       2:删除token
    //       3:修改vuex的isLogin为false
    //       4:跳转到登录页
    //       5:中止.then执行,跳转到.catch执行
    //     */
    //     if (res.config.noError) {
    //       removeLocal()
    //       return Promise.reject(new Error('该错误不处理不用理'))
    //     } else {
    //       Toast.fail(res.data.message)
    //       removeLocal()
    //       Store.commit('setIsLogin', false)
    //       // 回跳地址
    //       // window.console.log('当前网址:', window.location.href.split('#')[1])
    //       Router.push('/login?redirect=' + window.location.href.split('#')[1])
    //       return Promise.reject(new Error(res.data.message))
    //     }
    //   } else {
    //     // 提示错误
    //     Toast.fail(res.data.message)
    //     // 中止.then执行,跳转到.catch执行
    //     return Promise.reject(new Error(res.data.message))
    //   }
    // }
  },
  function (error) {
    closeLoading()
    return Promise.reject(error)
  }
)

// 开除:你在这段时间有没有成长,绝对会找到.

// Vue.prototype.$axios = _fetch
export default _fetch
