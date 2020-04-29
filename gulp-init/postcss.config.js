import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export const plugins = [
  autoprefixer({
    overrideBrowserslist: ['> 0.002%']
  }),
  cssnano() // 压缩css
]
