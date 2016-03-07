<template>
  <div class="col col-12">
    <div class="col col-2">

      <!--Layout select-->
      <select name="layouts" v-model="page.layout" class="col col-12 border-none p0" :class="{ 'bg-silver': page === selected, 'bg-white': page !== selected }">
        <option v-for="layout in layouts" :value="layout">{{ layout }}</option>
      </select>
    </div>

    <div class="col col-2">
      <!--Name-->
      <input type="text" v-model="page.name" @keyup="page.slug = page.name" name="name" class="border-none bold p0" placeholder="Enter name" :class="{ 'bg-silver': page === selected, 'bg-white': page !== selected }">
    </div>

    <div class="col col-2">
      <!--Slug-->
      <input type="text" v-model="page.slug | slugify 'page.name'" name="slug" class="border-none p0" :class="{ 'bg-silver': page === selected, 'bg-white': page !== selected }">
    </div>

    <div class="col col-right">

      <!--Countries-->
      <country-picker
        :countries.sync="countries"
        :whitelist="['gb','us']"
        :preselect="page.countries">
      </country-picker>

      <!--Languages-->
      <language-picker
        :languages.sync="languages"
        :whitelist="['British English','American English']"
        :selected="page.language">
      </language-picker>

      <!--Lock-->
      <div v-show="page.locked" class="col orange border circle mr1 p1 pointer muted" title="Locked by another user">&#128274;</div>

      <!--Create / Update-->
      <button
        v-show="!page.id"
        @click.prevent="this.$emit('create-page')"
        class="btn btn btn-outline green px0 small unbold">
        Create
      </button>

      <button
        v-show="page.id"
        @click.prevent="this.$emit('update-page', page)"
        class="btn btn-primary small unbold">
        Update
      </button>

      <!--Content-->
      <a v-show="page.id" @click.prevent="this.$emit('show-modal')" :class="{ 'muted': !page.content.length }" class="btn border rounded small unbold mr1 orange">Content</a>
      <!--Preview-->
      <a v-show="page.id" :href="routes.previewPage + '/' + page.slug" :class="{ 'muted': !page.content.length }" class="btn border rounded small unbold mr1" target="_blank">Preview</a>
      <!--Toggle active-->
      <a v-show="page.id" href="#" @click.prevent="this.$emit('toggle-active')" :class="{ 'muted': !page.content.length && page.active }" class="btn border rounded small unbold {{ page.active ? 'green' : 'red' }}">{{ page.active ? 'Active' : 'Inactive' }}</a>
      <!--Delete-->
      <a v-show="!page.deleted_at" href="#" @click.prevent="this.$emit('delete-page')" class="btn btn-border red" title="Delete">&times;</a>
      <a v-show="page.deleted_at" href="#" @click.prevent="this.$emit('restore-page')" class="btn btn-border blue" title="Restore">&#10559;</a>

    </div>

    <div class="clearfix"></div>
    <div v-show="!page.id" class="col col-right">
      <button @click.prevent="this.$emit('remove-page')" class="col col-right mt1 block btn border rounded">&minus;</button>
    </div>

  </div>
</template>

<script>
  import CountryPicker from './../Countries/CountryPicker'
  import LanguagePicker from './../LanguagePicker'
  export default {
    props: [
      'page',
      'routes',
      'countries',
      'languages',
      'layouts',
      'views',
      'selected'
    ],
    components: {
      'country-picker': CountryPicker,
      'language-picker': LanguagePicker
    }
  }
</script>
