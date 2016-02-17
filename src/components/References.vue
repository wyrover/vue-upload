<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<div class="border">

    <div style="max-height: 400px; overflow-y: scroll; padding-bottom: 0.5rem">
        <!--Tabs-->
        <tabs>
            <tab header="Content references">

                <div v-if="sharedState.getSelectedContent().references.length">

                    <!--
                    Clear all
                    -->
                    <button v-show="sharedState.getSelectedContent().references.length"
                            @click.prevent="clear()"
                            class="right btn small mr1">
                        Clear all
                    </button>

                    <!--
                    Associate all
                    -->
                    <button v-show="sharedState.getSelectedContent().references.length"
                            @click.prevent="associate(sharedState.getSelectedContent())"
                            class="right btn btn-primary small mr1">
                        Associate references with this content
                    </button>

                    <!--
                    Search (references)
                    -->
                    <input v-model="searchReferencesQuery"
                           class="right center mr1"
                           type="text"
                           name="search"
                           placeholder="&#128269; Search&hellip;"
                           style="border: none">

                    <div class="col col-12 p2">

                        <!--
                        v-for all references in selectedContent
                        ( n.b. sets Selected Reference on @click )
                        -->
                        <div v-for="reference in sharedState.getSelectedContent().references | filterBy searchReferencesQuery | orderBy 'no'"
                             @click="setSelected(reference)"
                             @keyup.esc="content.editing = false"
                             class="col col-12 border-bottom py1 mb1 small"
                             :class="{ 'border-blue': reference === sharedState.state.selectedReference }">

                            <!--
                            Reference No.
                            -->
                            <div v-show="!reference.editing"
                                    v-html="reference.no"
                                 class="col p1 bold">
                            </div>

                            <!--
                            Display reference content
                            -->
                            <div v-show="!reference.editing"
                                 class="col ml1 p1 col-8 pointer">
                                {{ reference.content + ' ' + (reference.url ? reference.url : '') }}
                                <!--
                                Update accessed at date
                                -->
                                <a v-bind:href="reference.url"
                                   v-show="!reference.editing && reference.url"
                                   @click="updateAccessedAt(reference)"
                                   class="blue pointer"
                                   target="_blank">access this link</a>
                            </div>

                            <!--
                            Actions
                            -->
                            <div class="col col-right">

                                <!--Edit-->
                                <button v-show="!reference.editing"
                                        @click="setEditing(reference)"
                                        class="btn blue pointer">
                                    Edit
                                </button>

                                <!--Finished editing-->
                                <a v-show="reference.editing"
                                   @click="reference.id ? update(reference) : create($index) | debounce"
                                   class="btn blue pointer"
                                   target="_blank">
                                    Finished editing
                                </a>

                                <!--Cancel editing-->
                                <a v-show="reference.editing"
                                   @click="cancelEditing(reference)"
                                   class="btn red pointer"
                                   target="_blank">
                                    Cancel
                                </a>

                                <!--Insert a {reference} into the content-->
                                <a v-show="!reference.editing"
                                   @click.prevent="this.$dispatch('insert-reference', reference)"
                                   class="btn green pointer">
                                    Insert
                                </a>

                                <!--destroy-->
                                <a v-show="!reference.editing && reference.id"
                                   @click.prevent="destroy(reference)"
                                   class="btn red pointer">
                                    Delete
                                </a>

                            </div>

                            <!--Edit reference controls-->
                            <div v-show="reference.editing">

                                <!--Editing - Reference No.-->
                                <input type="text"
                                       v-show="reference.editing"
                                       v-model="reference.no"
                                       class="col bold blue border-none p1"
                                       style="max-width: 3em">
                                </input>

                                <!--Editing - Reference Content-->
                                <textarea name="content"
                                          v-el="contentInput"
                                          class="col col-8 border-none ml1 mb1 p1 blue"
                                          v-model="reference.content" v-focus-auto>
                                </textarea>

                                <div class="clearfix"></div>

                                <div v-show="reference.material_type === 'website'">
                                    <!--Editing - Reference URL-->
                                    <label for="url" class="col p1 bold">Link:</label>

                                    <input type="text"
                                           id="url"
                                           class="col col-4 border-none ml1 mb1 blue"
                                           v-model="reference.url">
                                    </input>
                                </div>

                                <div v-show="reference.material_type === 'website'">
                                    <!--Editing - Reference URL-->
                                    <label for="accessed_at" class="col p1 bold">Website accessed:</label>

                                    <input type="text"
                                           id="accessed_at"
                                           class="col col-2 border-none ml1 mb1 blue"
                                           v-model="reference.accessed_at">
                                    </input>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>
                <div class="p2" v-else>
                    <div class="clearfix"></div>
                    <p>No references. Add some by selecting them in the editor and pressing
                        <a @click.prevent="" class="p1 bg-blue white rounded">Ctrl-Shift-F</a>
                    </p>
                </div>
            </tab>
        </tabs>

    </div>
