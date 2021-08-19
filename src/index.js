/**
 * Run it and input the nicknames to test
 */

import Readline from 'readline'

import twitch from './testers/twitch.tester'

// Create an insance of Readline to catch input and send output
const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.debug('Welcome! CTRL + C to leave\n')

const testIt = async input => {

    await twitch(input)

    askNextNickname()
}

const askNextNickname = () =>
    readline.question("What nickname to test: ", testIt)

askNextNickname();

