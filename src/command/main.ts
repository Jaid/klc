import type {GlobalArgs} from '../makeCli.js'
import type {Simplify} from 'type-fest'
import type {ArgumentsCamelCase, Argv, CommandBuilder} from 'yargs'

export type Args = (typeof builder) extends CommandBuilder<any, infer U> ? ArgumentsCamelCase<U> : never
export type ArgsMerged = Simplify<GlobalArgs & Args>

export const command = `$0`
export const description = `prepares dataset`
export const builder = (argv: Argv) => {
  return argv
}

export const handler = async (args: ArgsMerged) => {
}
