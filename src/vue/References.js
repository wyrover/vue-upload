import Regex from './Regex.js'

export default {
  parse (reference) {
    // Get the reference's ID as per pasted-in copy
    // Auto-insert full-stops after reference if not found?
    // ["1.	", "1"]
    var referenceNo = reference.match(Regex.references.findReferenceIds) ? reference.match(Regex.references.findReferenceIds) : null
    // ["http://www.site.com", "http://", "http"]
    var referenceUrl = reference.match(Regex.urls.urlMatch) ? reference.match(Regex.urls.urlMatch)[0] : null
    // ...
    var referenceAccessedAt =
      reference.match(Regex.references.findAccessedAtDate) ? `${reference.match(Regex.references.findAccessedAtDate)[2]} ${reference.match(Regex.references.findAccessedAtDate)[3]}` : null
    // Get all the content from this reference
    var referenceContent = reference.match(Regex.references.findReferenceContent) ? reference.match(Regex.references.findReferenceContent) : null
    // Remove the reference's id
    var referenceContentNoId = referenceContent[0].substring(referenceNo[0].length)
    // Strip all meta off leaving only the content
    var referenceContentNoMeta = referenceContentNoId.replace(Regex.references.findAvailableAt, '')
    return {
      no: referenceNo ? referenceNo[1] : null, // note this uses the numeric №. rather than the literal used above.
      url: referenceUrl ? referenceUrl : null,
      material_type: referenceUrl ? 'website' : 'book',
      accessed_at: referenceAccessedAt ? referenceAccessedAt : null,
      content: referenceContentNoMeta ? referenceContentNoMeta : null
    }
  }
}
