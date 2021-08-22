import fs from 'fs'
const { dataPath, nicknamePath } = require('../config').default

/**
 * Save the object data into a file
 * @param {object} data object data to save
 * @param {integer} retry number of retry if fail
 * @param {error_instance} err
 */
const updateData = (data, retry = 3, err = null) => {
  if (retry < 1) {
    return console.debug('\n\n /!\\ FAILED TO SAVE RESULT JSON /!\\', err)
  }

  try {
    fs.writeFileSync(dataPath, JSON.stringify(data))

  } catch (err) { return updateData(data, (retry - 1), err) }
}

/**
 * Retrieve the data from data file
 * @param {integer} retry number of retry if fail
 * @param {error_instance} err
 * @returns
 */
const getData = (retry = 3, err = null) => {
  if (retry < 1) {
    console.debug('\n\n /!\\ FAILED TO READ RESULT JSON /!\\', err)
    return process.exit(1)
  }

  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  } catch (err) { return getData(retry - 1, err) }
}

/**
 * Retrieve the nickname from client script
 * @param {integer} retry number of retry if fail
 * @param {error_instance} err
 * @returns
 */
const getNickname = (retry = 3, err = null) => {
  if (retry < 1) {
    console.debug('\n\n /!\\ FAILED TO READ NICKNAME JSON /!\\', err)
    fs.unlinkSync(nicknamePath)
    return []
  }

  // File doesnt exist yet, return empty array
  try {
    if (!fs.existsSync(nicknamePath)) { return [] }

  } catch (err) { return getNickname(retry - 1, err) }

  try {
    const newNickname = JSON.parse(fs.readFileSync(nicknamePath, 'utf8'))
    fs.unlinkSync(nicknamePath)
    if (newNickname.length > 0) {
      // console.debug(`\n[ RECEIVED ( ${newNickname.length} ) NEW NICKNAME ]`)
    }
    return newNickname

  } catch (err) { return getNickname(retry - 1, err) }
}

const isFileNicknameJson = () => fs.existsSync(nicknamePath)

const updateNicknameJson = (data, retry = 3, err = null) => {
  if (retry < 1) {
    return console.debug('\n\n /!\\ FAILED TO SAVE NICKNAME JSON /!\\', err)
  }

  try {
    fs.writeFileSync(nicknamePath, JSON.stringify(data))

  } catch (err) { return updateData(data, (retry - 1), err) }
}

export default {
  updateData,
  getData,
  getNickname,
  isFileNicknameJson,
  updateNicknameJson,
}
