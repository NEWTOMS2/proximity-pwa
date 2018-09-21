<template>
        <div class="container">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>Beacons</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.name" label="Beacon Name"></v-text-field>
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
        <v-data-table :headers="headers" :items="beacons" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.radius }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">
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
  fetchBeaconsPlaceholder,
  fetchBeaconPlaceholder,
  creatBeaconPlaceholder,
  updateBeaconPlaceholder
} from '@/api/placeholder/beacons'
export default {
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {text: 'Id', value: 'id', width: '50px'},
      {text: 'Name', value: 'name'},
      {text: 'Type', value: 'type'},
      {text: 'Radius', value: 'radius'},
      {text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px'}
    ],
    beacons: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      type: '',
      radius: 0
    },
    defaultItem: {
      name: '',
      type: '',
      radius: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      fetchBeaconsPlaceholder().then(response => {
        this.beacons = response.data
      })
    },

    editItem (item) {
      fetchBeaconPlaceholder(item.id).then(response => {
        this.editedItem = Object.assign({}, response.data)
      })
      this.editedIndex = this.beacons.indexOf(item)
      this.dialog = true
    },

    /* deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    }, */

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.beacons[this.editedIndex], this.editedItem)
        updateBeaconPlaceholder(this.editedItem).then(response => {
          console.log(this.editedItem)
        })
      } else {
        creatBeaconPlaceholder(this.editedItem).then(response => {
          console.log(response)
          this.beacons.push(this.editedItem)
        })
      }
      this.close()
    }
  }
}
</script>

<style>
.app-beacon{
    display: flex;
    justify-content: center;
    align-items: center;
}
.elegant__title {
  display: flex;
  align-items: center;
}
</style>
