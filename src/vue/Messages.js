export default {
  fetch: {
    success (name) {
      return `Fetched ${name}.`
    },
    failure (name) {
      return `Failed fetching ${name}. Please try refreshing the page, or contact your systems administrator if you experience further issues.`
    }
  },
  views: {
    create: {
      success: '',
      failure: ''
    },
    update: {
      success: '',
      failure: ''
    },
    delete: {
      success: '',
      failure: ''
    }
  },
  pages: {
    fetch: {
      failure: 'Failed fetching pages. Please contact your systems administrator'
    }
  },
  layouts: {
    fetch: {
      failure: 'Failed fetching layouts. Please contact your systems administrator'
    }
  }
}

