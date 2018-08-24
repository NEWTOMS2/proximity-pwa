<template>
    <div class="app-content">
      <h2>{{ key }}</h2>
        <router-view :key="key"/>
    </div>
</template>

<script>
export default {
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style>

</style>
