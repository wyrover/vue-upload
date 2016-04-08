<template>
  <div>
    <!--tabs-->
    <tabs-component>
      <tab-component header="My profile">
        <div class="col col-12 p2">
          <!--profile tab-->
          <div class="col-sm-4 col-sm-offset-4 py2">
            <p>Change your user profile details here.</p>

            <!--gravatar-->
            <gravatar-component
              class="m2"
              :email="emailNew"
              :circle="true"
              :height="100"
              :width="100">
            </gravatar-component>

            <!--is-this-you?-->
            <div v-show="user.email !== emailNew" class="col-1 animated m2 border border-silver rounded p1 mx-auto" transition="bounce">
              <div v-show="user.email !== emailNew" class="bold blue">Is this you?</div>
              <button @click="this.$emit('reset-email-field')" class="btn btn-outline border-silver rounded m1 red">&cross;</button>
              <button @click="setEmailCorrectlySet" class="btn btn-outline border-silver rounded m1 green">&check;</button>
            </div>

            <!--errors-->
            <div class="red" v-if="error">
              <p>{{ error }}</p>
            </div>

            <!--user profile info form container-->
            <div class="mx-auto">

              <!--change email address-->
              <div class="form-group">
                <input
                  @keyup="checkEmailCorrectlySet"
                  type="text"
                  class="form-control"
                  :class="{ 'border-green': emailCorrectlySet }"
                  :value="user.email"
                  v-model="emailNew"
                  debounce="800"/>
              </div>

              <!--enter old password-->
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'border-green': passwordOld.length }"
                  placeholder="Enter your old password"
                  v-model="passwordOld" />
              </div>

              <!--enter new password-->
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'border-green': passwordsMatch }"
                  placeholder="Enter your new password"
                  v-model="passwordNew" />
              </div>

              <!--confirm password-->
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'border-green': passwordsMatch }"
                  placeholder="Confirm your new password"
                  v-model="passwordConfirm" />
              </div>

              <!--update button-->
              <button
                :disabled="!formComplete"
                :class="{ 'bg-gray': !formComplete }"
                class="btn btn-primary m1"
                @click="this.$emit('login', credentials)">
                Update
              </button>

            </div>
          </div>
        </div>
      </tab-component>
      <tab-component header="Administration">
        <div class="col col-12 p2">
          <h4>Users</h4>
          <table>
            <thead></thead>
          </table>
          1	super@example.com	$2y$10$7EKaPDBS8Je/dctm8fLetu.X2Ktv11iqaIGC45UyCD4CFHT2V/v.m			Super	Man	2016-04-07 12:57:01	2016-04-07 12:57:01
          2	user@example.com	$2y$10$T9AnmPpMkJ2dsDK23KuSu.2/BacXrHUrGwt7UAw36g8h3j/a0DOfa			John	Doe	2016-04-07 12:57:01	2016-04-07 12:57:01

          <h4>Permissions</h4>
        </div>
      </tab-component>
    </tabs-component>

  </div>
</template>

<script>
  import Gravatar from '../Gravatar'
  import Tabs from '../Tabs/Tabset'
  import Tab from '../Tabs/Tab'

  export default {
    components: {
      'gravatar-component': Gravatar,
      'tabs-component': Tabs,
      'tab-component': Tab
    },
    computed: {
      'formComplete' () {
        return Boolean(
          this.passwordOld &&
          (this.passwordNew === this.passwordConfirm) && (this.passwordNew.length && this.passwordConfirm.length)
        )
      },
      'passwordsMatch' () {
        return Boolean(this.passwordNew === this.passwordConfirm) && (this.passwordNew.length && this.passwordConfirm.length)
      }
    },
    props: {
      'user': { type: Object, required: true }
    },
    data () {
      return {
        emailNew: '',
        passwordOld: '',
        passwordNew: '',
        passwordConfirm: '',
        emailCorrectlySet: true
      }
    },
    ready () {
      this.$set('emailNew', this.user.email)
      this.$set('emailCorrectlySet', true)
    },
    methods: {
      checkEmailCorrectlySet (email) {
        this.$set('emailCorrectlySet', email === this.user.email)
      },
      setEmailCorrectlySet () {
        this.$set('emailCorrectlySet', true)
      }
    },
    events: {
      'reset-email-field' () {
        this.$set('emailNew', this.user.email)
      }
    }
  }
</script>
