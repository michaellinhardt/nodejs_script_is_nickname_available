import _ from 'lodash'

const { importDefaultByFilename } = require('./helpers/import.helper').default
const Helpers = importDefaultByFilename('../helpers', '.helper')

const data = Helpers.file.getData()

_.forEach(data, (result, nickname) => {

  const twitch = _.get(result, '[twitch]', 'fail')
  const instagram = _.get(result, '[instagram]', 'fail')

  if (twitch === 'fail' || instagram === 'fail') {
    delete data[nickname]
  }

})

Helpers.file.updateData(data)
