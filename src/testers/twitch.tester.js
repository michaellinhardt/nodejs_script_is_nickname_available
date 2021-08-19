import debug from '../helpers/debug.helper'

export default async function (nickname) {
    console.debug(1)
    await debug.sleep(3000)
    console.debug(2)
}
