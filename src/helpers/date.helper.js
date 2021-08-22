/**
 * Helper for data and time
 */

import moment from 'moment'

export default {
  timestamp: () => parseInt(moment().format('X'), 10),
  timestampMs: () => Date.now(),
}
