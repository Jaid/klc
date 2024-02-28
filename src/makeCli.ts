import type {InferredOptionTypes} from 'yargs'

import yargs from 'yargs'

import * as createScanCodeReferenceCommand from './command/createScanCodeReference.js'
import * as mainCommand from './command/main.js'
import * as makeSampleCommand from './command/makeSample.js'

export type YargsOptions = Parameters<ReturnType<typeof yargs>['options']>[0]
export type GlobalArgs = InferredOptionTypes<typeof globalOptions>
const globalOptions = {

}
export default (args: Parameters<typeof yargs>[0]) => {
  const cli = yargs(args)
  cli.detectLocale(false)
  cli.strict()
  cli.parserConfiguration({
    'strip-aliased': true,
    'strip-dashed': true,
  })
  cli.scriptName(process.env.npm_package_name!)
  cli.version(process.env.npm_package_version!)
  cli.completion()
  cli.options(globalOptions)
  cli.command(mainCommand)
  cli.command(createScanCodeReferenceCommand)
  cli.command(makeSampleCommand)
  cli.demandCommand()
  cli.help()
  cli.showHelpOnFail(false)
  cli.wrap(Math.min(100, cli.terminalWidth()))
  return cli
}
