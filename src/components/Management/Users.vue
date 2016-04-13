<template>
  <div>

    <select name="roles" v-model="selectedRole" class="col border-none" :class="{ 'bg-silver': role === selected, 'bg-white': role !== selected }">
      <option value="all" selected>All roles</option>
      <option v-for="role in roles" :value="role">{{ role.name }}</option>
    </select>

    <div class="clearfix"></div>

    <table class="left-align">
      <thead>
        <th v-for="column in columns" class="p2">{{ column | capitalize }}</th>
      </thead>
      <tbody>
        <tr v-for="user in users | orderBy 'email'" class="p2">
          <td class="p2">{{ user.email }}</td>
          <td class="p2">{{ user.first_name }}</td>
          <td class="p2">{{ user.last_name }}</td>
          <td class="p2">{{ user.created_at }}</td>
          <td class="p2">{{ user.updated_at }}</td>
          <td class="p2">

            <roles-component
              :user="user"
              :roles="roles">
            </roles-component>

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

<script type="text/babel">
  import Roles from '../Management/Roles/Roles'
  import Gravatar from '../../components/Gravatar'

  export default {
    components: {
      'roles-component': Roles,
      'gravatar-component': Gravatar
    },
    data () {
      return {
        columns: ['email', 'first name', 'last name', 'joined', 'updated', 'roles', 'permissions', 'invites', 'gravatar']
      }
    },
    props: {
      'users': { type: Array, required: true },
      'roles': { type: Array, required: true }
    }
  }
</script>
