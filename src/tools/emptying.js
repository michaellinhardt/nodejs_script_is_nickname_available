import _ from 'lodash'

const { importDefaultByFilename } = require('../helpers/import.helper').default
const Helpers = importDefaultByFilename('../helpers', '.helper')

const data = Helpers.file.getData()

let count = 0
_.forEach(data, (result, nickname) => {

  if (nickname.length < 6) {
    count += 1
    delete data[nickname]
  }

})

console.debug(count)

Helpers.file.updateData(data)
