<template>
  <div>
    <ul id="sort-{{ name | slugify }}" class="sort row list-reset">
      <li class="sort-item cf row-item" v-for="item in list | orderBy 'weight' ">
        <span class="sort-drag gray px2">&equals;</span>
        <span class="row-title ml2">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  var Sortable = require('sortablejs')
  export default {
    props: ['list', 'name'],
    ready () {
      var vm = this
      Sortable.create(document.getElementById(`sort-${this.name.trim().toLowerCase()}`), {
        draggable: 'li.sort-item',
        ghostClass: 'sort-ghost',
        animation: 80,
        onUpdate (e) {
          vm.reorder(e.oldIndex, e.newIndex)
        }
      })
    },
    methods: {
      reorder (oldIndex, newIndex) {
        var self = this
        this.list.splice(newIndex, 0, this.list.splice(oldIndex, 1)[0])
        this.list.forEach(function (item, index) {
          item.weight = index
        })
        self.$emit('sorted', self.list)
      }
    }
  }
</script>

<style>
  .sort-item:hover {
    cursor: move;
    opacity: 1;
    color: #bada55;
  }
  .sort-item:hover .sort-drag {
    opacity: 1;
  }
  .sortable-chosen {
    opacity: 0.5;
  }
  .sort-drag {
    opacity: 0.3;
  }
  .sort-ghost {
    opacity: 0.1;
  }

</style>
