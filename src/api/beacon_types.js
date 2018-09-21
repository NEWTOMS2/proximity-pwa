import request from '@/utils/requester'
import store from '@/store'
const baseApiUrl = `http://npma-beacons-experience-api.us-e1.cloudhub.io/api`
export function fetchAllBeaconTypes () {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/type`,
    method: 'get'
  })
}

export function fetchBeaconTypeById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/type/${id}`,
    method: 'get'
  })
}

export function creatBeaconType (data) {
  let idOrganization = store.state.user.info.idOrganization
  data.id = 0
  data.id_organization = idOrganization
  console.log(data)
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/type`,
    method: 'post',
    data
  })
}

export function updateBeaconType (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/type/${id}`,
    method: 'put',
    data
  })
}
