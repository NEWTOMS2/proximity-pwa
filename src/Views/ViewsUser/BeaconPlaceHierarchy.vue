<template>
    <div class="container-places-canvas flex is-flex oppa-column-style">
        <h2>Beacons - Place's Hierarchy</h2>
        <div class="app-drag-and-drop-container flex side-padding">
            <div class="places">
                <h2>Places</h2>
                <div class="place-container" v-for="place in beaconPlaceHierarchy" :key="place.id">
                    <v-card>
                        <v-card-title primary-title>
                            <h3> {{place.name}} </h3>
                        </v-card-title>
                        <div class="hierarchy-container move-behaivor flex">
                            <div class="hierarchy-level is-flex" v-for="level in place.hierarchy" :key="level.id">
                                <v-card>
                                    <v-card-title primary-title>
                                        <h4> {{level.name}} </h4>
                                    </v-card-title>
                                    <draggable element="v-list" :list="level.beacons" class="drag-container" :options="{group:'beacons',animation: 350}">
                                        <v-list-group v-for="item in level.beacons" :key="item.name" no-action>
                                            <v-list-tile slot="activator">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>

                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>{{ item.type }}</v-list-tile-title>
                                                </v-list-tile-content>

                                                <v-list-tile-action>
                                                    <v-icon>{{ key }}</v-icon>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>{{ item.radius }}</v-list-tile-title>
                                                </v-list-tile-content>

                                                <v-list-tile-action>
                                                    <v-icon>{{ key }}</v-icon>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                        </v-list-group>
                                    </draggable>
                                </v-card>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
            <div class="unassigned-beacons">
              <v-card>
                 <v-card-title primary-title>
                  <h2>Unassigned Beacons</h2>
                 </v-card-title>
                    <draggable element="v-list" :list="unassignedBeacons" class="drag-container" :options="{group:'beacons',animation: 350}">
                        <v-list-group v-for="item in unassignedBeacons" :key="item.name" no-action>
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title><span class="bold">Type: </span>{{item.type }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>{{ key }}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title><span class="bold">Radius: </span>{{ item.radius }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>{{ key }}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </draggable>
              </v-card>
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
    }
  }
}
</script>
<style scoped>
  .side-padding {
    padding: 0 1rem;
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