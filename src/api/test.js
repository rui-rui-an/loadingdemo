import _fetch from './request'
// 带loading的get请求
function test (loadingObj) {
  return _fetch({
    url: '/getlist/test',
    method: 'get',
    ...loadingObj
  })
}
// 带loading的post请求
function test2 (data,loadingObj) {
  return _fetch({
    url: '/getlist/test2',
    method: 'post',
    data,
    ...loadingObj
  })
}
// 不带loading的get请求，正常封装api
// function test () {
//   return _fetch({
//     url: '/getlist/test',
//     method: 'get'
//   })
// }
// 不带loading的post请求，正常封装api
// function test2 (data) {
//   return _fetch({
//     url: '/getlist/test2',
//     method: 'post',
//     data
//   })
// }
export { test,test2 }
