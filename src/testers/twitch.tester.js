import debug from '../helpers/debug.helper'

export default {
    url: 'http://twitch.tv/[nickname]',
    isAvailable: async html => {
        console.debug('start test', html)
        await debug.sleep(2000)
        console.debug('end test')
    },
}
