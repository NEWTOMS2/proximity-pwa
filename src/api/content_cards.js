import request from '@/utils/requester'
import store from '@/store'
const baseApiUrl = `https://npma-content-cards-experience-api.us-e1.cloudhub.io/api/`
export function fetchAllContentCards () {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/content_cards`,
    method: 'get'
  })
}

export function fetchContentCardById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/content_cards/${id}`,
    method: 'get'
  })
}
export function fetchContentCardMedia (...params) {
  return request({
    baseURL: baseApiUrl,
    url: `${params[0]}/content_cards/${params[1]}`,
    method: 'get'
  })
}

export function creatContentCard (data) {
  let idOrganization = store.state.user.info.idOrganization
  data.idOrganization = idOrganization
  console.log(data)
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/content_cards`,
    method: 'post',
    data
  })
}

export function updateContentCard (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/content_cards/${id}`,
    method: 'put',
    data
  })
}
