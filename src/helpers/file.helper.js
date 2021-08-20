import fs from 'fs'

const path = './src/result.json'

const storeResult = (data, retry = 3, err = null) => {
    if (retry < 1) {
        return console.debug('\n\n /!\\ FAILED TO SAVE RESULT JSON /!\\', err)
    }

    try {
        fs.writeFileSync(path, JSON.stringify(data))

    } catch (err) { return storeResult(data, (retry - 1), err) }
}

const loadResult = (retry = 3, err = null) => {
    if (retry < 1) {
        console.debug('\n\n /!\\ FAILED TO READ RESULT JSON /!\\', err)
        return process.exit(1)
    }

    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'))

    } catch (err) { return loadResult(retry - 1, err) }
}

export default {
    storeResult,
    loadResult,
}
