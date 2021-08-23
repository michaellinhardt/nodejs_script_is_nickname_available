import BrowserHelper from '../helpers/browser.helper'

const
  browsingTest = true,
  url = 'http://twitter.com/[nickname]',

  run = async (nickname) => {
    const urlWithNickname = url.replace('[nickname]', nickname)
    const html = await BrowserHelper.browse(urlWithNickname)

    if ((html.search(/Joined/i) > -1
    && html.search(/Follow/i) > -1)
    || (html.search(/suspended/i) > -1
    && html.search(/violate/i) > -1)
    || (html.search(/Caution/i) > -1
    && html.search(/restricted/i) > -1)) {
      return 'no'

    } else if (html.search(/exist/i) > -1
    && html.search(/another/i) > -1) {
      return 'yes'
    }
    return 'fail'

  }

export default { run, browsingTest }
