<template>
    <div class="app-container">
        <h1>Beacon - Hierarchy</h1>
         <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"  v-model="search">
            </el-input>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="primary" icon="el-icon-edit"></el-button>
        </div>
        <div class="data-container">
            <el-table :key='tableKey' :data="placesList" v-loading="listLoading" element-loading-text="Cargando" border fit highlight-current-row style="width: 100%">
                <el-table-column width="60px" prop="id" label="Id" sortable/>
                <el-table-column prop="description" label="Decription" sortable/>
                <el-table-column width="100px" align="center" label="Acciones" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
                    <el-dialog v-loading="itemLoading" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="place" label-position="top">
               <el-form-item label="Description" prop="description">
                   <el-input v-model="place.description"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button v-if="dialogStatus === 'create'" type="primary" @click="creatData()">Register</el-button>
                <el-button v-else type="primary" @click="updateData()">Update</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import {
  fetchPlacesPlaceholder,
  fetchPlacePlaceholder,
  creatPlacePlaceholder,
  updatePlacePlaceholder
} from '@/api/placeholder/places'
export default {
  data: () => ({
    search: '',
    dialogStatus: '',
    tableKey: 0,
    listLoading: false,
    itemLoading: false,
    dialogFormVisible: false,
    placesList: [],
    textMap: {
      update: 'Update Beacon Hierarchy',
      create: 'Create Beacon Hierarchy'
    },
    place: {
      description: ''
    }
  }),
  watch: {
    search: function (val) {
      this.search = val
      this.listLoading = true
      fetchPlacesPlaceholder()
        .then(response => {
          this.placesList = response.data.filter(function (o) {
            return Object.keys(o).some(function (k) {
              return o[k].toString().indexOf(val) !== -1
            })
          })
        })
        .then(() => {
          this.listLoading = false
        })
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      fetchPlacesPlaceholder().then(response => {
        this.placesList = response.data
        this.listLoading = false
      })
    },
    fetchItem (id) {
      this.itemLoading = true
      fetchPlacePlaceholder(id).then(response => {
        this.itemLoading = false
        this.place = response.data
      })
    },
    resetForm () {
      this.place = {
        description: ''
      }
    },
    handleCreate () {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate (data) {
      this.fetchItem(data.id)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData () {
      const tempData = Object.assign({}, this.place)
      updatePlacePlaceholder(tempData).then(response => {
        console.log(response)
        for (const v of this.placesList) {
          if (v.id === this.place.id) {
            const index = this.placesList.indexOf(v)
            this.placesList.splice(index, 1, this.place)
            break
          }
        }
        this.dialogFormVisible = false
      })
    },
    creatData () {
      creatPlacePlaceholder(this.place).then(response => {
        console.log(response)
      }).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style>

</style>
