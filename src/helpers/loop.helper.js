const { loopInterval } = require('../config').default

/**
 * Execute the callback function, sleep for the loopInterval and repeat
 * @param {function} callback run callback at each turn
 */
const run = async (callback, interval = null) => {
  const inter = interval || loopInterval
  await callback()
  setTimeout(() => run(callback, inter), inter)
}

export default { run }
