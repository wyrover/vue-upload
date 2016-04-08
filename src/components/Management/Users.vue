<template>
  <div>
    <table class="left-align">
      <thead>
        <th v-for="column in columns" class="p2">{{ column | capitalize }}</th>
      </thead>
      <tbody>
        <tr v-for="user in users" class="p2">
          <td class="p2">{{ user.id }}</td>
          <td class="p2">{{ user.email }}</td>
          <td class="p2">{{ user.firstName }}</td>
          <td class="p2">{{ user.lastName }}</td>
          <td class="p2">{{ user.joined }}</td>
          <td class="p2">{{ user.updated }}</td>
          <td class="p2">
            <tooltip-component hint="Manage this user's roles" placement="top">
              <span slot="html">
                <button @click="manageRoles" class="btn rounded blue">manage</button>
              </span>
            </tooltip-component>
          </td>
          <td class="p2">
            <tooltip-component hint="Manage this user's permissions" placement="top">
              <span slot="html">
                <button @click="managePermissions" class="btn rounded blue">manage</button>
              </span>
            </tooltip-component>
          </td>
          <td class="p2">
            <tooltip-component hint="View invites made by this user" placement="top">
              <span slot="html">
                <button @click="viewUserInvites" class="btn rounded blue">view</button>
              </span>
            </tooltip-component>
          </td>
          <td class="p2 center">
            <!--gravatar-->
            <gravatar-component
              :email="user.email"
              :circle="true"
              :height="50"
              :width="50">
            </gravatar-component>
          </td>
          <td class="p2">
            <tooltip-component hint="Deactivate this user (this CAN be undone)" placement="top" level="warning">
              <span slot="html">
                <button @click="deactivate" v-if="!user.deactivated" class="btn rounded h2 blue">&times</button>
              </span>
            </tooltip-component>
          </td>
          <td class="p2">
            <button class="btn rounded blue">edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Gravatar from '../../components/Gravatar'

  export default {
    components: {
      'gravatar-component': Gravatar
    },
    data () {
      return {
        columns: ['id', 'email', 'first name', 'last name', 'joined', 'updated', 'roles', 'permissions', 'invites', 'gravatar']
      }
    },
    props: {
      'users': { type: Array, required: true }
    }
  }
</script>
