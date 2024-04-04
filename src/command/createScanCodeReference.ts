import type {GlobalArgs} from '../makeCli.js'
import type {ScancodeLineInput} from 'lib/ScancodeLine.js'
import type {Simplify} from 'type-fest'
import type {ArgumentsCamelCase, Argv, CommandBuilder} from 'yargs'

import * as path from 'forward-slash-path'
import fs from 'fs-extra'
import {ScancodeLine} from 'lib/ScancodeLine.js'
import * as lodash from 'lodash-es'
import {matches} from 'super-regex'

export type Args = (typeof builder) extends CommandBuilder<any, infer U> ? ArgumentsCamelCase<U> : never
export type ArgsMerged = Simplify<GlobalArgs & Args>

export const command = `create-scan-code-reference`
export const description = `prepares dataset`
export const builder = (argv: Argv) => {
  return argv
}

export const handler = async (args: ArgsMerged) => {
  const scancodeReferences = new Map<number, ScancodeLine>
  const scancodeLog = await fs.readFile(path.join(`src`, `scancode.log`), `utf8`)
  const logMatches = matches(/Scan code: 0x(?<scanCode>.+?), Ext: (?<ext>.), Alt: (?<alt>.), VK: 0x(?<vkCode>.+?) \('?(?<vkId>.+?)'?\)/g, scancodeLog)
  for (const match of logMatches) {
    const input = <ScancodeLineInput> match.namedGroups
    const line = new ScancodeLine(input)
    if (scancodeReferences.has(line.scanCode)) {
      continue
    }
    scancodeReferences.set(line.scanCode, line)
  }
  const scancodeReferencesSorted = lodash.sortBy([...scancodeReferences.values()], `scanCode`)
  console.dir(scancodeReferencesSorted, {depth: null})
}
