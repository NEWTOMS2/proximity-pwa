<template>
    <el-row class="app-layout">
        <el-col 
        :span="6" 
        class="flex side-app">
            <layout-side-bar/>
        </el-col>
        <el-col 
        :span="18" 
        >
        <layout-content/>
        </el-col>
    </el-row>
</template>

<script>
import LayoutSideBar from '@/components/Layouts/LayoutSideBar'
import LayoutContent from '@/components/Layouts/LayoutContent'
export default {
  components: { LayoutSideBar, LayoutContent }
}
</script>

<style>
.app-layout {
    min-width: 100vw;
    display: flex;
}
.side-app {
    min-width: 395px!important;
}
</style>
