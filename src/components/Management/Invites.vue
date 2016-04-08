<template>
  <div>
    <table class="left-align">
      <thead>
        <th v-for="column in columns" class="p2">{{ column | capitalize }}</th>
      </thead>
      <tbody>
        <tr v-for="invite in invites" class="p2">
          <td class="p2">{{ invite.id }}</td>
          <td class="p2">{{ invite.initiator }}</td>
          <td class="p2">{{ invite.recipient }}</td>
          <td class="p2">{{ invite.comment }}</td>
          <td class="p2"><a :href="invite.hash">{{ invite.hash }}</a></td>
          <td class="p2">{{ invite.sent_at }}</td>
          <td class="p2">{{ invite.accepted_at }}</td>
          <td class="p2">{{ invite.created_at }}</td>
          <td class="p2 center">
            <!--gravatar-->
            <gravatar-component
              :email="invite.recipient"
              :circle="true"
              :height="50"
              :width="50">
            </gravatar-component>
          </td>
          <td class="p2">
            <!--invite invalidation tooltip-->
            <tooltip-component hint="Invalidate this invite" placement="top">
              <span slot="html">
                <!--invite invalidation button-->
                <!--only shown when invite has not yet been accepted-->
                <button @click="invalidate" v-if="invite.accepted_at" class="btn rounded h1 red">&times</button>
              </span>
            </tooltip-component>
          </td>
          <td class="p2">
            <!--invite invalidation tooltip-->
            <tooltip-component hint="Resend this invite" placement="top">
              <span slot="html">
                <!--invite invalidation button-->
                <!--only shown when invite has not yet been accepted-->
                <button @click="invalidate" v-if="invite.accepted_at" class="btn rounded h1 green">&#128232;</button>
              </span>
            </tooltip-component>
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
        columns: ['id', 'initiator', 'recipient', 'comment', 'link', 'sent', 'accepted', 'created', 'gravatar']
      }
    },
    props: {
      'invites': { type: Array, required: true }
    }
  }
</script>
