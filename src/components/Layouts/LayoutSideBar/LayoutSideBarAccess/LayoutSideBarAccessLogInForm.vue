<template>
    <el-form label-position="top" ref="form" :model="form" label-width="120px" class="centered is-flex">
        <h1>Access</h1>
        <el-form-item label="User">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">Access</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data: () => ({
    form: {
      userName: '',
      password: ''
    }
  }),
  methods: {
    onSubmit () {
      this.$store.dispatch('logInOut').then(() => {
        this.$router.push({ path: '/Home' })
      })
    }
  }
}
</script>

<style>

</style>
