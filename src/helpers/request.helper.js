import { reject } from 'bluebird';
import request from 'request'

export default {
    get: url => new Promise(resolve => {
        request(url, (error, response, body) => !error ? resolve(body) : reject(error))
    }),
}
