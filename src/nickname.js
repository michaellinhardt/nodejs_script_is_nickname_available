import _ from 'lodash'
import Promise from 'bluebird'

// Import every file from testers folder, into an object
const { importDefaultByFilename } = require('./helpers/import.helper').default
const Helpers = importDefaultByFilename('../helpers', '.helper')

// configNickname
let cfg = require('./configNickname').default

// Build sound array and nicknameListObj
const sounds = Helpers.nickname.buildSoundArr2()
const soundTotal = sounds.length ** cfg.maxNicknameLevels

const startGenerationCycle = async () => {

  // configNickname
  delete require.cache[require.resolve('./configNickname')]
  cfg = require('./configNickname').default

  const updateNicknameJson = async () => {

    // Build the list of nickname to transfer
    const newNickname = []
    _.forEach(nicknameListObj, (needTransfer, nickname) => {
      if (needTransfer) { newNickname.push(nickname) }
    })

    // Server didnt pickup yet the last nickname transmit
    if (Helpers.file.isFileNicknameJson()) {

      // We didnt reach the limit before need to reseed
      if (stats[0].goodNickname < cfg.rebuildSeedEvery
        && newNickname.length < cfg.waitServerForNickname) {
        return false
      }

      // Wait for server to free the target file where save nickname
      while (Helpers.file.isFileNicknameJson()) {
        // console.debug(`Waiting for server ( ${newNickname.length} new nicknames )..`)
        await Helpers.code.sleep(1000)
      }

    }

    // Transfer the nickname
    Helpers.file.updateNicknameJson(newNickname)

    // Tag as transfered
    _.forEach(newNickname, (nickname) => {
      nicknameListObj[nickname] = false
    })
  }

  const getSounds = () => {
    const cloneSounds = _.clone(sounds)
    for (let i = 0; i < cfg.howManySuffleSounds; i++) {
      Helpers.code.shuffleArray(cloneSounds)
    }
    return cloneSounds
  }

  const time = sec => sec < 60 ? `${sec} secs` : `${Math.ceil(sec / 60)} mins`

  const recordMonitoring = () => {
    _.forEach(stats, (stat) => {
      stat.timeCurr = Helpers.date.timestamp()
      stat.timeSpend = stat.timeCurr - stat.timeStart
      stat.soundRemain = stat.soundTotal - stat.soundDone
      stat.progress = 100 - (100 / stat.soundTotal * stat.soundRemain)
      stat.soundPerSec = stat.soundDone / stat.timeSpend
      stat.soundPerMin = stat.soundDone / stat.timeSpend * 60
      stat.timeRemain = stat.soundRemain * stat.soundPerSec
    })
  }

  const displayMonitoring = () => {
    if (cfg.silentMode) { return true }
    const currTimestamp = Helpers.date.timestampMs()
    const timeSinceLastRefresh = currTimestamp - lastDebugRefresh
    if (timeSinceLastRefresh < cfg.debugRefreshRate) { return false }
    lastDebugRefresh = currTimestamp

    const activites = []

    console.clear()
    // Order activities
    _.forEach(stats, stat => { activites[stat.level] = stat })

    _.forEach(activites, act => {
      if (act.level === 0) {
        console.debug('\n[ TOTAL ]')
      } else { console.debug(`\n[ LEVEL ${act.level} ]`) }

      console.debug(` Time/Remain: \t${time(act.timeSpend)}, \t${time(act.timeRemain)}`)
      console.debug(` Nick' Found: \t${act.soundDone} / ${act.soundTotal} \t( ${act.soundRemain} remain )`)
      // eslint-disable-next-line max-len
      console.debug(` Result: \t${act.badNickname} bad \t${act.alreadyNickname} alr. \t${act.goodNickname} good`)

      if (act.level === 0) {
        _.forEach(act.perlevel, (perLvl, lv) => {
          // eslint-disable-next-line max-len
          console.debug(` Result lv ${lv}: \t${perLvl.badNickname} bad \t${perLvl.alreadyNickname} alr. \t${perLvl.goodNickname} good.`)
        })
      }

      console.debug(` Progress: \t${act.progress.toFixed(1)} % ( ${act.soundPerSec} sounds per secs )`)

    })

    displayNickname()

  }

  const newMonitoring = (level) => {
    stats[level] = {}
    stats[level].level = level
    stats[level].timeStart = Helpers.date.timestamp()
    stats[level].soundTotal = sounds.length
    stats[level].soundDone = 0
    stats[level].badNickname = 0
    stats[level].goodNickname = 0
    stats[level].alreadyNickname = 0

    if (!stats[0].perlevel) { stats[0].perlevel = {} }
    if (!stats[0].perlevel[level]) {
      stats[0].perlevel[level] = {
        soundDone: 0,
        badNickname: 0,
        goodNickname: 0,
        alreadyNickname: 0,
      }
    }
  }

  const nicknameMonitoring = nickname => {
    lastNickname[nicknameMonitoringPos] = nickname
    if (nicknameMonitoringPos >= cfg.debugMaxNickOuput) {
      nicknameMonitoringPos = 0
    } else { nicknameMonitoringPos += 1 }
  }

  const nicknameStat = (level, label) => {
    stats[level][label] += 1
    stats[0][label] += 1
    stats[0].perlevel[level][label] += 1
  }

  const displayNickname = () => {
    console.debug('\n[ LAST NICKNAMES FOUND ]')
    const newLineEvery = cfg.debugMaxNickOuputPerLine
    let currPos = 0
    _.forEach(lastNickname, (nickname, index) => {
      currPos += 1
      if (currPos > newLineEvery) {
        process.stdout.write('\n')
        currPos = 1
      }
      if (index === nicknameMonitoringPos - 1) {
        process.stdout.write('.')
      }
      process.stdout.write(`${nickname}\t`)
    })
  }

  const buildNicknames = async (level = 1, startWith = '') => {
  // Recursion max level reach or string dont match with requirment
    if (level > cfg.maxNicknameLevels
        || (startWith.length > 0 && !Helpers.nickname.isValidWipNickname(startWith))) {
      return false
    }

    // Get a new suffled sound list
    const soundList = getSounds()

    // Activity monitoring
    newMonitoring(level)

    // For each sound
    await Promise.each(soundList, async (sound) => {
      if (stats[0].goodNickname >= cfg.rebuildSeedEvery) { return true }

      // Activity monitoring
      recordMonitoring()
      displayMonitoring()

      // Generate a new sound with the previous one (from recursion) and this one
      const current = `${startWith}${sound}`

      // If we didnt reach the max level of recursion, we start a new one
      if (level < cfg.maxNicknameLevels) {
        await buildNicknames(level + 1, current)
      }

      // For this current nickname generated, if match with requirment, save it
      if (Helpers.nickname.isValidNickname(current, nicknameListObj)) {

        if (Helpers.nickname.isTestedYet(current)) {
        // Activity monitoring
          nicknameStat(level, 'alreadyNickname')
        } else {
        // Since the server test only one nickname per 2sc or more, we dont need to go so fast
        // Slowing down the nickname generation to let the computer breath for other usage
          await Helpers.code.sleep(cfg.sleepAfterGood)

          // Save the nickname into an object to avoid double nickname
          nicknameListObj[current] = true

          // Activity monitoring
          nicknameStat(level, 'goodNickname')

          if (cfg.silentMode && cfg.silentModeButNickname) {
            console.debug(`[${(id += 1)}] ${current}`)
          }

          nicknameMonitoring(current)

          // Export nickname to the file dedicated for server usage (testing nickname)
          await updateNicknameJson()
        }

      } else {
      // Activity monitoring
        nicknameStat(level, 'badNickname')
      }

      // Activity monitoring
      nicknameStat(level, 'soundDone')

      // Do not change concurency because of updateNicknameJson writing into files
    }, { concurrency: 1 })

  }

  // Build sound array and nicknameListObj
  const sounds = Helpers.nickname.buildSoundArr2()

  // Nickname object to ensure no double nickname
  const nicknameListObj = {}

  // Activity monitoring
  let lastDebugRefresh = 0
  let nicknameMonitoringPos = 0
  let id = 0
  const stats = {}
  const lastNickname = []
  newMonitoring(0)
  stats[0].soundTotal = soundTotal

  // console.debug('- Start building nickname list')
  await buildNicknames()
}

Helpers.loop.run(startGenerationCycle, cfg.loopInterval)
// startGenerationCycle()
