import { reject } from 'bluebird';
import request from 'request'

export default {

    /**
     * Retrieve the html content of a page
     * @param {string} url http path to access
     * @returns html content of the given url
     */
    get: url => new Promise(resolve => {
        request(url, (error, response, body) => !error ? resolve(body) : reject(error))
    }),
}
