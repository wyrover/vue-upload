<script>

    var cm;

    export default {
        replace: false,
        props: {
            model: '',
            height: 700,
            width: -1,
            cursorPosition: { required: false, type: Number },
            mode:           { required: false, type: String,  default: 'gfm' }, // Default editor mode is Github Flavor Markdown
            lineNumbers:    { required: false, type: Boolean, default: false },
            lineWrapping:   { required: false, type: Boolean, default: true  },
            matchBrackets:  { required: false, type: Boolean, default: true  }
        },
        events: {
            'insert-reference': function (reference) {
                this.insertReference(reference);
            }
        },
        ready: function () {
            var self = this;
            this.$nextTick(
                function() {
                    cm = new CodeMirror(self.$el, {
                        mode: self.mode,
                        lineNumbers: self.lineNumbers,
                        lineWrapping: self.lineWrapping,
                        matchBrackets: self.matchBrackets,
                        //theme: 'base16-light',
                        extraKeys: {
                            "Enter": "newlineAndIndentContinueMarkdownList",

                            // Save shortcut keys
                            "Ctrl-S": function () { self.$dispatch('save-content'); return false; },
                            "Cmd-S":  function () { self.$dispatch('save-content'); return false; },
                            "Shift-Ctrl-F": function (instance) {
                                // Batch-create references by selecting lines in the editor and then using keyboard shortcut Shift+Ctrl+F
                                // This adds form elements used for adding these new references
                                var selection = instance.getSelection();
                                var lines = selection.match(/[^\r\n]+/g);

                                // Iterate over each line of the selection
                                lines.forEach(function (reference) {
                                    self.$dispatch('add-reference-to-content', References.parse(reference));
                                });

                                return false;
                            }
                        }
                    });

                    // Initially set cursor position
                    self.$set('cursorPosition', cm.setCursor(1,1));

                    cm.on('change', function () {
                        self.$set('model', cm.getValue());
                        self.$set('cursorPosition', cm.getCursor());
                        // Add { silent: true }  as 3rd arg?
                    });

                    cm.on('cursorActivity', function () {
                        self.$set('cursorPosition', cm.getCursor());
                    });

                    // Set the initial value (or "" if model prop value is null)
                    var code = self.$get('model') ? self.$get('model') : "";
                    cm.setValue(code);

                    this.$watch('model', function (value) {
                        if (value !== cm.getValue())
                            cm.setValue(value);
                    });

                    // Set size
                    cm.setSize(self.$get('width'), self.$get('height'));

                    // As we've set some properties, refresh Codemirror
                    cm.refresh();
                }
            );
        },
        methods: {
            insertReference(reference) {
                var referenceToInsert = `{${reference.no}}`;
                cm.replaceRange(referenceToInsert, this.cursorPosition, this.cursorPosition);
            },
            setCursorPosition() {
                self.$set('cursorPosition', cm.getCursor())
            }
        }
    }
</script>
