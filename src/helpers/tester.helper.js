import Promise from 'bluebird'
import _ from 'lodash'
import config from '../config'

import FileHelper from './file.helper'
import NicknameHelper from './nickname.helper'
import RequestHelper from './request.helper'
import DebugHelper from './debug.helper'

// Import testers files
const { importDefaultByFilename } = require('../helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')

// Last tester call, in order to prevent spam
let lastTester = 'none'

// Load data file with savec result from last usage
let data = FileHelper.getData()

// List of nickname to test, fill by client script
const nicknameList = []

const run = () => {
    // Add any new nickname from client script to nicknameList arr
    NicknameHelper.getNew(nicknameList)

    // If no new nickname to test, just wait
    if (nicknameList.length === 0) { return console.debug('Waiting for new nickname..') }

    // Extract new nickname and call testNickname()
    const nickname = nicknameList.pop()
    return testNickname(nickname)
}

const testNickname = async nickname => {
    // Turn the Tester object into an array, usable by bluebird
    const TestersArr = []
    _.forEach(Testers, (tester, name) => {
        TestersArr.push({ name, ...tester, })
    })

    // Execute the test of each Tester from @TesterArr
    await Promise.each(TestersArr, async ({name, url, isAvailable, retry = config.retry}) => {

        console.debug(`\n ===[ ${name} - ${nickname} - retry ${retry} ]===`)

        // Test for this plateform and this nickname already done before
        const currResult = _.get(data, `${nickname}.${name}`, 'fail')
        if (currResult !== 'fail') { return console.debug('- Test result already saved') }

        // Too many retry
        if (retry < 1) { return console.debug(`- Retry abord, too many fails (${config.retry})`) }

        // sleep if previous test is similar to this one
        if (lastTester === name) {
            console.debug(`- Force sleep 1sc (repeated test)`)
            await DebugHelper.sleep(config.sleepBeforeRetry)
        }
        lastTester = name

        // Replace the nickname in the url from tester
        const urlWithNickname = url.replace('[nickname]', nickname)
        
        // Request the html content from the tester url
        console.debug(`- Request html for: ${urlWithNickname}`)
        const html = await RequestHelper.get(urlWithNickname)

        // Execute the function isAvailable() from the tester
        const result = await isAvailable(html)
        console.debug(`- Result is ${result}`)

        if (![
            'fail',
            'yes',
            'no',
        ].includes(result)) {
            return console.debug('- Result value is wrong, check tester file!')
        }

        // Set the result and save in file
        _.set(data, `${nickname}.${name}`, result)
        FileHelper.updateData(data)

        if (result === 'fail') {
            console.debug('- Planning a retry')
            return TestersArr.push({ name, url, isAvailable, retry: retry - 1 })
        }


      }, { concurrency: 1 })
}

export default { run }
