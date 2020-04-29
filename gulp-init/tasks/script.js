import { src, dest } from 'gulp'
import babel from 'gulp-babel'
import gulpIf from 'gulp-if'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import args from './args'

const jssrc = args.js.src()
const output = args.output
const isDevMode = args.mode_dev
const isProMode = args.mode_pro

export const script = (done) => {
  if (!args.js.enabled) return done()
  return src(jssrc)
    .pipe(gulpIf(isDevMode, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpIf(isProMode, uglify()))
    .pipe(gulpIf(isDevMode, sourcemaps.write()))
    .pipe(dest(output))
}
