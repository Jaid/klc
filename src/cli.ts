import {hideBin} from 'yargs/helpers'

import makeCli from './makeCli.js'

await makeCli(hideBin(process.argv)).parseAsync()
