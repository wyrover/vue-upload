import Ajax from './Resources'

export default {
  get (route, data, options) { Ajax.get(route, data, options) },
  post (route, data, options) { Ajax.post(route, data, options) },
  put (route, data, options) { Ajax.put(route, data, options) },
  patch (route, data, options) { Ajax.patch(route, data, options) },
  destroy (route, data, options) { Ajax.destroy(route, data, options) },
  jsonp (route, data, options) { Ajax.jsonp(route, data, options) }
}
