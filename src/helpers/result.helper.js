import _ from 'lodash'
import FileHelper from './file.helper'
import NicknameHelper from './nickname.helper'

// Import Testers files
const { importDefaultByFilename } = require('./import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')

const display = () => {
  // configNickname
  const data = FileHelper.getData()
  const availableList = []

  _.forEach(data, (testResults, nickname) => {
    let available = true
    _.forEach(Testers, (_test, testName) => {
      const testResult = _.get(testResults, testName, 'fail')
      if (testResult !== 'yes') { available = false }
    })

    // if (available) {
    //   availableList.push(nickname)
    // }
    if (available && NicknameHelper.isValidNickname(nickname, [])) {
      availableList.push(nickname)
    }
  })

  // const availableString = availableList.join(' - ')

  console.debug('\n\n\n=== [ AVAILABLE NICKNAMES ] ===')

  _.forEach(availableList, name => {
    process.stdout.write(`${name} - `)
  })

  // console.debug(availableString)
  console.debug(availableList.length)
}

export default { display }
