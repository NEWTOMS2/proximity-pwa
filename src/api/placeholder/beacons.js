import request from '@/utils/requester'

export function fetchBeaconsPlaceholder () {
  return request({
    url: '/beacons',
    method: 'get'
  })
}
export function fetchBeaconPlaceholder (id) {
  return request({
    url: `/beacons/${id}`,
    method: 'get'
  })
}

export function creatBeaconPlaceholder (data) {
  return request({
    url: '/beacons',
    method: 'post',
    data
  })
}

export function updateBeaconPlaceholder (data) {
  return request({
    url: `/beacons/${data.id}`,
    method: 'patch',
    data
  })
}
