import debug from '../helpers/debug.helper'

export default {
    url: 'http://instausername.com/availability?q=[nickname]',
    isAvailable: async html => {
        if (html.indexOf('is taken') > -1) {
            return 'no'
        } else if (html.indexOf('is free') > -1) {
            return 'yes'
        } else {
            return 'fail'
        }
    },
}
