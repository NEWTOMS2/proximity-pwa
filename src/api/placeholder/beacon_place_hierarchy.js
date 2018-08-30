import request from '@/utils/requester'

export function fetchBeaconsPlaceHierarchyPlaceholder () {
  return request({
    url: '/beacon_place_hierarchy',
    method: 'get'
  })
}
export function fetchBeaconPlaceHierarchyPlaceholder (id) {
  return request({
    url: `/beacon_place_hierarchy/${id}`,
    method: 'get'
  })
}

export function creatBeaconPlaceHierarchyPlaceholder (data) {
  return request({
    url: '/beacon_place_hierarchy',
    method: 'post',
    data
  })
}

export function updateBeaconPlaceHierarchyPlaceholder (data) {
  return request({
    url: `/beacon_place_hierarchy/${data.id}`,
    method: 'patch',
    data
  })
}
