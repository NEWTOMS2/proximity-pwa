<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>Places</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-dialog v-model="dialog">
              <v-btn slot="activator" @click="newPlace()" color="primary" dark class="mb-2">New Place</v-btn>
                <v-card>
                    <v-card-title :class="formTitleColor">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-form class="full-weight" v-model="valid">
                                    <v-text-field :loading="isFetchingItem" :disabled="isFetchingItem" v-model="editedPlace.name" label="Place"></v-text-field>
                                    <gmap-autocomplete
                                        class="v-button-autocomplete form-control"
                                        @place_changed="setPlace">
                                    </gmap-autocomplete>
                                    <v-text-field :loading="isFetchingItem" :disabled="true" v-model="editedPlace.lat" label="Latitude"></v-text-field>
                                    <v-text-field :loading="isFetchingItem" :disabled="true" v-model="editedPlace.lng" label="Longitude"></v-text-field>
                                </v-form>
                                <GmapMap
                                  :center="center"
                                  :zoom="zoom"
                                  map-type-id="roadmap"
                                  style="width: 100vw; height: 40vh"
                                > 
                                  <Gmap-Marker
                                    v-if="this.currentPlace"
                                    :label="label"
                                    :position="{
                                          lat: this.currentPlace.geometry.location.lat(),
                                          lng: this.currentPlace.geometry.location.lng(),
                                        }"
                                    @click="center=m.position" 
                                    :icon="{ url: require('@/assets/beacon_place.svg')}"
                                    ></Gmap-Marker>
                                </GmapMap>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :loading="isFetching" :headers="headers" :items="places" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editPlace(props.item)">
                        edit
                    </v-icon>
                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="getData">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>


<script>
import {
  fetchAllPlaces,
  fetchPlaceById,
  creatPlace,
  updatePlace
} from '@/api/places'
export default {
  data: () => ({
    search: '',
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    apiKey: 'AIzaSyBNHF0Df-A0QANcNhhxSUs9etFvqsV6FuE',
    headers: [
      { text: 'Id', value: 'id', width: '50px' },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px' }
    ],
    places: [],
    marker: {},
    zoom: 4,
    center: { lat: 45.508, lng: -73.587 },
    editedIndex: -1,
    editedPlace: {
      id: 0,
      id_organization: '',
      name: '',
      address: '',
      lat: '',
      lng: ''
    },
    shape: {
      coords: [10, 10, 10, 15, 15, 15, 15, 10],
      type: 'poly'
    }
  }),
  center: {},
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Place' : 'Edit Place'
    },
    formTitleColor () {
      return this.editedIndex === -1 ? 'light-blue darken-1' : 'amber darken-1'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.center = { lat: 37.09024, lng: -95.71289100000001 }
  },
  methods: {
    getData () {
      this.isFetching = true
      fetchAllPlaces().then(response => {
        this.places = response.data
        this.isFetching = false
      })
    },
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.zoom = 20
      this.markers = {}
      this.currentPlace = place
      this.editedPlace.lat = this.currentPlace.geometry.location.lat()
      this.editedPlace.lng = this.currentPlace.geometry.location.lng()
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng()
      }
      this.center = marker
      this.marker = { position: marker }
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.lngitude
        }
      })
    },
    editPlace (item) {
      this.cleanData()
      this.isFetchingItem = true
      fetchPlaceById(item.id).then(response => {
        this.editedPlace = Object.assign({}, response.data)
        this.isFetchingItem = false
      })
      this.editedIndex = this.places.indexOf(item)
      this.dialog = true
    },

    /* deletePlace (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    }, */

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedPlace = Object.assign({}, this.defaultPlace)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.places[this.editedIndex], this.editedPlace)
        updatePlace(this.editedPlace.id, this.editedPlace).then(response => {
          console.log(response)
        }).then(() => {
          this.getData()
        })
      } else {
        creatPlace(this.editedPlace).then(response => {
          console.log(response)
        }).then(() => {
          this.getData()
        })
      }
      this.close()
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.editedPlace.address = addressData
    },
    newPlace () {
      this.cleanData()
    },
    cleanData () {
      Object.keys(this.editedPlace).forEach(key => { this.editedPlace[key] = null })
    }
  }
}
</script>

<style>
.v-button-autocomplete {
  width: 100%!important;
  border-bottom: 1px solid #949494!important;
  margin: 15px 0!important;
  padding: 5px 0!important;
}
</style>

