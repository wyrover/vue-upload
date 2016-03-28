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
    <button class="btn btn-primary m1" @click="this.$emit('login', credentials)">Access your account</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        email: 'super@example.com',
        password: 'password123'
      },
      error: ''
    }
  }
}
</script>
