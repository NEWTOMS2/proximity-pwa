<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>Beacon Hierarchies</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" @click="newBeaconHierarchy()" color="primary" dark class="mb-2">New Beacon Hierarchy</v-btn>
                <v-card>
                    <v-card-title :class="formTitleColor">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-form class="full-weight" v-model="valid">
                                    <v-text-field
                                    :rules="nameRule" 
                                    required 
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedBeaconHierarchy.name" 
                                    label="Name">
                                    </v-text-field>
                                </v-form>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn :disabled="!valid" color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :loading="isFetching" :headers="headers" :items="places" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editBeaconHierarchy(props.item)">
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
  fetchAllBeaconHierarchies,
  fetchBeaconHierarchyById,
  creatBeaconHierarchy,
  updateBeaconHierarchy
} from '@/api/beacon_hierarchy'
export default {
  data: () => ({
    search: '',
    valid: true,
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    headers: [
      { text: 'Id', value: 'id', width: '50px' },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px' }
    ],
    nameRule: [
      v => !!v || 'the name is required'
    ],
    places: [],
    editedIndex: -1,
    editedBeaconHierarchy: {
      id: 0,
      id_organization: '',
      name: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Beacon Hierarchy' : 'Edit Beacon Hierarchy'
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
      fetchAllBeaconHierarchies().then(response => {
        this.places = response.data
        this.isFetching = false
      })
    },

    editBeaconHierarchy (item) {
      this.cleanData()
      this.isFetchingItem = true
      fetchBeaconHierarchyById(item.id).then(response => {
        this.editedBeaconHierarchy = Object.assign({}, response.data)
        this.isFetchingItem = false
      })
      this.editedIndex = this.places.indexOf(item)
      this.dialog = true
    },

    /* deleteBeaconHierarchy (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    }, */

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedBeaconHierarchy = Object.assign({}, this.defaultBeaconHierarchy)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.places[this.editedIndex], this.editedBeaconHierarchy)
          updateBeaconHierarchy(this.editedBeaconHierarchy.id, this.editedBeaconHierarchy).then(response => {
            console.log(response)
          }).then(() => {
            this.getData()
          })
        } else {
          creatBeaconHierarchy(this.editedBeaconHierarchy).then(response => {
            console.log(response)
          }).then(() => {
            this.getData()
          })
        }
        this.close()
      }
    },
    newBeaconHierarchy () {
      this.cleanData()
    },
    cleanData () {
      Object.keys(this.editedBeaconHierarchy).forEach(key => { this.editedBeaconHierarchy[key] = null })
    }
  }
}
</script>

<style>

</style>

