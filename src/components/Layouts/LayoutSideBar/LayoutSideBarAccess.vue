<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" id="side-context-container" class="flex is-flex flex__column">
    <el-tab-pane class="flex is-flex" label="Log In" name="login">
      <transition name="el-fade-in-linear">
        <layout-side-bar-access-log-in-form v-show="showLogIn" class="transition-box"/>
      </transition>
    </el-tab-pane>
    <el-tab-pane class="flex is-flex" label="Sing Up" name="singup">
      <transition name="el-fade-in-linear">
        <layout-side-bar-access-sing-up-form v-show="showSingUp" class="transition-box"/>
      </transition>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import LayoutSideBarAccessLogInForm from './LayoutSideBarAccess/LayoutSideBarAccessLogInForm'
import LayoutSideBarAccessSingUpForm from './LayoutSideBarAccess/LayoutSideBarAccessSingUpForm'
export default {
  components: {LayoutSideBarAccessLogInForm, LayoutSideBarAccessSingUpForm},
  data: () => ({
    showLogIn: true,
    showSingUp: false,
    activeName: 'login',
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    }
  }),
  methods: {
    handleClick (tab, event) {
      this.showLogIn = !this.showLogIn
      this.showSingUp = !this.showSingUp
      console.log(tab, event)
    }
  }
}
</script>
<style>
.centered {
  align-self: center;
  padding: 4rem;
}
#side-context-container .el-tabs__content {
  display: flex;
  flex: 1;
}
</style>
