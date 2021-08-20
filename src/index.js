/**
 * Run it and input the nicknames to test
 */

// Needed package
import Promise from 'bluebird'
import Readline from 'readline'
import _ from 'lodash'

import config from './config'

// Import every file from testers folder, into an object
const { importDefaultByFilename } = require('./helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')
const Helpers = importDefaultByFilename('../helpers', '.helper')

const nicknameList = require('./nicknameList').default
// const nicknameList = []

// Create an insance of Readline to catch input and send output
const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// stats calculation
const stats = {
    countStart: nicknameList.length,
    timeStart: -1,
    totalTesters: 0
}
_.forEach(Testers, (_tester, _name) => stats.totalTesters += 1)
stats.countStart = stats.countStart * stats.totalTesters


const displayStats = () => {
    if (stats.timeStart === -1) { stats.timeStart = Helpers.date.timestamp() }
    stats.countDone = stats.countStart - (nicknameList.length * stats.totalTesters )
    stats.timeSpend = Helpers.date.timestamp() - stats.timeStart
    stats.perSecDone = stats.countDone / stats.timeSpend
    stats.countRemaining = nicknameList.length * stats.totalTesters
    stats.timeRemaining = nicknameList.length * stats.totalTesters * stats.perSecDone
    stats.display = `
    Uptime: ${Math.ceil(stats.timeSpend/60)} mins, Done: ${Math.ceil(stats.countDone/stats.totalTesters)}/${Math.ceil(stats.countStart/stats.totalTesters)}
    Remain: ${Math.ceil(stats.countRemaining/stats.totalTesters)} in ${Math.ceil(stats.timeRemaining/60)} mins ( ${Math.ceil(stats.perSecDone * 60)} per mins )`

    console.debug(stats.display)
}

// Decoration
console.debug('Welcome!\n- CTRL + C to leave\n- Enter to start\n')

// Remember what is the last test executed, will sleep for 1 sec if the same test occurs in a row
let last = 'none'

// Load Result file
let finalResult = Helpers.file.loadResult()


/**
 * Test the nickname with every testers
 * 
 * @param {string} nickname Nickname to be test
 */
const testIt = async () => {

    const nickname = nicknameList.pop()
    if (!nickname) {
        return endOfTest()
    }



    // Turn the Tester object into an array, usable by bluebird
    const TestersArr = []
    _.forEach(Testers, (tester, name) => {
        TestersArr.push({ name, ...tester, })
    })

    // Execute the test of each Tester from @TesterArr
    await Promise.each(TestersArr, async ({name, url, isAvailable, retry = config.retry}) => {

        console.debug(`\n ===[ ${name} - ${nickname} - retry ${retry} ]===`)

        // Test for this plateform and this nickname already done before
        if (finalResult && finalResult[nickname] && finalResult[nickname][name] && finalResult[nickname][name] !== 'fail') {
            stats.countStart = stats.countStart - 1
            return console.debug('- Test result already saved')
        }

        // Too many retry
        if (retry < 1) {
            return console.debug(`- Retry abord, too many fails (${config.retry})`)
        }

        // sleep if previous test is similar to this one
        if (last === name) {
            console.debug(`- Force sleep 1sc (repeated test)`)
            // await Helpers.debug.sleep(400)
        }

        // save name of current test
        last = name

        // Replace the nickname in the url from tester
        const urlWithNickname = url.replace('[nickname]', nickname)
        
        // Request the html content from the tester url
        console.debug(`- Request html for: ${urlWithNickname}`)
        const html = await Helpers.request.get(urlWithNickname)

        // Execute the function isAvailable() from the tester
        console.debug(`- Check if available`)
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
        _.set(finalResult, `${nickname}.${name}`, result)
        Helpers.file.storeResult(finalResult)

        // Display result
        displayResult()

        if (result === 'fail') {
            console.debug('- Planning a retry')
            return TestersArr.push({ name, url, isAvailable, retry: retry - 1 })
        }


      }, { concurrency: 1 })

      return endOfTest()

}

const endOfTest = () => {
    Helpers.file.storeResult(finalResult)
    displayResult()
    return nicknameList.length > 0 ? testIt() : readyToStart()
}

const displayResult = (skipStats = false) => {
    const resultOnly = {}
    const availableOnly = {}
    _.forEach(finalResult, (tests, nickname) => {
        resultOnly[nickname] = 'yes'
        _.forEach(tests, (isAvailable, _name) => {
            if (isAvailable === 'no' || isAvailable === 'fail') { resultOnly[nickname] = 'no' }
        })
        if (resultOnly[nickname] === 'yes') { availableOnly[nickname] = 'yes' }
    })
    // console.debug('\n ===[ Result Detailed ]===')
    // console.debug(prettyjson.render(finalResult))
    // console.debug('\n ===[ Result Final ]===')
    // console.debug(prettyjson.render(resultOnly))
    console.debug('\n ===[ Result Available Only ]===')
    // console.debug(prettyjson.render(availableOnly))
    const availableOnlyArr = []
    _.forEach(availableOnly, (_bool, nickname) => availableOnlyArr.push(nickname))
    console.debug(availableOnlyArr.join(', '))
    if (!skipStats) { displayStats() }
}

const readyToStart = () =>
    readline.question("Ready to start ?", testIt)


displayResult(true)
// if (nicknameList.length > 0) {
//     testIt()
// }
readyToStart()

