export default {
  ADD_CONTENT (state, content) {
    console.log('add_content: ' + content)
    state.content.unshift({
      // text: text,
      // done: false
    })
  },
  DELETE_CONTENT (state, content) {
    console.log('delete_content: ' + content)
    state.content.$remove(content)
  },
  TOGGLE_CONTENT (state, content) {
    console.log('toggle_content: ' + content)
    content.done = !content.done
  },
  EDIT_CONTENT (state, content, text) {
    console.log('edit_content: ' + content)
    content.text = text
  }
}
