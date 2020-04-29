import del from 'del'
import args from './args'
export const clean = () => {
  return del(args.clean.dir)
}
