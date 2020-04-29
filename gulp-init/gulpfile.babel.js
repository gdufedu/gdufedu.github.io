import { series } from 'gulp'
import { clean } from './tasks/clean'
import { copy } from './tasks/copy'
/* import { image } from './tasks/image' */
import { css } from './tasks/css'
import { script } from './tasks/script'
import { pages } from './tasks/pages'
import { browser } from './tasks/browser'
import './tasks/args'

export default series(clean, copy, /* image,  */ css, script, pages, browser)
