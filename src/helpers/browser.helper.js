import puppeteer from 'puppeteer'

const get = async (url, headless = true) => {
  const browser = await puppeteer.launch({ headless })
  const [page] = await browser.pages()

  await page.goto(url, { waitUntil: 'networkidle0' })
  const data = await page.evaluate(() => document.querySelector('*').outerHTML)
  await browser.close()

  return data
}

export default {

  /**
     * Retrieve the html content of a page
     * @param {string} url http path to access
     * @returns html content of the given url
     */
  browse: (url) => get(url, false),
  get,
}
