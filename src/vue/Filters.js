var Vue = require('vue')
var marked = require('marked')

import Regex from './Regex'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
})

// Marked (markdown)
Vue.filter('marked', function (value) {
  if (value) {
    return marked(value)
  }
})

// Referenced ({n})
Vue.filter('referenced', function (value) {
  if (value) {
    var matches = value.replace(/{([0-9]+)+(,|-)*([0-9]+)*}/gm, '<sup><a href="#">$1</a></sup>')
    var regex = new RegExp(Regex.references.findList)
    var list
    var lists = []

    while ((list = regex.exec(value)) !== null) {
      var msg = 'Found ' + list[0] + '. '
      msg += 'Next match starts at ' + regex.lastIndex
      lists.push(list)
      matches = matches.replace(list[0], `<sup><a href="#">test</a></sup>`)
    }

    return matches
  }
})

// Reverse a string
Vue.filter('reverse', function (value) {
  return value.split('').reverse().join('')
})

// Reverse a string
Vue.filter('slugify', function (value) {
  return value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
})
/*

 Vue.filter('filterByIncludingNull', function (arr, search, delimiter) {
 arr = convertArray(arr);
 if (search == null) {
 return arr
 }
 if (typeof search === 'function') {
 return arr.filter(search)
 }
 // cast to lowercase string
 search = ('' + search).toLowerCase();
 // allow optional `in` delimiter
 // because why not
 var n = delimiter === 'in' ? 3 : 2;
 // extract and flatten keys
 var keys = toArray(arguments, n).reduce(function (prev, cur) {
 return prev.concat(cur)
 }, []);
 var res = [];
 var item, key, val, j;
 for (var i = 0, l = arr.length; i < l; i++) {
 item = arr[i];
 val = (item && item.$value) || item;
 j = keys.length;
 if (j) {
 while (j--) {
 key = keys[j];
 if ((key === '$key' && contains(item.$key, search)) ||
 contains(getPath(val, key), search)) {
 res.push(item);
 break
 }
 }
 } else if (contains(item, search)) {
 res.push(item)
 }
 }
 return res
 });
 */

