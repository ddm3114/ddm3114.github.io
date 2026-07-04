// Screenshot the live cinema site using the host's Edge
import puppeteer from 'puppeteer-core'

const URL = process.argv[2] || 'https://ddm3114.github.io/'
const OUT = process.argv[3] || '/tmp/site-snap.png'
const EDGE = '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const browser = await puppeteer.launch({
  executablePath: EDGE,
  channel: 'msedge',
  headless: 'new',
  args: [
    '--headless=new',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
})

try {
  const page = await browser.newPage()
  // image-only loads, no JS-deferred
  await page.setUserAgent('Mozilla/5.0 (snapper)')
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 })
  // Give the video 2s to start
  await new Promise(r => setTimeout(r, 2500))
  await page.screenshot({ path: OUT, fullPage: false })
  // also a full-page snap
  const fullOut = OUT.replace(/\.png$/, '-full.png')
  await page.screenshot({ path: fullOut, fullPage: true })
  console.log('saved', OUT)
  console.log('saved', fullOut)
} finally {
  await browser.close()
}
