#!/usr/bin/env node
import clipboardy from 'clipboardy'
import chalk from 'chalk'
import meow from 'meow'

const { log } = console
const { bgBlueBright, yellowBright, grey } = chalk

async function main () {
  const { flags } = meow({
    importMeta: import.meta,
    flags: {
      time: {
        type: 'number',
        alias: 't',
        default: 1000
      }
    },
    help: `
      Options
        --time, -t Polling time with default 1000

      Usage
        ${grey('# default')}
        remove-line-breaks
        ${grey('# Check the clipboard every 500ms')}
        remove-line-breaks -t 500
    `
  })

  log(bgBlueBright('------Waiting for changes from your clipboard------'))
  let prev = clipboardy.readSync()
  setInterval(async () => {
    try {
      const text = await clipboardy.read()
      if (text !== prev) {
        prev = text.replace(/\r\n/g, ' ')
        clipboardy.writeSync(prev)
        const len = prev.length
        log(`All line breaks in "${yellowBright.underline(`${
          len < 40 ? prev : `${prev.slice(0, 15)}...${prev.slice(-15)}`
        }`)}" has been removed.`)
        log(bgBlueBright('------Waiting for changes from your clipboard------'))
      }
    } catch (err) {}
  }, flags.time)
}

main().catch(err => {
  console.error(err)
  process.exit(0)
})
