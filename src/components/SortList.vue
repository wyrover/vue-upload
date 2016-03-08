<template>
  <div>
    <ul id="sort" class="sort row list-reset">
      <li class="sort-item cf row-item" v-for="item in list">
        <span class="sort-drag gray">&equals;</span>
        <span class="row-title ml2">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  var Sortable = require('sortable')
  export default {
    props: ['list'],
    ready () {
      var vm = this
      Sortable = new Sortable().create(document.getElementById('sort'), {
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
        this.list.splice(newIndex, 0, this.list.splice(oldIndex, 1)[0])
        this.list.forEach(function (item, index) {
          item.order = index
        })
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
    height: 40px;
    line-height: 40px;
    font-size: 26px;
    width: 20px;
    opacity: 0.3;
  }
  .sort-ghost {
    opacity: 0.1;
  }

</style>