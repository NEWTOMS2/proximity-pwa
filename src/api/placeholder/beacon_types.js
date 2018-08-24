import request from '@/utils/requester'

export function fetchBeaconsTypesPlaceholder () {
  return request({
    url: '/beacons_types',
    method: 'get'
  })
}
export function fetchBeaconTypePlaceholder (id) {
  return request({
    url: `/beacons_types/${id}`,
    method: 'get'
  })
}

export function creatBeaconTypePlaceholder (data) {
  return request({
    url: '/beacons_types',
    method: 'post',
    data
  })
}

export function updateBeaconTypePlaceholder (data) {
  return request({
    url: `/beacons_types/${data.id}`,
    method: 'patch',
    data
  })
}
