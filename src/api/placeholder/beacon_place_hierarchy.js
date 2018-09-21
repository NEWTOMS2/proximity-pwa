import request from '@/utils/requester'
const baseMockingUrl = 'http://localhost:3000'
export function fetchBeaconsPlaceHierarchyPlaceholder () {
  return request({
    baseURL: baseMockingUrl,
    url: '/beacon_place_hierarchy',
    method: 'get'
  })
}
export function fetchBeaconPlaceHierarchyPlaceholder (id) {
  return request({
    baseURL: baseMockingUrl,
    url: `/beacon_place_hierarchy/${id}`,
    method: 'get'
  })
}

export function creatBeaconPlaceHierarchyPlaceholder (data) {
  return request({
    baseURL: baseMockingUrl,
    url: '/beacon_place_hierarchy',
    method: 'post',
    data
  })
}

export function updateBeaconPlaceHierarchyPlaceholder (data) {
  return request({
    baseURL: baseMockingUrl,
    url: `/beacon_place_hierarchy/${data.id}`,
    method: 'patch',
    data
  })
}
