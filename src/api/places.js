import request from '@/utils/requester'
import store from '@/store'
const baseApiUrl = `https://npma-places-experience-api.us-e1.cloudhub.io/api/`
export function fetchAllPlaces () {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/places`,
    method: 'get'
  })
}

export function fetchPlaceById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/places/${id}`,
    method: 'get'
  })
}

export function creatPlace (data) {
  let idOrganization = store.state.user.info.idOrganization
  data.id = 0
  data.id_organization = idOrganization
  console.log(data)
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/places`,
    method: 'post',
    data
  })
}

export function updatePlace (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `${store.state.user.info.idOrganization}/places/${id}`,
    method: 'put',
    data
  })
}
