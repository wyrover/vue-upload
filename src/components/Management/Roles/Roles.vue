<template>
  <span>
    <span v-for="role in roles">
      <role-component
        @assign="associate(role)"
        @remove="remove(role)"
        :selected="userInRole(role)"
        :slug="role.slug"
        :name="role.name"
        :permissions="role.permissions">
      </role-component>
    </span>
  </span>
</template>

<script type="text/babel">
  import Role from './Role'
  import roles from '../../../roles/index'
  export default {
    components: {
      'role-component': Role
    },
    props: {
      'roles': { type: Array, required: true },
      'user': { type: Object, default: {}, required: true }
    },
    methods: {
      userInRole (role) {
        return Boolean(this.user.roles.filter(function (userRole) {
          return role.slug === userRole.slug
        }).length)
      },
      associate (role) {
        roles.assign(this, role, this.user)
      },
      remove (role) {
        roles.remove(this, role, this.user)
      }
    }
  }
</script>
