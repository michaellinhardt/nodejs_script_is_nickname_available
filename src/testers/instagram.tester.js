export default {
  url: 'http://instausername.com/availability?q=[nickname]',
  isAvailable: html => {
    if (html.search(/is taken/i) > -1) {
      return 'no'
    } else if (html.search(/is free/i) > -1) {
      return 'yes'
    }
    return 'fail'

  },
}
