import { src, dest } from 'gulp'
import args from './args'

const imagesrc = args.image.src()
const output = args.output

export const image = (done) => {
  if (!args.image.enabled) return done()
  return src(imagesrc).pipe(dest(output))
}
