#!/usr/bin/env node
import clipboardy from 'clipboardy'

async function main () {
  console.log('------Waiting for changes from your clipboard------')
  let prev = clipboardy.readSync()
  setInterval(async () => {
    const text = await clipboardy.read()
    if (text !== prev) {
      prev = text.replace(/\r\n/g, ' ')
      clipboardy.writeSync(prev)
      const len = prev.length
      console.log(`All line breaks in "${
        len < 40 ? prev : `${prev.slice(0, 15)}...${prev.slice(-15)}`
      }" has been removed.`)
      console.log('------Waiting for changes from your clipboard------')
    }
  }, 1000)
}

main().catch(err => {
  console.error(err)
  process.exit(0)
})
