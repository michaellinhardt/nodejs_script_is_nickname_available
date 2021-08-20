import _ from 'lodash'
import prettyjson from 'prettyjson'

// Import every file from testers folder, into an object
const { importDefaultByFilename } = require('./helpers/import.helper').default
const Testers = importDefaultByFilename('../testers', '.tester')
const Helpers = importDefaultByFilename('../helpers', '.helper')

// Load Result file
const finalResult = Helpers.file.loadResult()
const completedNickname = {}

_.forEach(finalResult, (result, nickname) => {
    let completed = true
    _.forEach(Testers, (_test, name) => {
        if (!result[name] 
            || (result[name] !== 'yes'
            && result[name !== 'no'])) {
                completed = false
        }
    })
    if (completed) { completedNickname[nickname] = true }
})


const soundLengthMin = 1
const soundLengthMax = 6
const nicknameLengthMin = 5
const nicknameLengthMax = 6

const maxNicknameLevels = 4

const allowDoubleLetter = false

const useDontStartWith = true
const useDontEndWith = true

const dontStartWith = [
    // 'ba',
    // 'ca',
    // 'da',
    // 'fa',
    // 'ga',
    // 'ha',
    // 'ja',
    // 'ka',
    // 'la',
    // 'ma',
    // 'na',
    // 'pa',
    // 'qa',
    // 'ra',
    // 'sa',
    // 'ta',
    // 'va',
    // 'wa',
    // 'xa',
    // 'za',
    'by',
    'cy',
    'dy',
    'fy',
    'gy',
    'hy',
    'jy',
    'ky',
    'ly',
    'my',
    'ny',
    'py',
    'qy',
    'ry',
    'sy',
    'ty',
    'vy',
    'wy',
    'xy',
    'zy',
    'bi',
    'ci',
    'di',
    'fi',
    'gi',
    'hi',
    'ji',
    'ki',
    'li',
    'mi',
    'ni',
    'pi',
    'qi',
    'ri',
    'si',
    'ti',
    'vi',
    'wi',
    'xi',
    'zi',
]

const dontEndWith = [
    // 'a',
    'i',
    'y',
    'w',
]

const useExclusivelist = false
const exclusivelistArrayString = [
    ['mik'],
    ['cra'],
    ['tak'],
    ['wek'],
    ['war'],
    ['dix'],
    ['dax'],
    ['tri'],
    ['tra'],
    ['kro'],
    ['kra'],
]

const consonantEvery = 2
const vowelEvery = 2
const vowel = ['a', 'e', 'i', 'o', 'u', 'y']

const useBlacklist = true
const blacklistArrayString = [
    // double vowel
    ['ae'],
    ['ai'],
    ['ao'],
    ['au'],
    ['ay'],

    ['ea'],
    ['ei'],
    ['eo'],
    ['eu'],
    ['ey'],
    ['ia'],
    ['ie'],
    ['io'],
    ['iu'],
    ['iy'],
    ['oa'],
    ['oe'],
    ['oi'],
    ['ou'],
    ['oy'],
    ['ua'],
    ['ue'],
    ['ui'],
    ['uo'],
    ['uy'],
    ['ya'],
    ['ye'],
    ['yi'],
    ['yo'],
    ['yu'],
    ['ou'],
    ['ei'],
    ['ai'],
    ['oiw'],
    ['oe'],
    ['ae'],



    // vowel + consonant
    ['i', 'y'],
    ['oin'],
    ['eq'],
    ['fi'],
    ['ya'],
    ['fy'],
    ['py'],
    ['pi'],
    ['li'],
    ['ly'],
    ['ik'],
    ['udi'],
    ['ny'],
    ['ni'],
    ['my'],
    ['mi'],

    // double consonant
    ['kr', 'xt'],
    ['kfa'],
    ['akb'],
    ['kj'],
    ['kg'],
    ['kd'],
    ['nm'],
    ['mn'],
    ['xt'],
    ['xn'],
    ['xs'],
    ['xm'],
    ['rm'],
    ['rn'],
    ['kb'],
    ['kc'],
    ['xr'],
    ['xw'],
    ['xb'],
    ['rc'],
    ['ynx'],
    ['yk'],
    ['rx'],
    ['kp'],
    ['mx'],
    ['yx'],
    ['kmax'],
    ['gbw'],
    ['cr', 'xh'],
]

const isSoundLength = sound => sound.length >= soundLengthMin && sound.length <= soundLengthMax
const isNicknameLength = nickname => nickname.length >= nicknameLengthMin && nickname.length <= nicknameLengthMax

const isGoodStart = str => {
    if (!useDontStartWith) { return true }
    let goodStart = true

    _.forEach(dontStartWith, forbid => {
        if (str.startsWith(forbid)) {
            goodStart = false
        }
    })

    return goodStart
}

const isGoodEnd = str => {
    if (!useDontEndWith) { return true }
    let goodEnd = true

    _.forEach(dontEndWith, forbid => {
        if (str.endsWith(forbid)) {
            goodEnd = false
        }
    })

    return goodEnd
}

const isConsonantMissing = str => {
    const strSplit = str.split('')
    let noConsonantSince = 0
    let isConsonantMissing = false

    _.forEach(strSplit, letter => {
        let currIsVowel = false

        _.forEach(vowel, v => { if (letter === v) { currIsVowel = true } })

        if (currIsVowel) {
            noConsonantSince += 1
        } else { noConsonantSince = 0 }

        if (noConsonantSince > consonantEvery) { isConsonantMissing = true }

    })

    return isConsonantMissing
}

