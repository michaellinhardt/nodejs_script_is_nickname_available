import _ from 'lodash'
import Promise from 'bluebird'

// Import every file from testers folder, into an object
const { importDefaultByFilename } = require('./helpers/import.helper').default
const Helpers = importDefaultByFilename('../helpers', '.helper')

// configNickname
const cfg = require('./configNickname').default

const updateNicknameJson = () => {
    // We do not update thefile until the server copy its content and delete it
    if (Helpers.file.isFileNicknameJson()) { return false }

    const newNickname = []
    _.forEach(nicknameListObj, (needTransfer, nickname) => {
        if (needTransfer) {
            nicknameListObj[nickname] = false
            newNickname.push(nickname)
        }
    })

    Helpers.file.updateNicknameJson(newNickname)
}

// Build sound array and nicknameListObj
const sounds = Helpers.nickname.buildSoundArr()
const nicknameListObj = {}

const buildNicknames = async (level = 1, startWith = '') => {
    // console.debug('[NEW]', level, startWith)
    // Recursion max level reach or string dont match with requirment
    if (level > cfg.maxNicknameLevels
        || (startWith.length > 0 && !Helpers.nickname.isValidWipNickname(startWith))) {
            // console.debug('[NOPE]', level, startWith)
            return false
    }
    // Build nickname at this level and initiate a recursion if needed
    await Promise.each(sounds, async (sound) => {

        const current = `${startWith}${sound}`

        if (level < cfg.maxNicknameLevels) {
            await buildNicknames(level + 1, current)
        }

        if (Helpers.nickname.isValidNickname(current, nicknameListObj)) {
            await Helpers.debug.sleep(1000)
            console.debug('[YES]', current)
            nicknameListObj[current] = true
            updateNicknameJson()

        // } else { console.debug('[NOPE]', current) }
        } else { }

      }, { concurrency: 1 })

}

console.debug(`=== [ START BUILDING NICKNAME LIST ] ===`)
buildNicknames()