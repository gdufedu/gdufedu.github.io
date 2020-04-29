import { src, dest } from 'gulp'
import filter from 'gulp-filter'
import gulpIf from 'gulp-if'
import args from './args'

const copysrc = args.copy.src()
const output = args.output
const typeExclude = args.copy.type.exclude
const isTypeExclude = !!typeExclude.length
export const copy = () => {
  const f = filter(['src/**', `!src/**/*.@(${typeExclude.join('|')})`])
  return src(copysrc).pipe(gulpIf(isTypeExclude, f)).pipe(dest(output))
}
