<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title">
                <h3>Users</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" @click="newUser()" color="primary" dark class="mb-2">New User</v-btn>
                <v-card>
                    <v-card-title :class="formTitleColor">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-form class="full-weight" ref="form" v-model="valid" lazy-validation>
                                    <v-text-field 
                                    :rules="usernameRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedItem.user_name" 
                                    label="Username">
                                    </v-text-field>
                                    <v-text-field 
                                    :rules="firstnameRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedItem.first_name" 
                                    label="Firstname">
                                    </v-text-field>
                                    <v-text-field 
                                    :rules="lastnameRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedItem.last_name" 
                                    label="Lastname">
                                    </v-text-field>
                                    <v-text-field 
                                    :rules="emailRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedItem.email" 
                                    label="Email">
                                    </v-text-field>
                                    <v-text-field 
                                    :rules="passwordRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    v-model="editedItem.password" 
                                    label="Password">
                                    </v-text-field>
                                    <v-select 
                                    :rules="organizationRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    :items="organizations" 
                                    item-text="name" 
                                    item-value="id" 
                                    v-model="editedItem.id_organization" 
                                    label="Organization">
                                    </v-select>
                                    <v-select 
                                    :rules="roleRule"
                                    required
                                    :loading="isFetchingItem" 
                                    :disabled="isFetchingItem" 
                                    :items="roles" item-text="name" 
                                    item-value="id" 
                                    v-model="editedItem.id_role" 
                                    label="Role">
                                    </v-select>
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
        <v-data-table :loading="isFetching" :headers="headers" :items="users" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.username }}</td>
                <td>{{ props.item.fullname }}</td>
                <td>{{ props.item.organization }}</td>
                <td>{{ props.item.role }}</td>
                <td class="justify-center layout px-0">
                    <v-icon v-if="props.item.role !== 'Master'" small class="mr-2" @click="editItem(props.item)">
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
  fetchAllUsers,
  fetchUserById,
  /* fetchAllUsersByOrganization, */
  creatUser,
  updateUser
} from '@/api/users'
import { fetchAllRoles } from '@/api/roles'
import { fetchAllOrganizations } from '@/api/organizations'
export default {
  data: () => ({
    search: '',
    repassword: '',
    valid: true,
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    headers: [
      { text: 'Username', value: 'username', class: ['headline', 'font-weight-regular'] },
      { text: 'Name', value: 'fullname', class: ['headline', 'font-weight-regular'] },
      { text: 'Organization', value: 'organization', class: ['headline', 'font-weight-regular'] },
      { text: 'Role', value: 'role', class: ['headline', 'font-weight-regular'] },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px', class: ['headline', 'font-weight-regular'] }
    ],
    usernameRule: [
      v => !!v || 'the username is required'
    ],
    firstnameRule: [
      v => !!v || 'the firstname is required'
    ],
    lastnameRule: [
      v => !!v || 'the lastname is required'
    ],
    emailRule: [
      v => !!v || 'the email is required'
    ],
    passwordRule: [
      v => !!v || 'the password is required'
    ],
    roleRule: [
      v => !!v || 'the role is required'
    ],
    organizationRule: [
      v => !!v || 'the organization is required'
    ],
    users: [],
    roles: [],
    organizations: [],
    editedIndex: -1,
    editedItem: {
      user_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      id_organization: '',
      id_role: 0
    },
    defaultItem: {
      name: '',
      type: '',
      radius: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
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
      fetchAllUsers().then(response => {
        this.users = response.data
        this.isFetching = false
      })
      fetchAllRoles().then(response => {
        response.data.forEach(element => {
          if (element.name !== 'Master') { this.roles.push(element) }
        })
      })
      fetchAllOrganizations().then(response => {
        this.organizations = response.data
      })
    },

    editItem (item) {
      this.cleanData()
      this.isFetchingItem = true
      fetchUserById(item.id).then(response => {
        this.isFetchingItem = false
        this.editedItem = Object.assign({}, response.data)
      })
      this.editedIndex = this.users.indexOf(item)
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
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
          updateUser(this.editedItem.id, this.editedItem).then(response => {
          }).then(() => {
            this.getData()
          })
        } else {
          creatUser(this.editedItem).then(response => {
            console.log(response)
            this.users.push(this.editedItem)
          }).then(() => {
            this.getData()
          })
        }
        this.close()
      }
    },
    newUser () {
      this.cleanData()
    },
    cleanData () {
      this.$refs.form.reset()
      Object.keys(this.editItem).forEach(key => { this.editItem[key] = null })
    }
  }
}
</script>

<style>

</style>
