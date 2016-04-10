<template>
  <div>
    <!--tabs-->
    <tabs-component>
      <tab-component header="My profile">
        <div class="col col-12 p2">
          <h2>My profile</h2>

          <!--profile tab-->
          <div class="col-sm-4 col-sm-offset-4 py2">
            <p>Change your user profile details here.</p>

            <!--get gravatar tooltip-->
            <tooltip-component hint="Don't have a Gravatar? Click to get one at gravatar.com" placement="right">
              <span slot="html">

                <!--gravatar link-->
                <a href="http://gravatar.com" target="_blank">

                  <!--gravatar-->
                  <gravatar-component
                    class="m2"
                    :email="emailNew"
                    :circle="true"
                    :height="100"
                    :width="100">
                  </gravatar-component>

                </a>
              </span>
            </tooltip-component>

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

      <!--admin only area tab-->
      <!--<div v-if="user.super || user.admin">-->

        <tab-component header="Users">
          <div class="col col-12 p2">
            <h2>Users</h2>
            <users-component
              :users="dummyUsers">
            </users-component>
          </div>
        </tab-component>

        <tab-component header="Invites">
          <div class="col col-12 p2">
            <h2>View all invites</h2>
            <invites-component
              :invites="invites">
            </invites-component>
          </div>
        </tab-component>

      <!--</div>-->

    </tabs-component>

  </div>
</template>

<script>
  import Gravatar from '../Gravatar'
  import Tabs from '../Tabs/Tabset'
  import Tab from '../Tabs/Tab'
  import Users from './Users'
  import Invites from './Invites'

  export default {
    components: {
      'gravatar-component': Gravatar,
      'tabs-component': Tabs,
      'tab-component': Tab,
      'users-component': Users,
      'invites-component': Invites
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
      'user': { type: Object, required: true },
      'invites': { type: Array, required: true }
    },
    data () {
      return {
        dummyUsers: [
          { id: 1, email: 'purerizzo@gmail.com', firstName: 'Super', lastName: 'Dude', joined: '2016-04-07 12:57:01', updated: '2016-04-07 12:57:01', roles: ['Administrator', 'Super'], permissions: ['upload', 'user'] },
          { id: 2, email: 'purerizzo@gmail.com', firstName: 'Super', lastName: 'Dude', joined: '2016-04-07 12:57:01', updated: '2016-04-07 12:57:01', roles: ['Administrator', 'Super'], permissions: ['upload', 'user'] },
          { id: 3, email: 'purerizzo@gmail.com', firstName: 'Super', lastName: 'Dude', joined: '2016-04-07 12:57:01', updated: '2016-04-07 12:57:01', roles: ['Administrator', 'Super'], permissions: ['upload', 'user'] },
          { id: 4, email: 'purerizzo@gmail.com', firstName: 'Super', lastName: 'Dude', joined: '2016-04-07 12:57:01', updated: '2016-04-07 12:57:01', roles: ['Administrator', 'Super'], permissions: ['upload', 'user'] },
          { id: 5, email: 'purerizzo@gmail.com', firstName: 'Super', lastName: 'Dude', joined: '2016-04-07 12:57:01', updated: '2016-04-07 12:57:01', roles: ['Administrator', 'Super'], permissions: ['upload', 'user'] }
        ],
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
