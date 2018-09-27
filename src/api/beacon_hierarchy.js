import request from '@/utils/requester'
import store from '@/store'
const baseApiUrl = `https://npma-beacons-experience-api.us-e1.cloudhub.io/api`
export function fetchAllBeaconHierarchies () {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/hierarchy`,
    method: 'get'
  })
}

export function fetchBeaconHierarchyById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/hierarchy/${id}`,
    method: 'get'
  })
}

export function creatBeaconHierarchy (data) {
  let idOrganization = store.state.user.info.idOrganization
  data.id = 0
  data.id_organization = idOrganization
  console.log(data)
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/hierarchy`,
    method: 'post',
    data
  })
}

export function updateBeaconHierarchy (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `/beacons/${store.state.user.info.idOrganization}/hierarchy/${id}`,
    method: 'put',
    data
  })
}
