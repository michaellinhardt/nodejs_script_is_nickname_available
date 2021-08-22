/**
 * Helper for nickname
 */
import _ from 'lodash'
import FileHelper from './file.helper'
import CodeHelper from './code.helper'

// Import testers files
const { importDefaultByFilename } = require('../helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')

const cfg = require('../configNickname').default
const cfgMain = require('../config').default

/**
 * Verify if a nickname have already been tested,
 * Meaning it is inside the data file and already contain a result
 * to all tester file
 */
const isTestedYet = nickname => {
  // Load data file with savec result from last usage
  const data = FileHelper.getData()

  // If no data or no nickname data, it is not tested yet
  if (!data || !data[nickname]) { return false }

  // For each available test, verify
  _.forEach(Testers, (_tester, testName) => {

    // If the test result didnt exist or its fail, then this nickname isnt tested yet
    const testResult = data[nickname][testName]
    if (!testResult || testResult === 'fail') { return false }
  })

  return true
}

// Extract new nickname from client script and add it to the array
const getNew = nicknameList => {
  const nicknameLimit = cfgMain.nicknameConcurence * 3
  if (nicknameList.length >= nicknameLimit) {
    return false
  }

  // Load Result file
  const data = FileHelper.getData()

  const completedList = {}
  const failedList = {}
  _.forEach(data, (result, nickname) => {

    let completed = true
    _.forEach(Testers, (_test, name) => {
      const testResult = _.get(result, name, 'fail')
      if (testResult === 'fail') { completed = false }
    })

    // Test is already completed
    if (completed) {
      completedList[nickname] = true

    // Test not completed yet
    } else {
      let prioSayNo = false
      _.forEach(cfgMain.testerPrio, (testName) => {
        const testPrioResult = _.get(result, testName, 'fail')
        if (testPrioResult === 'no') { prioSayNo = true }
      })
      if (prioSayNo) {
        completedList[nickname] = true
      } else {
        failedList[nickname] = true
      }
    }

  })

  const newNickname = FileHelper.getNickname()

  _.forEach(failedList, (_bool, nickname) => {
    const alreadyListed = nicknameList.find(n => n === nickname)
    if (!alreadyListed) { nicknameList.unshift(nickname) }
  })

  _.forEach(newNickname, nickname => {
    if (!completedList[nickname]) {
      const alreadyListed = nicknameList.find(n => n === nickname)
      if (!alreadyListed) { nicknameList.push(nickname) }
    }
  })

}

/**
 * Used by nickname.js to know which one is already tested or not
 * Better to build a full list than check one by one, in this case
 */
const buildCompletedList = () => {
  // Load Result file
  const data = FileHelper.getData()

  const completedNickname = {}
  _.forEach(data, (result, nickname) => {
    let completed = true
    _.forEach(Testers, (_test, name) => {
      const testResult = _.get(result, name, 'fail')
      if (testResult === 'fail') { completed = false }
    })
    if (completed) { completedNickname[nickname] = true }
  })
  return completedNickname
}

// Verify if the length of sound or nickname is valid
const isSoundLength = sound =>
  sound.length >= cfg.soundLengthMin && sound.length <= cfg.soundLengthMax
const isNicknameLength = nickname =>
  nickname.length >= cfg.nicknameLengthMin && nickname.length <= cfg.nicknameLengthMax

// Verify if string do not start with a forbiden substring
const isGoodStart = str => {
  if (!cfg.useDontStartWith
    && !cfg.useDoStartWith) {
    return true
  }
  let goodStart = true

  if (cfg.useDontStartWith) {
    _.forEach(cfg.dontStartWith, forbid => {
      if (str.startsWith(forbid)) { goodStart = false }
    })
  }

  if (cfg.useDoStartWith && goodStart) {
    _.forEach(cfg.doStartWith, requir => {
      if (!str.startsWith(requir)) { goodStart = false }
    })
  }

  return goodStart
}

// Verify if string do not end with a forbiden substring
const isGoodEnd = str => {
  if (!cfg.useDontEndWith
    && !cfg.useDoEndWith) {
    return true
  }
  let goodEnd = true

  if (cfg.useDontEndWith) {
    _.forEach(cfg.dontEndWith, forbid => {
      if (str.endsWith(forbid)) { goodEnd = false }
    })
  }

  if (cfg.useDoEndWith && goodEnd) {
    _.forEach(cfg.doEndWith, requir => {
      if (!str.endsWith(requir)) { goodEnd = false }
    })
  }

  return goodEnd
}

// Return true if there is to much vowel in a row
const isConsonantMissing = str => {
  const strSplit = str.split('')
  let noConsonantSince = 0
  let isConsonantMissing = false

  _.forEach(strSplit, letter => {
    let currIsVowel = false
    _.forEach(cfg.vowel, v => { if (letter === v) { currIsVowel = true } })
    if (currIsVowel) {
      noConsonantSince += 1
    } else { noConsonantSince = 0 }
    if (noConsonantSince > cfg.consonantEvery) { isConsonantMissing = true }
  })
  return isConsonantMissing
}

