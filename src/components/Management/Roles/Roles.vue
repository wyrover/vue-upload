<template>
  <span v-for="role in roles">

    <tooltip-component :hint="role.name | capitalize" :muted placement="top">
      <span slot="html">

        <role-component
          :slug="role.slug"
          :selected="userInRole(role)"
          :name="role.name"
          :permissions="role.permissions">
        </role-component>

      </span>
    </tooltip-component>

  </span>
</template>

<script type="text/babel">
  import Role from './Role'
  export default {
    components: {
      'role-component': Role
    },
    props: {
      'roles': { type: Array, required: true },
      'userRoles': { type: Array, required: true }
    },
    methods: {
      userInRole (role) {
        return Boolean(this.userRoles.filter(function (userRole) {
          return role.slug === userRole.slug
        }).length)
      }
    }
  }
</script>
