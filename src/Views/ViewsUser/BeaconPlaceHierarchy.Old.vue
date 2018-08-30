<template>
    <div class="container-test">
        <h2>Beacons - Place's Hierarchy</h2>
        <div class="app-drag-and-drop-container flex side-padding">
            <div class="places">
                <h2>Places</h2>
                <div class="place-container" v-for="place in beaconPlaceHierarchy" :key="place.id">
                    <h3> {{place.name}} </h3>
                    <div class="hierarchy-container move-behaivor flex">
                        <div class="hierarchy-level is-flex" v-for="level in place.hierarchy" :key="level.id">
                            <h4> {{level.name}} </h4>
                            <draggable element="el-collapse" :list="level.beacons" :component-data="getComponentData()" class="drag-container" :options="{group:'beacons',animation: 250}">
                                <el-collapse-item v-for="e in level.beacons" :key="e.name" :title="e.name" :name="e.name">
                                    <p><span class="bold">Type: </span>{{e.type}}</p>
                                    <p><span class="bold">Radius: </span>{{e.radius}}</p>
                                </el-collapse-item>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="unassigned-beacons">
                <h2>Unassigned Beacons</h2>
                <el-collapse accordion>
                    <draggable element="el-collapse" :list="unassignedBeacons" :component-data="getComponentData()" class="drag-container" :options="{group:'beacons',animation: 250}">
                        <el-collapse-item v-for="e in unassignedBeacons" :key="e.name" :title="e.name" :name="e.name">
                            <p><span class="bold">Type: </span>{{e.type}}</p>
                            <p><span class="bold">Radius: </span>{{e.radius}}</p>
                        </el-collapse-item>
                    </draggable>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { fetchBeaconsPlaceHierarchyPlaceholder } from '@/api/placeholder/beacon_place_hierarchy'
// import { fetchBeaconsPlaceholder } from '@/api/placeholder/beacon_types'
export default {
  components: {draggable},
  data: () => ({
    numbers: [ 1, 2, 3, 4, 5 ],
    items: [{id: 1, text: 'Hallo1'}, {id: 2, text: 'Hallo2'}],
    beaconPlaceHierarchy: [],
    unassignedBeacons: []
  }),
  created () {
    this.fetchData()
    // this.fetchDataBeacons()
  },
  methods: {
    fetchData () {
      fetchBeaconsPlaceHierarchyPlaceholder().then(response => {
        response.data.places.forEach(element => {
          this.beaconPlaceHierarchy.push(element)
        })
        response.data.unassigned_beacons.forEach(element => {
          this.unassignedBeacons.push(element)
        })
        console.log(this.beaconPlaceHierarchy)
        console.log(this.unassignedBeacons)
      })
    },
    getComponentData () {
      var values = {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: this.activeNames,
          accordion: true
        }
      }
      return values
    }
  }
}
</script>
<style scoped>
  .side-padding {
    padding: 0 3rem;
  }
  .bold {
    font-weight: 900;
  }
  .move-behaivor {
    cursor: move;
  }
	.drag-image {
		color: #000;
	}
  .disowned-becon {
    padding: 1rem;
  }
  .places {
    flex: 1 1 70%;
  }
  .unassigned-beacons {
    flex: 1 1 30%;
  }
  .place-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  .hierarchy-level {
    padding: 1rem;
    margin: 0.5rem;
  }
  .hierarchy-level-beacon {
    padding: 1rem;
    margin: 0.5rem;
  }
</style>