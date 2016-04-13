<template>
  <div>
    <table class="left-align">
      <thead>
        <th v-for="column in columns" class="p2">{{ column | capitalize }}</th>
      </thead>
      <tbody>
        <tr v-for="group in groups" class="p2">
          <td class="p2">{{ group.name | capitalize }}</td>
          <td class="p2">{{ group.description }}</td>
          <td class="p2">
            <button class="btn rounded blue">edit</button>
          </td>
          <td class="p2">
            <button class="btn rounded blue">edit</button>
          </td>
          <td class="p2">
            <!--group invalidation tooltip-->
            <tooltip-component hint="Invalidate this group" placement="top">
              <span slot="html">
                <!--group invalidation button-->
                <!--only shown when group has not yet been accepted-->
                <button @click="invalidate" v-if="group.accepted_at" class="btn rounded h1 red">&times</button>
              </span>
            </tooltip-component>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: ['name', 'description']
      }
    },
    props: {
      groups: { type: Array, required: true }
    }
  }
</script>
