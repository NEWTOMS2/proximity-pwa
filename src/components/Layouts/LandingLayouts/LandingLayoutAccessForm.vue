<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center class="oppa-column-style">
          <img src="@/assets/logo_dark.jpg" alt="" srcset="" style="width: 60%; padding-bottom: 2rem;">
             <v-form class="app-access-form">
                  <v-text-field dark v-model="form.username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field dark v-model="form.password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                  <v-layout justify-center>
                      <v-btn color="primary" @click="onSubmit()">Login</v-btn>
                  </v-layout>
                </v-form>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),
  methods: {
    onSubmit () {
      this.$store.dispatch('userLogIn', this.form).then(() => {
        this.$router.push({ path: '/app' })
      })
    }
  }
}
</script>
yarn
<style>
.app-access-form {
    width: 75%;
    text-align: center;
}
.oppa-column-style{
  background: #3b444d;
  flex-flow: column;
}
</style>
