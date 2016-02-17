<template>
  <div>
    <!--Messenger-->
    <messenger :content="messenger.content"
               :type="messenger.type"
               :theme="messenger.theme"
               :extra-classes="messenger.extraClasses"
               :show-close-button="messenger.showCloseButton">
    </messenger>

    <component
      @keyup.esc="this.$broadcast('close-modal')"
      :is="view"
      v-ref:dynamic-component
      :shared-state.sync="sharedState"
      :views.sync="views"
      :layouts.sync="layouts"
      :pages.sync="pages"
      :content.sync="content"
      :countries.sync="countries"
      :references.sync="references"
      keep-alive>
    </component>

  </div>
</template>

<script>
import Hello from './components/Hello'
import CodeMirror from './components/CodeMirror'
import Messenger from './components/Messenger'

export default {
  components: {
    Hello,
    'codemirror': CodeMirror,
    'messenger': Messenger
  },
  props: {

  }
}
</script>

<style>
  @import '../node_modules/ace-css/css/ace.min.css';

  body {
    font-family: Helvetica, sans-serif;
  }
</style>

