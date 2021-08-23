import puppeteer from 'puppeteer'

(async function main () {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const [page] = await browser.pages()

    await page.goto('http://reddit.com/user/wynqaz', { waitUntil: 'networkidle0' })
    const data = await page.evaluate(() => document.querySelector('*').outerHTML)

    await browser.close()

    const nickname = 'wynqaz'
    const searchFor = new RegExp(`u/${nickname}`, 'i')

    console.debug(data)

    console.debug(data.search(searchFor) > -1)
    console.debug(data.search(/karama/i) > -1)

    console.debug((data.search(/deleted/i) > -1
    && data.search(/account/i) > -1))

    if (data.search(/nobody/i) > -1
    && data.search(/incorrect/i) > -1) {
      console.debug('avail;able')
    } else { console.debug('nope') }

  } catch (err) {
    console.error(err)
  }
}())
