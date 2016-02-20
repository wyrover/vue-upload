export default {
  ADD_CONTENT (state, text) {
    state.content.unshift({
      text: text,
      done: false
    })
  },

  DELETE_CONTENT (state, content) {
    state.content.$remove(content)
  },

  TOGGLE_CONTENT (state, content) {
    content.done = !content.done
  },

  EDIT_CONTENT (state, content, text) {
    content.text = text
  },

  TOGGLE_ALL (state, done) {
    state.content.forEach((content) => {
      content.done = done
    })
  },

  CLEAR_COMPLETED (state) {
    state.content = state.content.filter(content => !content.done)
  }
}
