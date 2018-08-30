<template>
  <keep-alive>
    <transition name="slide-transform" mode="out-in">
      <router-view/>
    </transition>
  </keep-alive>
</template>
<script>
import LayoutContentCarousel from './LayoutContent/LayoutContentCarousel'
import LayoutContentMain from './LayoutContent/LayoutContentMain'
export default {
  components: { LayoutContentCarousel, LayoutContentMain },
  data: () => ({

  }),
  computed: {
    isLogged () {
      return this.$store.state.user.isLogged.mainComponent
    }
  }
}
</script>

<style>
.filter-container {
  padding: 1rem;
}
.data-container {
  padding: 1rem;
}
</style>
