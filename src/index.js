/**
 * Run it and input the nicknames to test
 */

// Needed package
import Promise from 'bluebird'
import Readline from 'readline'
import _ from 'lodash'

// Import every file from testers folder, into an object
const { importDefaultByFilename } = require('./helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')
const Helpers = importDefaultByFilename('../helpers', '.helper')

// Create an insance of Readline to catch input and send output
const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Decoration
console.debug('Welcome! CTRL + C to leave\n')

/**
 * Test the nickname with every testers
 * 
 * @param {string} nickname Nickname to be test
 */
const testIt = async nickname => {

    // Turn the Tester object into an array, usable by bluebird
    const TestersArr = []
    _.forEach(Testers, (tester, name) => {
        TestersArr.push({ name, ...tester, })
    })

    // Execute the test of each Tester from @TesterArr
    await Promise.each(TestersArr, async ({name, url, isAvailable}) => {

        // Replace the nickname in the url from tester
        const urlWithNickname = url.replace('[nickname]', nickname)

        // Request the html content from the tester url
        const html = await Helpers.request.get(url)

        // Execute the function isAvailable() from the tester
        const result = await isAvailable(html)

        console.debug(`${name}: ${result}`)

      }, { concurrency: 1 })


    // if (res && res.body) {

    // } else {

    // }


    askNextNickname()
}

const askNextNickname = () =>
    readline.question("What nickname to test: ", testIt)

askNextNickname();

