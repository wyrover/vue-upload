<template>
  <div class="col-sm-4 col-sm-offset-4 py2">

    <p>Change your user profile details here.</p>

    <!--gravatar-->
    <gravatar-component
      class="block m2"
      :email="emailNew"
      :circle="true"
      :height="100"
      :width="100">
    </gravatar-component>

    <!--is-this-you?-->
    <div v-show="user.email !== emailNew" class="col-1 m2 border border-silver rounded p1 mx-auto">
      <div v-show="user.email !== emailNew" class="bold blue" transition="bounce">Is this you?</div>
      <button @click="this.$emit('reset-email-field')" class="btn btn-outline border-silver rounded m1 red">&cross;</button>
      <button @click="this.$emit('apply-email-change')" class="btn btn-outline border-silver rounded m1 green">&check;</button>
    </div>

    <!--errors-->
    <div class="red" v-if="error">
      <p>{{ error }}</p>
    </div>

    <!--user profile info form container-->
    <div class="relative mx-auto">

      <!--change email address-->
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          :value="user.email"
          v-model="emailNew"
          debounce="800"/>
        <span v-show="emailCorrectlySet" class="bold green absolute top-0 right-0">&check;</span>
      </div>

      <!--enter old password-->
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your old password"
          v-model="passwordOld" />
      </div>

      <!--enter new password-->
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your new password"
          v-model="passwordNew" />
      </div>

      <!--confirm password-->
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Confirm your new password"
          v-model="passwordConfirm" />
      </div>

      <!--update button-->
      <button
        :disabled="!canUpdate"
        :class="{ 'bg-gray': !canUpdate }"
        class="btn btn-primary m1"
        @click="this.$emit('login', credentials)">
        Update
      </button>

    </div>
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
    },
    events: {
      'apply-email-change' () {
        this.$set('emailCorrectlySet', true)
      },
      'reset-email-field' () {
        this.$set('emailNew', this.user.email)
      }
    }
  }
</script>
