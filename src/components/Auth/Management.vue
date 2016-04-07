<template>
  <div class="col-sm-4 col-sm-offset-4 py2">
    <p>Change user details etc.</p>

    <!--gravatar-->
    <gravatar-component
      :email="emailNew"
      :circle="true">
    </gravatar-component>
    <div v-show="user.email !== emailNew" class="bold blue" transition="bounce">Is this you?</div>
    <!--errors-->
    <div class="red" v-if="error">
      <p>{{ error }}</p>
    </div>

    <!--profile info form-->
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :value="user.email"
        v-model="emailNew"
        debounce="800"/>
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your old password"
        v-model="passwordOld" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your new password"
        v-model="passwordNew" />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Confirm your new password"
        v-model="passwordConfirm" />
    </div>
    <button class="btn btn-primary m1" @click="this.$emit('login', credentials)">Update</button>
  </div>
</template>

<script>
  import Gravatar from '../Gravatar'
  export default {
    computed: {},
    components: {
      'gravatar-component': Gravatar
    },
    props: {
      'user': { type: Object, required: true }
    },
    data () {
      return {
        emailNew: '',
        passwordOld: '',
        passwordNew: '',
        passwordConfirm: ''
      }
    },
    ready () {
      this.$set('emailNew', this.user.email)
    }
  }
</script>
