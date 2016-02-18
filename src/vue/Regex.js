export default {
  dates: {
    months: /((jan|febr?)(uar[yi])?|(mar(ch)?)|m(aa)?rt|apr(il)?|may|mei|jun[ei]?|jul[yi]?|aug(ust(us)?)?|o[ck]t(ober)?|(sept?|nov|dec)(ember)?)/i,
    isoDates: /(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
  },
  urls: {
    urlMatch: /((https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/
  },
  references: {
    findReferenceIds: /^\s*(\d)\.*\s*/,
    findReferenceContent: /^[•\s\t]*.+$/,
    findAvailableAt: /(\s*available at:.*$)/i,
    findAccessedAtDate: /(accessed\s+(\w+)\s+(19|20\d\d))/i,
    findWhole: /{([0-9]+)}/gm,
    findList: /{[1-9]+(?:(,){1}[1-9]+)+}+/g,
    findRange: /{[0-9]+(-)[0-9]+}/gm
  }
}

