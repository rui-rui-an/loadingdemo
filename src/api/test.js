import _fetch from './request'
function test (loadingDom) {
  return _fetch({
    url: '/getlist/test',
    method: 'get',
    loading: true,
    loadingDom
  })
}
export { test }
