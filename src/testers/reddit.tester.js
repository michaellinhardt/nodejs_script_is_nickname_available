// import fs from 'fs'
import BrowserHelper from '../helpers/browser.helper'

const
  browsingTest = false,
  url = 'http://reddit.com/user/[nickname]',

  run = async (nickname) => {
    const urlWithNickname = url.replace('[nickname]', nickname)
    const html = await BrowserHelper.get(urlWithNickname)

    const searchFor = new RegExp(`u/${nickname}`, 'i')

    if ((html.search(searchFor) > -1
    && html.search(/karma/i) > -1)

    || (html.search(/deleted/i) > -1
    && html.search(/account/i) > -1)

    || (html.search(/suspended/i) > -1
    && html.search(/account/i) > -1)) {
      return 'no'

    } else if (html.search(/nobody/i) > -1
    && html.search(/incorrect/i) > -1) {
      return 'yes'
    }

    // fs.writeFileSync('./fail-reddit.html', html)

    return 'fail'

  }

export default { run, browsingTest }
