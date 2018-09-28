<template>
<v-app id="keep">
  <transition name="fade">
      <router-view/>
  </transition>
</v-app>  
</template>
<script>
  export default {
    data () {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
      return {
        tableData: Array(20).fill(item)
      }
    },
    created () {
      console.log(process.env.ROOT_API)
    }
  }
</script>
<style>
  html,body {
    overflow: auto;
  }
 body {
   margin: 0!important;
   font-family: Arial, Helvetica, sans-serif;
  }
  #app-container {
    min-height: 100vh;
  }
  .flex {
    display: flex;
  }
  .is-flex {
    flex: 1;
  }
  .flex-column {
    flex-flow: column;
  }
  .app-container {
    padding: 2rem;
  }
  .el-dialog {
    margin: 0 45rem;
  }
  .oppa-column-style {
    flex-flow: column;
  }
  /*fade-transform*/
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

  /*slide-transform*/
.slide-transform-leave-active,
.slide-transform-enter-active {
  transition: all .4s;
}
.slide-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}
.slide-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.full-weight {
    width: 100%;
}
.white-letter {
  color: #FAFAFA;
}
</style>