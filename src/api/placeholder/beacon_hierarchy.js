import request from '@/utils/requester'
const baseMockingUrl = 'http://localhost:3000'
export function fetchBeaconsHierarchyPlaceholder () {
  return request({
    baseURL: baseMockingUrl,
    url: '/beacons_hierarchy',
    method: 'get'
  })
}
export function fetchBeaconHierarchyPlaceholder (id) {
  return request({
    baseURL: baseMockingUrl,
    url: `/beacons_hierarchy/${id}`,
    method: 'get'
  })
}

export function creatBeaconHierarchyPlaceholder (data) {
  return request({
    baseURL: baseMockingUrl,
    url: '/beacons_hierarchy',
    method: 'post',
    data
  })
}

export function updateBeaconHierarchyPlaceholder (data) {
  return request({
    baseURL: baseMockingUrl,
    url: `/beacons_hierarchy/${data.id}`,
    method: 'patch',
    data
  })
}