</div>
</template>

<script>
    var _ = require('underscore');

    import Tab  from './Tab.vue';
    import Tabs from './Tabset.vue';

    import * as VueFocus from 'vue-focus';

    export default {
        components: {
            'tab' : Tab,
            'tabs': Tabs
        },
        props: [
            'shared-state',
            'routes',
            'references',
            'show'
        ],
        data: function () {
            return {
                searchReferencesQuery: '',
                focused: 0
            }
        },
        mixins: [ VueFocus.mixin ],
        methods: {
            setSelected(reference) {
                this.sharedState.setSelectedReference(reference);
            },
            updateAccessedAt(reference) {
                //confirm("Was the source accurate? Accept this message to update the Website Accessed date")
            },
            setEditing(reference) {
                this.sharedState.enableEditing(reference);
                // Set dirty state
                reference.dirty = false;
                // Set an object to keep changes for rollback if necessary
                reference.clean = {};
                reference.clean.no = reference.no;
                reference.clean.content = reference.content;
                reference.clean.url= reference.url;

                if(reference.editing) {
                    //this.$dispatch('messenger-notify', { content: `Hit 'Finished editing' to save this reference`, type: 'info' });
                }
            },
            contentContainsReference(reference) {
                return _.where(this.sharedState.state.selectedContent, { id: reference.id }).length;
            },
            clear() {
                if(confirm("Are you sure you want to clear all the references from this content?")) {
                    this.sharedState.getSelectedContent().references = [];
                }
            },
            cancelEditing(reference) {
                if(confirm("Are you sure you want to cancel editing?\nAny changes you have made to this reference will be discarded.")) {
                    // Restore original values
                    reference.no      = reference.clean.no;
                    reference.content = reference.clean.content;
                    reference.url     = reference.clean.url;
                    // And cancel editing
                    this.sharedState.disableEditing(reference);
                }
            },
            removeReference(index) {
                this.references.splice(index, 1)
            },
            addReferenceToContent(reference) {
                this.sharedState.getSelectedContent().references.push(reference)
            },
            create(index) {
                var self = this;
                self.sharedState.disableEditing(self.sharedState.getSelectedReference());
                Ajax.put(this.routes.createReference, JSON.stringify(self.references[index])).then(function (response) {
                    var data = response.data;
                    self.$dispatch('fetch');
                    self.$dispatch('messenger-notify', { content: `Created reference: ${data.no}`, type: 'success' });
                }, function (response) {
                    self.$dispatch('messenger-notify', { content: "Failed creating reference, please try again", type: 'error' });
                });
            },
            update(reference) {
                var self = this;
                if(confirm("Save changes?")) {
                    this.sharedState.disableEditing(reference);
                    Ajax.patch(`${this.routes.updateReference}/${reference.id}`, JSON.stringify(reference)).then(function (response) {
                        var data = response.data;
                        self.$dispatch('fetch');
                        self.$dispatch('messenger-notify', { content: `Updated reference: ${data.no}`, type: 'success' });
                    }, function (response) {
                        self.$dispatch('messenger-notify', { content: "Failed updating reference, please try again", type: 'error' });
                    });
                }
            },
            associate(content){
                console.log('associate');
                var self = this;
                console.log(content);
                Ajax.patch(`${this.routes.associateReferences}/${content.id}`, JSON.stringify(content)).then(function (response) {
                    var data = response.data;

                    console.log(data);
                    self.sharedState.setSelectedContent(data);

                    self.$dispatch('fetch');
                    self.$dispatch('messenger-notify', { content: `Added references to content`, type: 'success' });
                }, function (response) {
                    self.$dispatch('messenger-notify', { content: "Failed adding references to content, please try again", type: 'error' });
                });
            },
            destroy(reference) {
                var self = this;
                var selectedContentReferences = this.sharedState.getSelectedContent().references;

                Ajax.delete(`${this.routes.deleteReference}/${reference.id}`, JSON.stringify(reference)).then(function (response) {

                    var data = response.data;
                    // Loop through references in selectedContent and remove deleted

                    if( _.where(selectedContentReferences, { id: reference.id }).length) {
                        selectedContentReferences.$remove(reference)
                        console.log('removed deleted reference')
                    }

                    self.$dispatch('fetch');
                    self.$dispatch('messenger-notify', { content: `Deleted reference: ${data.no}`, type: 'success' });
                }, function (response) {
                    self.$dispatch('messenger-notify', { content: "Failed deleting reference, please try again", type: 'error' });
                });
            }
        }
    }
</script>