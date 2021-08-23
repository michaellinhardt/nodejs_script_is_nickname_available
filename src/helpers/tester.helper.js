import Promise from 'bluebird'
import _ from 'lodash'
import cfg from '../config'

import FileHelper from './file.helper'
import NicknameHelper from './nickname.helper'
import CodeHelper from './code.helper'
import DateHelper from './date.helper'

const ignoreTester = {}

// Import testers files
const { importDefaultByFilename } = require('../helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')

// Load data file with savec result from last usage
const data = FileHelper.getData()

// List of nickname to test, fill by client script
const nicknameList = []

const run = async () => {
  // Add any new nickname from client script to nicknameList arr
  NicknameHelper.getNew(nicknameList)

  // If no new nickname to test, just wait
  if (nicknameList.length === 0) {
    return console.debug('Waiting for new nickname..')
  }

  console.debug(`\n[ NEW LOOP, ${nicknameList.length} NICKNAME WAITING]\n`)

  const nicknameToTest = nicknameList.splice(cfg.nicknameConcurence * -1)

  CodeHelper.rorateIndex(cfg.testerPrio)

  // For each sound
  await Promise.map(
    nicknameToTest,
    testNickname,
    { concurrency: cfg.nicknameConcurence })

}

const runTest = async (nickname, { name, run, retry = cfg.retry, browsingTest = true }) => {

  if (browsingTest && cfg.skipBrowsingTest) {
    return true
  }

  const timestampMs = DateHelper.timestampMs()
  if (ignoreTester[name] && ignoreTester[name] > timestampMs) {
    const ignoreRemain = Math.ceil((ignoreTester[name] - timestampMs) / 1000)
    console.debug(`[ ${nickname} ] ${name}: ignore tester for ${ignoreRemain} secs`)
    return false
  }

  // Test for this plateform and this nickname already done before
  const currResult = _.get(data, `${nickname}.${name}`, 'fail')
  if (currResult !== 'fail') {
    console.debug(`[ ${nickname} ] ${name}: already saved ( ${currResult} )`)
    return currResult === 'yes'
  }

  // Too many retry
  if (retry < 1) {
    console.debug(`[ ${nickname} ] ${name}: too many retry!`)
    return false
  }

  const result = await run(nickname)

  console.debug(`[ ${nickname} ] ${name}: is available? ${result}`)

  if (![
    'fail',
    'yes',
    'no',
  ].includes(result)) {
    console.debug(`[ ${nickname} ] ${name}: result value error!`)
    return false
  }

  // Set the result and save in file
  _.set(data, `${nickname}.${name}`, result)
  FileHelper.updateData(data)

  // Add any new nickname from client script to nicknameList arr
  NicknameHelper.getNew(nicknameList)

  if (result === 'fail') {
    ignoreTester[name] = DateHelper.timestampMs() + cfg.ignoreTesterWhenFail
    console.debug(`[ ${nickname} ] ${name}: retry planned (sleep ${cfg.sleepAfterFail})..`)
    await CodeHelper.sleep(cfg.sleepAfterFail)
    return false
  }

  return result === 'yes'
}

const testNickname = async nickname => {
  // Turn the Tester object into an array, usable by bluebird
  const TestersArr = []
  const TesterPrio = []

  _.forEach(cfg.testerPrio, testName => {
    if (Testers[testName]) {
      TesterPrio.push({ name: testName, ...Testers[testName] })
    }
  })

  _.forEach(Testers, (tester, name) => {
    if (!TesterPrio.find(t => t.name === name)) {
      TestersArr.push({ name, ...tester })
    }
  })

  // Execute the priority test of each Tester from @TesterPrio
  let isFail = false
  await Promise.map(TesterPrio, async (tester) => {
    if (!isFail) {
      const resultTest = await runTest(nickname, tester)
      if (!resultTest) { isFail = true }
    }
  }, { concurrency: 1 })

  if (isFail) {
    console.debug(`[ ${nickname} ] Stop! priority test no good`)
    return false
  }

  // Execute the test of each Tester from @TesterArr
  await Promise.map(TestersArr, async (tester) => {
    if (!isFail) {
      const resultTest = await runTest(nickname, tester)
      if (!resultTest) { isFail = true }
    }
  }, { concurrency: 1 })
}

export default { run }
