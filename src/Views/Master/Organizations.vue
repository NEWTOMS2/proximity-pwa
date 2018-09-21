<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><h3>Organizations</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" @click="newOrganization()" dark class="mb-2">New Organization</v-btn>
                <v-card>
                    <v-card-title :class="formTitleColor" class="">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                    <v-form  class="full-weight" v-model="valid">
                                        <v-text-field :loading="isFetchingItem" :disabled="isFetchingItem" v-model="editedItem.name" label="Organization Name"></v-text-field>
                                    </v-form>
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
        <v-data-table :loading="isFetching" :headers="headers" :items="roles" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
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
  fetchAllOrganizations,
  fetchOrganizationById,
  /* fetchAllOrganizationsByOrganization, */
  creatOrganization,
  updateOrganization
} from '@/api/organizations'
export default {
  data: () => ({
    search: '',
    repassword: '',
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px' }
    ],
    roles: [],
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
      return this.editedIndex === -1 ? 'New Organization' : 'Edit Organization'
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
      fetchAllOrganizations().then(response => {
        this.roles = response.data
      })
    },

    editItem (item) {
      this.cleanData()
      this.isFetchingItem = true
      fetchOrganizationById(item.id).then(response => {
        this.isFetchingItem = false
        this.editedItem = Object.assign({}, response.data)
      })
      this.editedIndex = this.roles.indexOf(item)
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
        Object.assign(this.roles[this.editedIndex], this.editedItem)
        updateOrganization(this.editedItem.id, this.editedItem).then(response => {
          console.log(this.editedItem)
        }).then(() => {
          this.getData()
        })
      } else {
        creatOrganization(this.editedItem).then(response => {
          console.log(response)
          this.roles.push(this.editedItem)
        }).then(() => {
          this.getData()
        })
      }
      this.close()
    },
    newOrganization () {
      this.cleanData()
    },
    cleanData () {
      Object.keys(this.editItem).forEach(key => { this.editItem[key] = null })
    }
  }
}
</script>

<style>
.full-weight {
    width: 100%;
}
</style>
