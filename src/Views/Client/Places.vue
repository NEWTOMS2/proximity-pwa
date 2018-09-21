<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>Places</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" @click="newPlace()" color="primary" dark class="mb-2">New Place</v-btn>
                <v-card>
                    <v-card-title :class="formTitleColor">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field :loading="isFetchingItem" :disabled="isFetchingItem" v-model="editedPlace.name" label="Place"></v-text-field>
                                </v-flex>
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
    headers: [
      { text: 'Id', value: 'id', width: '50px' },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px' }
    ],
    places: [],
    editedIndex: -1,
    editedPlace: {
      id: 0,
      id_organization: '',
      name: ''
    }
  }),

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

  methods: {
    getData () {
      this.isFetching = true
      fetchAllPlaces().then(response => {
        this.places = response.data
        this.isFetching = false
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

</style>

