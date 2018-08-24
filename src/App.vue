<template>
<el-container id="app-container">
  <router-view/>
</el-container>  
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
    }
  }
</script>
<style>
  html,body {
    overflow: hidden;
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
  .app-container {
    padding: 2rem;
  }
  .el-dialog {
    margin: 0 45rem;
  }
  /*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .45s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
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
</style>