export default {
  url: 'http://cactus.tools/twitch/username?username=[nickname]',
  isAvailable: html => {
    if (html.search(/<strong>NOT<\/strong>/i) > -1) {
      return 'no'
    } else if (html.search(/is available/i) > -1) {
      return 'yes'
    }
    return 'fail'

  },
}
