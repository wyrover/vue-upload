<template>
  <div class="col-sm-4 col-sm-offset-4 py2">
    <p>Log in to your account below.</p>
    <div class="red" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password" />
    </div>
    <div class="form-group py2">
      <label class="col-1 p1 bg-gray white rounded h5">
        Remember me for next time
        <input type="checkbox" />
      </label>
    </div>
    <button class="btn btn-primary m1" @click="submit()">Access your account</button>
  </div>
</template>

<script>
import auth from '../../auth'

export default {
  data () {
    return {
      credentials: {
        email: 'admin@example.com',
        password: 'password123'
      },
      error: ''
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, false)
    }
  }
}
</script>
