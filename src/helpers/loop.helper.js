const { loopInterval } = require('../config').default

/**
 * Execute the callback function, sleep for the loopInterval and repeat
 * @param {function} callback run callback at each turn
 */
const run = async callback => {
    await callback()
    setTimeout(() => run(callback), loopInterval)
}

export default { run }
