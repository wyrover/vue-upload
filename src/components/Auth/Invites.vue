<template>
  <div class="col-sm-4 col-sm-offset-4 py2">
    <p class="gray">Click to save an invitation link to your clipboard</p>
    <textarea v-model="inviteLink" class="clipboard col-4 border-blue p2 m2 rounded"></textarea>
    <!--link-copied-to-clipboard notification-->
    <p v-show="inviteLinkCopied" class="animated mt0 p2 blue border-blue rounded" transition="bounce">Copied to clipboard!</p>
    <p class="gray">
      <em>Or&hellip;</em>
    </p>
    <input
      v-model="inviteEmailAddresses"
      class="mx-auto col-3 p2 m2 rounded border-blue p2 m2"
      placeholder="Enter the email address of the person(s) you would like to invite (separated by commas)" />
    <div>
      <textarea
        v-show="inviteEmailAddresses.length > 0"
        v-model="inviteComment"
        class="animated col-2 border-gray p2 m2 rounded"
        placeholder="Add a comment (optional)"
        transition="fade">
      </textarea>
    </div>
    <button @click="this.$emit('invite-users', this)" class="btn btn-primary">Invite user(s)</button>
  </div>
</template>

<script>
var Clipboard = require('clipboard')

export default {
  data () {
    return {
      inviteEmailAddresses: 'purerizzo@gmail.com, purerizzo@gmail.com',
      inviteComment: 'Hello there!',
      inviteLinkCopied: false
    }
  },
  props: { inviteLink: '' },
  ready () {
    var self = this
    var clipboard = new Clipboard('.clipboard', {
      text: function (trigger) {
        self.inviteLinkCopied = true
        return trigger.value
      }
    })
    if (this.showInviteModal) {
      clipboard.destroy()
    }
  }
}
</script>
