<template>
  <div class="col-sm-4 col-sm-offset-4 py2">
    <p>Change user details etc.</p>
    <gravatar-component
      :email="user.email"
      :circle="true">
    </gravatar-component>
    <div class="red" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        v-model="user.email" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your old password"
        v-model="user.passwordOld" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your new password"
        v-model="user.password" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Confirm your new password"
        v-model="user.passwordConfirm" />
    </div>
    <button class="btn btn-primary m1" @click="this.$emit('login', credentials)">Update</button>
  </div>
</template>

<script>
  import Gravatar from '../Gravatar'
  export default {
    components: {
      'gravatar-component': Gravatar
    },
    props: {
      'user': { type: Object, required: true }
    }
  }
</script>
