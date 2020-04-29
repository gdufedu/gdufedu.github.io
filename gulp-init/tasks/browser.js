import { watch, parallel } from 'gulp'
import browserSync from 'browser-sync'
import portfinder from 'portfinder-sync'
import { css } from './css'
import { pages } from './pages'
import { script } from './script'
import { copy } from './copy'
import path from 'path'
import args from './args'

const jssrc = args.js.src()
const csssrc = args.css.src()
const htmlsrc = args.html.src()
const copysrc = args.copy.src()

const watchPath = path.resolve(
  __dirname,
  '..',
  args.server.baseDir,
  args.server.project
)

function _watch(done) {
  if (!args.server.enabled) return done()
  watch(csssrc, css)
  watch(htmlsrc, pages)
  watch(jssrc, script)
  watch(copysrc, copy)

  done()
}

function server(done) {
  if (!args.server.enabled) return done()

  browserSync.create().init({
    server: {
      baseDir: [watchPath],
      directory: args.server.directory
    },
    files: [`${watchPath}/**/*.@(${args.server.watchType.join('|')})`],
    port: portfinder.getPort(args.server.port),
    online: true,
    open: args.server.open,
    logConnections: true,
    browser: args.server.browser
  })

  done()
}

export const browser = parallel(_watch, server)
