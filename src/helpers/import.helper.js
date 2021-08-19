/**
 * Syntax helper to import entire folder of file
 */

import _ from 'lodash'
import requireDirectory from 'require-directory'

export default {

  /**
   * Build an object to access all exported method form each files into a folder.
   * Take all files into @path
   * Remove @extention from the file name, turn filename into camelCase
   * Create a property into @accumulator , using the file name,
   *  with the default imported content from this file.
   *
   * @param {string} path
   * @param {string} extention
   * @param {empty_object} accumulator
   * @returns {imported_folder}
   */
  importDefaultByFilename: (path, extention, accumulator = {}) => {

    /**
     * Lower every char of the string, upper case first char
     *
     * @param {string} string
     * @returns {string}
     */
    const firstCharUpper = string => {
      const lowered = string.toLowerCase()
      return lowered.charAt(0).toUpperCase() + lowered.slice(1)
    }
 
    /**
     * Turn a filename into camelCase.
     * ex. user.address.controller become userAddressController
     *
     * @param {string} filename filename
     * @returns camelCase string
     */
    const camelCaseFileName = filename => {
      const nameSplit = filename.split('.')
      const firstName = nameSplit.shift()
      const lastName = nameSplit
        .map(n => firstCharUpper(n))
        .join('')
      return `${firstName}${lastName}`
    }

    // For Each files into the given path
    _.forEach(requireDirectory(module, path), (fileContent, fileName) => {
      // Remove @extention from the filename
      const contentName = fileName.replace(extention, '')

      // Turn filename to camelCase
      const camelCaseName = camelCaseFileName(contentName)

      // add the default imported content from the file, into the accumulator
      accumulator[camelCaseName] = fileContent.default
    }, {})

    return accumulator
  },

}