// Return true if there is to much consonant in a row
const isVowelMissing = str => {
  const strSplit = str.split('')
  let noVowelSince = 0
  let isVowelMissing = false

  _.forEach(strSplit, letter => {
    let foundOne = false
    _.forEach(cfg.vowel, v => { if (letter === v) { foundOne = true } })
    if (!foundOne) {
      noVowelSince += 1
    } else { noVowelSince = 0 }
    if (noVowelSince > cfg.vowelEvery) { isVowelMissing = true }
  })
  return isVowelMissing
}

// Return true if this string have a letter in double
const isDoubleLetter = str => {
  if (cfg.allowDoubleLetter) { return false }
  const strSplit = str.split('')
  const objLetter = {}
  let isDouble = false
  _.forEach(strSplit, letter => {
    if (objLetter[letter]) {
      isDouble = true
      return true
    }
    objLetter[letter] = true
  })
  return isDouble
}

// Verify if the string is in the exclusive list
const isExclusive = str => {
  if (!cfg.useExclusiveList) { return true }
  let total = 0
  let countIt = 0
  let exclusive = false
  _.forEach(cfg.exclusiveList, arrSound => {
    total = arrSound.length
    countIt = 0
    _.forEach(arrSound, sound => {
      if (str.indexOf(sound) > -1) { countIt += 1 }
    })
    if (countIt >= total) { exclusive = true }
  })
  return exclusive
}

// Verify if the string is in the blacklisted list
const isBlackListed = str => {
  if (!cfg.useBlackListArr) { return false }
  let total = 0
  let countIt = 0
  let blacklisted = false
  _.forEach(cfg.blackListArr, arrSound => {
    total = arrSound.length
    countIt = 0
    _.forEach(arrSound, sound => {
      if (str.indexOf(sound) > -1) { countIt += 1 }
    })
    if (countIt >= total) { blacklisted = true }
  })
  return blacklisted
}

const isDoubleInarow = str => {
  if (cfg.allowDoubleLetterInarow) { return false }
  let last = ''
  let isDoubleInarow = false
  const splitStr = str.split('')
  _.forEach(splitStr, char => {
    if (char === last) { isDoubleInarow = true }
    last = char
  })
  return isDoubleInarow
}

// Verify if the sound is valid
const isValidSound = (sound, soundsObj = []) =>
  (isSoundLength(sound)
        && !isDoubleLetter(sound)
        && !isVowelMissing(sound)
        && !isConsonantMissing(sound)
        && !isBlackListed(sound)
        && !soundsObj[sound])

// Verify if the nickname is valid
const isValidNickname = (nickname, nicknameListObj = []) => {
  return (isGoodStart(nickname)
        && isGoodEnd(nickname)
        && isNicknameLength(nickname)
        && !isDoubleLetter(nickname)
        && !isVowelMissing(nickname)
        && !isConsonantMissing(nickname)
        && isExclusive(nickname)
        && !isBlackListed(nickname)
        && !nicknameListObj[nickname]
        && !isDoubleInarow(nickname))
}

// Verify if the nickname is valid
const isValidWipNickname = nickname =>
  (isGoodStart(nickname)
        && !isDoubleLetter(nickname)
        && !isVowelMissing(nickname)
        && !isConsonantMissing(nickname)
        && !isBlackListed(nickname)
        && !isDoubleInarow(nickname))

// eslint-disable-next-line no-unused-vars
const buildSoundArr = () => {
  const soundsObj = {}
  const addSound = sound =>
    isValidSound(sound, soundsObj) ? (soundsObj[sound] = true) : false

  _.forEach(cfg.left, l =>
    _.forEach(cfg.right, r => {
      addSound(`${l}${r}`)
    }))

  const sounds = []
  _.forEach(soundsObj, (_bool, sound) => sounds.push(sound))
  return sounds
}

const buildSoundArr2 = () => {
  // console.debug('- Start building sound list')
  const soundsObj = {}
  const addSound = sound =>
    isValidSound(sound, soundsObj) ? (soundsObj[sound] = true) : false

  for (let i = 0; i < cfg.howManySuffleSounds; i++) {
    CodeHelper.shuffleArray(cfg.sound_1)
    CodeHelper.shuffleArray(cfg.sound_2)
    CodeHelper.shuffleArray(cfg.sound_3)
  }

  _.forEach(cfg.sound_1, sound_1 => {
    _.forEach(cfg.sound_2, sound_2 => {
      _.forEach(cfg.sound_3, sound_3 => {
        const newSound = `${sound_1}${sound_2}${sound_3}`
        addSound(newSound)
      })
    })
  })

  const sounds = []
  _.forEach(soundsObj, (_bool, sound) => sounds.push(sound))

  for (let i = 0; i < cfg.howManySuffleSounds; i++) {
    CodeHelper.shuffleArray(sounds)
  }

  // console.debug('- Sound list build')
  // console.debug(sounds)
  return sounds
}

export default {
  getNew,
  isTestedYet,
  buildCompletedList,
  isSoundLength,
  isNicknameLength,
  isGoodStart,
  isGoodEnd,
  isVowelMissing,
  isConsonantMissing,
  isDoubleLetter,
  isExclusive,
  isBlackListed,
  isValidSound,
  isValidNickname,
  isValidWipNickname,
  buildSoundArr2,
}
