<template>
<div class="side-app flex is-flex">
  <keep-alive>
    <transition name="fade-transform" mode="out-in">
      <component :is="isLogged"></component>
    </transition>
  </keep-alive>
</div>
</template>

<script>
import LayoutSideBarAccess from './LayoutSideBar/LayoutSideBarAccess'
import LayoutSideBarNavigation from './LayoutSideBar/LayoutSideBarNavigation'
export default {
  components: {LayoutSideBarAccess, LayoutSideBarNavigation},
  computed: {
    isLogged () {
      return this.$store.state.user.isLogged.sideComponent
    }
  },
  created () {
    console.log(this.$store.state.user.isLogged)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.flex__column {
  flex-flow: column;
}
</style>
