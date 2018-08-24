<template>
    <el-menu
      id="app-menu"
      default-active="1"
      class="is-flex"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <router-link class="app-navigation-item" to="/Home" replace><el-menu-item index="1">Home</el-menu-item></router-link>
      <router-link class="app-navigation-item" to="/Beacon" replace><el-menu-item index="2">Beacon</el-menu-item></router-link>
      <router-link class="app-navigation-item" to="/ContentCards" replace><el-menu-item index="3">Content Cards</el-menu-item></router-link>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>Configurations</template>
        <el-menu-item-group>
          <template slot="title">Beacon</template>
             <router-link class="app-navigation-item" to="/BeaconTypes" replace><el-menu-item index="2-1">Types</el-menu-item></router-link>
             <router-link class="app-navigation-item" to="/BeaconHierarchy" replace><el-menu-item index="2-2">Hierarchy</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group title="Global">
          <el-menu-item index="2-3">Places</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item @click="onSubmit()" index="1">LogOut</el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      onSubmit () {
        this.$store.dispatch('logInOut').then(() => {
          this.$router.push({ path: '/' })
        })
      }
    }
  }
</script>

<style>
#app-menu .el-menu-item, .el-submenu__title, .el-menu-item-group__title {
  font-size: 1rem;
}
.app-navigation-item {
  text-decoration: none;
}
.el-submenu [class^=el-icon-] {
    width: 36px!important;
    font-size: 28px!important;
}
</style>
