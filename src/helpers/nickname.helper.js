/**
 * Helper for nickname
 */
import _ from 'lodash'
import FileHelper from './file.helper'

// Import testers files
const { importDefaultByFilename } = require('../helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')

const cfg = require('../configNickname').default

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
    const newNickname = FileHelper.getNickname()
    _.forEach(newNickname, nickname => {
        if (!isTestedYet(nickname)) {
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
const isSoundLength = sound => sound.length >= cfg.soundLengthMin && sound.length <= cfg.soundLengthMax
const isNicknameLength = nickname => nickname.length >= cfg.nicknameLengthMin && nickname.length <= cfg.nicknameLengthMax

// Verify if string do not start with a forbiden substring
const isGoodStart = str => {
    if (!cfg.useDontStartWith) { return true }
    let goodStart = true

    _.forEach(cfg.dontStartWith, forbid => {
        if (str.startsWith(forbid)) { goodStart = false } })

    return goodStart
}

// Verify if string do not end with a forbiden substring
const isGoodEnd = str => {
    if (!cfg.useDontEndWith) { return true }
    let goodEnd = true

    _.forEach(cfg.dontEndWith, forbid => {
        if (str.endsWith(forbid)) { goodEnd = false } })

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

// Verify if the sound is valid
const isValidSound = (sound, soundsObj) =>
    (isGoodStart(sound)
        && isGoodEnd(sound)
        && isSoundLength(sound)
        && !isDoubleLetter(sound)
        && !isVowelMissing(sound)
        && !isConsonantMissing(sound)
        && isExclusive(sound)
        && !isBlackListed(sound)
        && !soundsObj[sound])

// Verify if the nickname is valid
const isValidNickname = (nickname, nicknameListObj) => {
    const completedNickname = buildCompletedList()
    return (!completedNickname[nickname]
        && isGoodStart(nickname)
        && isGoodEnd(nickname)
        && isNicknameLength(nickname)
        && !isDoubleLetter(nickname)
        && !isVowelMissing(nickname)
        && !isConsonantMissing(nickname)
        && isExclusive(nickname)
        && !isBlackListed(nickname)
        && !nicknameListObj[nickname])
}

// Verify if the nickname is valid
const isValidWipNickname = nickname => 
    (isGoodStart(nickname)
        && !isDoubleLetter(nickname)
        && !isVowelMissing(nickname)
        && !isConsonantMissing(nickname)
        && !isBlackListed(nickname))

const buildSoundArr = () => {
    const soundsObj = {}
    const addSound = sound =>
        isValidSound(sound, soundsObj) ? ( soundsObj[sound] = true ) : false

    _.forEach(cfg.left, l =>
        _.forEach(cfg.right, r => {
            addSound(`${l}${r}`)
        }))

    const sounds = []
    _.forEach(soundsObj, (_bool, sound) => sounds.push(sound))
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
    buildSoundArr,
}
