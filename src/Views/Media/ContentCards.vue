<template>
    <div class="container" transition="slide-x-transition">
        <v-toolbar flat color="white">
            <v-toolbar-title class="elegant__title"><img style="width: 25%;" src="@/assets/beacon.png" alt="" srcset=""><h3>ContentCards</h3></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
              <v-btn @click="newContentCard()" color="primary" dark class="mb-2">New Content Card</v-btn>
        </v-toolbar>
        <v-data-table :loading="isFetching" :headers="headers" :items="contentCards" hide-actions :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td><router-link :to="contentCardUrl(props.item)"><v-btn flat small color="primary">Link</v-btn></router-link></td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editContentCard(props.item)">
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
  fetchAllContentCards
} from '@/api/content_cards'
export default {
  data: () => ({
    search: '',
    dialog: false,
    isFetching: false,
    isFetchingItem: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Preview', value: 'name', align: 'center', width: '100px' },
      { text: 'Actions', value: 'action', align: 'center', sortable: false, width: '250px' }
    ],
    contentCards: [],
    editedIndex: -1,
    editedContentCard: {
      id: 0,
      id_organization: '',
      name: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New ContentCard' : 'Edit ContentCard'
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
      fetchAllContentCards().then(response => {
        this.contentCards = response.data
        this.isFetching = false
      })
    },
    newContentCard () {
      this.$router.push('/app/new_contentcard')
    },
    contentCardUrl (item) {
      return `/media/content/${item.id}/${item.id_organization}`
    }
  }
}
</script>

<style>

</style>

