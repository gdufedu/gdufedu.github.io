import { src, dest } from 'gulp'
import gulpIf from 'gulp-if'
import postcss from 'gulp-postcss'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import args from './args'

const csssrc = args.css.src()
const output = args.output

export const css = (done) => {
  if (!args.css.enabled) return done()
  return src(csssrc)
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(dest(output))
}
