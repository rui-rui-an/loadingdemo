import _fetch from './request'
function test (loadingObj) {
  return _fetch({
    url: '/getlist/test',
    method: 'get',
    ...loadingObj
  })
}
function test2 (data,loadingObj) {
  return _fetch({
    url: '/getlist/test2',
    method: 'post',
    data,
    ...loadingObj
  })
}
export { test }
