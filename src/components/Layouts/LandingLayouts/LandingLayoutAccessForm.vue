<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center class="oppa-column-style">
          <img src="@/assets/logo_dark.jpg" alt="" srcset="" style="width: 60%; padding-bottom: 2rem;">
             <v-form class="app-access-form" ref="form" v-model="valid">
                  <v-text-field :rules="usernameRules" dark v-model="form.username" prepend-icon="person" name="login" label="Login" type="text" required></v-text-field>
                  <v-text-field :rules="passwordRules" dark v-model="form.password" id="password" prepend-icon="lock" name="password" label="Password" type="password" required></v-text-field>
                    <v-alert
                    :value="isUserValid"
                    type="error"
                    transition="scale-transition"
                  >
                    {{ error }}
                  </v-alert>
                  <v-layout justify-center>
                      <v-btn color="primary" :disabled="isFetching" :loading="isFetching" @click="onSubmit()">Login</v-btn>
                  </v-layout>
                </v-form>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    isUserValid: false,
    isFetching: false,
    form: {
      username: '',
      password: ''
    },
    usernameRules: [
      v => !!v || 'the username is required'
    ],
    passwordRules: [
      v => !!v || 'the password is required'
    ],
    error: ''
  }),
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        this.isFetching = true
        this.isUserValid = false
        this.$store.dispatch('userLogIn', this.form).then(() => {
          this.$router.push({ path: '/app' })
          this.isFetching = true
        }).catch((error) => {
          this.isFetching = false
          this.isUserValid = true
          this.error = error
        })
      }
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
