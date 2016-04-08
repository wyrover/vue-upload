<template>
  <div>
    <table class="left-align">
      <thead>
        <th v-for="column in columns" class="p2">{{ column | capitalize }}</th>
      </thead>
      <tbody>
        <tr v-for="invite in invites" class="p2">
          <td class="p2">{{ id }}</td>
          <td class="p2">{{ initiator }}</td>
          <td class="p2">{{ recipient }}</td>
          <td class="p2">{{ comment }}</td>
          <td class="p2">{{ hash }}</td>
          <td class="p2">{{ sent }}</td>
          <td class="p2">{{ accepted }}</td>
          <td class="p2">{{ created }}</td>
          <td class="p2">
            <button @click="manageRoles" class="btn rounded blue">manage</button>
          </td>
          <td class="p2">
            <button @click="managePermissions" class="btn rounded blue">manage</button>
          </td>
          <td class="p2">
            <button @click="viewUserInvites" class="btn rounded blue">view</button>
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
        columns: ['id', 'initiator', 'recipient', 'comment', 'link', 'sent', 'accepted', 'created', 'permissions']
      }
    },
    props: {
      'invites': { type: Array, required: true }
    }
  }
</script>
