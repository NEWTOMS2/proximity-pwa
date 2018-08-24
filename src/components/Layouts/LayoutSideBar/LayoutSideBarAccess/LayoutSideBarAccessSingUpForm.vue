<template>
    <el-form label-position="top" ref="form" :model="form" label-width="120px" class="centered is-flex">
        <h1>Register</h1>
        <el-steps :active="active" align-center finish-status="success">
            <el-step title="Personal"></el-step>
            <el-step title="User"></el-step>
            <el-step title="Location"></el-step>
        </el-steps>
        <el-form-item label="Activity name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
                <el-form-item label="Activity name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
                <el-form-item label="Activity name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
                <el-form-item label="Activity name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data: () => ({
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
  })
}
</script>

<style>

</style>
