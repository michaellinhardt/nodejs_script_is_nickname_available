import RequestHelper from '../helpers/request.helper'

const
  url = 'http://cactus.tools/twitch/username?username=[nickname]',
  no = /<strong>NOT<\/strong>/i,
  yes = /is available/i,

  run = async (nickname) => {
    const urlWithNickname = url.replace('[nickname]', nickname)
    const html = await RequestHelper.get(urlWithNickname)

    if (html.search(no) > -1) {
      return 'no'
    } else if (html.search(yes) > -1) {
      return 'yes'
    }
    return 'fail'

  }

export default { run }
