import Ajax from './Resources'

export default {
  fetch: {
    views (route) { return Ajax.get(route) },
    layouts (route) { return Ajax.get(route) },
    pages (route) { return Ajax.get(route) },
    content (route) { return Ajax.get(route) },
    countries (route) { return Ajax.get(route) },
    references (route) { return Ajax.get(route) },
    resources (route) { return Ajax.get(route) }
  },
  put: {
    reference (route) { return Ajax.put(route) }
  }
}
