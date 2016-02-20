<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/mode/overlay.js'
import 'codemirror/addon/runmode/runmode.js'
import 'codemirror/addon/runmode/colorize.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/gfm/gfm.js'

var CodeMirror = require('codemirror')

export default {
  replace: false,
  props: {
    model: '',
    height: 0,
    width: -1,
    theme: {required: false, type: String, default: 'monokai'},
    cursorPosition: {required: false, type: Number},
    mode: {required: false, type: String, default: 'gfm'}, // Default editor mode is Github Flavor Markdown
    lineNumbers: {required: false, type: Boolean, default: false},
    lineWrapping: {required: false, type: Boolean, default: true},
    matchBrackets: {required: false, type: Boolean, default: true}
  },
  events: {
    'insert-reference': function (reference) {
      // this.insertReference(reference)
    }
  },
  ready () {
    var self = this
    this.$nextTick(
      function () {
        CodeMirror = CodeMirror(self.$el, {
          mode: self.mode,
          theme: self.theme,
          lineNumbers: self.lineNumbers,
          lineWrapping: self.lineWrapping,
          matchBrackets: self.matchBrackets,
          extraKeys: {
            'Enter': 'newlineAndIndentContinueMarkdownList',

            // Save shortcut keys
            'Ctrl-S': function () {
              self.$dispatch('save-content')
              return false
            },
            'Cmd-S': function () {
              self.$dispatch('save-content')
              return false
            },
            'Shift-Ctrl-F': function (instance) {
              console.log('wut')
              // Batch-create references by selecting lines in the editor and then using keyboard shortcut Shift+Ctrl+F
              // This adds form elements used for adding these new references
              var selection = instance.getSelection()
              var lines = selection.match(/[^\r\n]+/g)
              // Iterate over each line of the selection
              lines.forEach(function (reference) {
                // self.$dispatch('add-reference-to-content', References.parse(reference))
              })
              return false
            }
          }
        })

        // Initially set cursor position
        self.$set('cursorPosition', CodeMirror.setCursor(1, 1))

        CodeMirror.on('change', function () {
          self.$set('model', CodeMirror.getValue())
          self.$set('cursorPosition', CodeMirror.getCursor())
          // Add { silent: true }  as 3rd arg?
        })
        CodeMirror.on('cursorActivity', function () {
          self.$set('cursorPosition', CodeMirror.getCursor())
        })
        // Set the initial value (or '' if model prop value is null)
        var code = self.$get('model') ? self.$get('model') : ''
        CodeMirror.setValue(code)
        this.$watch('model', function (value) {
          if (value !== CodeMirror.getValue()) {
            CodeMirror.setValue(value)
          }
        })
        // Set size
        CodeMirror.setSize(self.$get('width'), self.$get('height'))
        // As we've set some properties, refresh Codemirror
        CodeMirror.refresh()
      }
    )
  },
  methods: {
    // insertReference(reference) {
    //   // var referenceToInsert = `{${reference.no}}`
    //   // var referenceToInsert = `{${reference.no}}`
    //   // CodeMirror.replaceRange(referenceToInsert, this.cursorPosition, this.cursorPosition)
    // },
    setCursorPosition () {
      self.$set('cursorPosition', CodeMirror.getCursor())
    }
  }
}
</script>

<style scoped>


</style>
