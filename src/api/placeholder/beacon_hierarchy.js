import request from '@/utils/requester'

export function fetchBeaconsHierarchyPlaceholder () {
  return request({
    url: '/beacons_hierarchy',
    method: 'get'
  })
}
export function fetchBeaconHierarchyPlaceholder (id) {
  return request({
    url: `/beacons_hierarchy/${id}`,
    method: 'get'
  })
}

export function creatBeaconHierarchyPlaceholder (data) {
  return request({
    url: '/beacons_hierarchy',
    method: 'post',
    data
  })
}

export function updateBeaconHierarchyPlaceholder (data) {
  return request({
    url: `/beacons_hierarchy/${data.id}`,
    method: 'patch',
    data
  })
}
