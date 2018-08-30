<template>
    <v-layout row wrap>
      <v-flex xs8>
        <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
      </v-flex>
    <v-flex xs4>
        <landing-layout-access-form/>
      </v-flex>
    </v-layout>
</template>

<script>
import LandingLayoutAccessForm from '@/components/Layouts/LandingLayouts/LandingLayoutAccessForm'
export default {
  components: { LandingLayoutAccessForm },
  data: () => ({
    items: [
      {src: require('@/assets/B.png')},
      {src: require('@/assets/O.png')},
      {src: require('@/assets/P.png')},
      {src: require('@/assets/G.png')}
    ]
  })
}
</script>

<style>
.v-carousel {
  height: inherit!important;
}
</style>
