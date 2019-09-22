#!/usr/bin/env node
const { launch } = require('@01/launcher')

const args = process.argv.slice(2)
const [package, script] = args
const prefix = `workspaces/services/${package}`

launch({
  cmds: ['npm', 'run', '--prefix', prefix, script]
})
  .then(result => {
    process.exit(result)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
