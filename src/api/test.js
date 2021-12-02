import _fetch from './request'
function test (loadingObj) {
  return _fetch({
    url: '/getlist/test',
    method: 'get',
    ...loadingObj
  })
}
export { test }
