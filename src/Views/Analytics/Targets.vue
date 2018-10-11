<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>Beacon Types</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
            <!-- <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title :class="formTitleColor">
                        <span class="white-letter display-1">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field :loading="isFetchingItem" :disabled="isFetchingItem" v-model="editedBeaconType.name" label="BeaconType"></v-text-field>
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
            </v-dialog> -->
        </v-toolbar>
        <v-data-table :loading="isFetching" :headers="headers" :items="targets" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.targetName }}</td>
                <td>{{ props.item.targetEmail }}</td>
                <td>{{ props.item.targetPhone }}</td>
                <td>{{ props.item.contenCard }}</td>
                <td>{{ props.item.organization }}</td>
                <td>{{ formatDate(props.item.dateReached) }}</td>
                <!-- <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editBeaconType(props.item)">
                        edit
                    </v-icon>
                </td> -->
            </template> 
            <template slot="no-data">
                <v-btn color="primary" @click="getData">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>


<script>
import {
  fetchTargetsByOrganization
} from '@/api/users'
import strftime from 'strftime'
export default {
  data: () => ({
    search: '',
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    headers: [
      { text: 'Fullname', value: 'targetName' },
      { text: 'E-mail', value: 'targetEmail' },
      { text: 'Phone Number', value: 'targetPhone' },
      { text: 'Content Card', value: 'contenCard' },
      { text: 'Organization', value: 'organization' },
      { text: 'Reached Date', value: 'dateReached' }
    ],
    targets: [],
    editedIndex: -1,
    editedBeaconType: {
      id: 0,
      id_organization: '',
      name: ''
    }
  }),

  /* computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Beacon Type' : 'Edit Beacon Type'
    },
    formTitleColor () {
      return this.editedIndex === -1 ? 'light-blue darken-1' : 'amber darken-1'
    }
  }, */

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
      fetchTargetsByOrganization().then(response => {
        this.targets = response.data
        console.table([this.targets])
        this.isFetching = false
      })
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedBeaconType = Object.assign({}, this.defaultBeaconType)
        this.editedIndex = -1
      }, 300)
    },
    formatDate (date) {
      return strftime('%B %d, %Y %H:%M:%S', new Date(date))
    }
  }
}
</script>

<style>

</style>

