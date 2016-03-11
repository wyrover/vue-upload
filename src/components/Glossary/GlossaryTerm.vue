<template>
  <div class="col col-12">
      <div class="col col-2 h5">
        <strong v-show="id">
          {{ word | capitalize }}
        </strong>
        <strong v-show="!id">
          <input type="text" v-model="word" placeholder="Enter a term"  class="border-none">
        </strong>
      </div>
      <div class="col col-2">
        <blockquote v-show="id" class="h5 mt0 mb0">
          &ldquo;{{{ definition | capitalize }}}&rdquo;
        </blockquote>
        <input v-show="!id" type="text" v-model="definition" placeholder="Enter a definition for this term" class="border-none">
      </div>
      <div class="col col-2">
        <blockquote v-show="id" class="h5 mt0 mb0">
          {{{ pronunciation }}}
        </blockquote>
        <input v-show="!id" type="text" v-model="pronunciation" placeholder="Pronunciation" class="border-none">
      </div>
      <div class="col col-2 h5">
        <div v-show="id">{{{ grammar | capitalize }}}</div>
        <input v-show="!id" type="text" v-model="grammar" placeholder="Grammar"  class="border-none">
      </div>
      <div class="col col-2">
        <a
          :href="soundbite"
          class="btn orange h2 unbold"
          :class="{ 'muted': !word }"
          title="Click to hear the term &lsquo;{{ word | capitalize }}&rsquo; spoken out loud"
          target="_blank">
          &#128266;
        </a>
      </div>
      <div class="right">
        <button v-show="id" @click.prevent="this.$emit('update')" class="btn btn-primary">Update</button>
        <button v-show="!id" @click.prevent="this.$emit('create')" class="btn btn-primary">Create</button>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'GlossaryTerm',
    props: [ 'id', 'word', 'definition', 'grammar', 'soundbite-lookup-url', 'soundbite-lookup-type', 'pronunciation' ],
    computed: {
      soundbite () {
        return this.soundbiteLookupUrl + this.word.toLowerCase() + this.soundbiteLookupType
      }
    }
  }
</script>