const isVowelMissing = str => {
    const strSplit = str.split('')
    let noVowelSince = 0
    let isVowelMissing = false

    _.forEach(strSplit, letter => {
        let foundOne = false

        _.forEach(vowel, v => { if (letter === v) { foundOne = true } })

        if (!foundOne) {
            noVowelSince += 1
        } else { noVowelSince = 0 }

        if (noVowelSince > vowelEvery) { isVowelMissing = true }

    })

    return isVowelMissing
}

// Return true if this string have a letter in double
const isDoubleLetter = str => {
    if (allowDoubleLetter) { return false }
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

const nicknameList = []
const nicknameListObj = {}

// Will compose sound that start with
const left = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'z',
    'br',
    'bl',
    'cl',
    'ch',
    'dr',
    'dj',
    'dh',
    'fr',
    'fl',
    'fh',
    'kr',
    'kw',
    'kl',
    'mh',
    'nh',
    'pr',
    'pl',
    'qr',
    'ql',
    'rh',
    'sl',
    'sc',
    'sk',
    'sm',
    'sn',
    'tr',
    'th',
    'vr',
    'vl',
    'vh',
    'wr',
    'wl',
    'wh',
    'zr',
    'zl',
    'zh',
    '',
    // 'al', 'el', 'il', 'ol', 'ul', 'yl',
    // 'am', 'em', 'im', 'om', 'um', 'ym',
    // 'an', 'en', 'in', 'on', 'un', 'yn',
    // 'ar', 'er', 'ir', 'or', 'ur', 'yr',
    // 'ar', 'er', 'ir', 'or', 'ur', 'yr',
]

// Will compose sound that end with
const right = [
    '',
    'a', 'e', 'i', 'o', 'u', 'y',
    'al', 'el', 'il', 'ol', 'ul', 'yl',
    'am', 'em', 'im', 'om', 'um', 'ym',
    'an', 'en', 'in', 'on', 'un', 'yn',
    'ar', 'er', 'ir', 'or', 'ur', 'yr',
    'ar', 'er', 'ir', 'or', 'ur', 'yr',
]

// Prepare empty sounds array
const sounds = []
const soundsObj = {}

const isExclusive = str => {
    if (!useExclusivelist) { return true }
    let total = 0
    let countIt = 0
    let exclusive = false
    _.forEach(exclusivelistArrayString, arrSound => {
        total = arrSound.length
        countIt = 0

        _.forEach(arrSound, sound => {
            if (str.indexOf(sound) > -1) {
                    countIt += 1
            }
        })

        if (countIt >= total) { exclusive = true }
    })

    return exclusive
}

const isBlackListed = str => {
    if (!useBlacklist) { return false }
    let total = 0
    let countIt = 0
    let blacklisted = false
    _.forEach(blacklistArrayString, arrSound => {
        total = arrSound.length
        countIt = 0

        _.forEach(arrSound, sound => {
            if (str.indexOf(sound) > -1) {
                    countIt += 1
            }
        })

        if (countIt >= total) { blacklisted = true }
    })

    return blacklisted
}

const isValidSound = sound =>
    (isGoodStart(sound) && isGoodEnd(sound) && isSoundLength(sound) && !isDoubleLetter(sound) && !isVowelMissing(sound) && !isConsonantMissing(sound) && isExclusive(sound) && !isBlackListed(sound) && !soundsObj[sound])

const addSound = sound => {
    if (isValidSound(sound)) {
        // console.debug(`add sound: ${sound}`)
        soundsObj[sound] = true
    } else {
        // console.debug(`nope sound: ${sound}`)
    }
}

// Compose sounds object
_.forEach(left, l =>
    _.forEach(right, r => addSound(`${l}${r}`)))

// Compose sounds array
_.forEach(soundsObj, (bool, sound) => sounds.push(sound))

const isValidNickname = nickname => 
    (!completedNickname[nickname] && isGoodStart(nickname) && isGoodEnd(nickname) && isNicknameLength(nickname) && !isDoubleLetter(nickname) && !isVowelMissing(nickname) && !isConsonantMissing(nickname) && isExclusive(nickname) && !isBlackListed(nickname) && !nicknameListObj[nickname])

const addNickname = nickname => {
    if (isValidNickname(nickname)) {
        // console.debug(`add nickname: ${nickname}`)
        nicknameListObj[nickname] = true
    } else {
        // console.debug(`nope nickname: ${nickname}`)
    }
}

const buildNicknames = (level = 1, startWith = '') => {

    if (level > maxNicknameLevels) { return true }

    if (startWith.length > 0 &&
        (isDoubleLetter(startWith)
        || completedNickname[startWith]
        || !isGoodStart(startWith) 
        || !isGoodEnd(startWith)
        || isVowelMissing(startWith)
        || isConsonantMissing(startWith)
        || !isExclusive(startWith)
        || isBlackListed(startWith))) {
            return false
    }

    _.forEach(sounds, sound => {

        const current = `${startWith}${sound}`

        if (level < maxNicknameLevels) {
            buildNicknames(level + 1, current)
        }

        addNickname(current)

    })

}

buildNicknames()

// Compose nicknameList array
_.forEach(nicknameListObj, (bool, nickname) => nicknameList.push(nickname))


console.debug(nicknameList.join(' - '))
console.debug(nicknameList.length)

export default nicknameList