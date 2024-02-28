// Sample for https://patorjk.com/keyboard-layout-analyzer

import type {GlobalArgs} from '../makeCli.js'
import type {Simplify} from 'type-fest'
import type {ArgumentsCamelCase, Argv, CommandBuilder} from 'yargs'

import fs from 'fs-extra'
import got from 'got'

export type Args = (typeof builder) extends CommandBuilder<any, infer U> ? ArgumentsCamelCase<U> : never
export type ArgsMerged = Simplify<GlobalArgs & Args>

type Source = {
  branch?: string
  file: string
  repo: string
}

export const command = `make-sample`
export const description = ``
export const builder = (argv: Argv) => {
  return argv
}

const sources: Source[] = [
  {
    file: `.gitignore`,
    repo: `repos-cli`,
  },
  {
    file: `package.json`,
    repo: `repos-cli`,
  },
  {
    file: `src/Context.ts`,
    repo: `repos-cli`,
  },
  {
    file: `src/Repo.ts`,
    repo: `repos-cli`,
  },
  {
    file: `src/cli.ts`,
    repo: `repos-cli`,
  },
  {
    file: `lib/superRegexTypes.ts`,
    repo: `repos-cli`,
  },
  {
    file: `lib/defaultReposFolder.ts`,
    repo: `repos-cli`,
  },
  {
    file: `lib/debug.ts`,
    repo: `repos-cli`,
  },
  {
    file: `lib/chalk.ts`,
    repo: `repos-cli`,
  },
  {
    file: `src/command/list.ts`,
    repo: `repos-cli`,
  },
  {
    file: `src/Dockerfile`,
    repo: `docker-runner`,
  },
  {
    file: `src/init.bash`,
    repo: `docker-runner`,
  },
  {
    file: `src/entrypoint.bash`,
    repo: `docker-runner`,
  },
  {
    file: `src/play/play.go`,
    repo: `play-sound`,
  },
  {
    file: `src/cmd/root.go`,
    repo: `play-sound`,
  },
  {
    file: `webpack.config.ts`,
    repo: `epoch-seconds`,
  },
  {
    file: `src/index.ts`,
    repo: `epoch-seconds`,
  },
  {
    file: `desktop.ini`,
    repo: `reg`,
  },
  {
    file: `src-reg/longPaths.reg`,
    repo: `reg`,
  },
  {
    file: `src/whisper/cli.py`,
    repo: `ai-playground`,
  },
]

export const handler = async (args: ArgsMerged) => {
  const downloadJobs = sources.map(async source => {
    const branch = source.branch ?? `main`
    const slug = source.repo.includes(`/`) ? source.repo : `Jaid/${source.repo}`
    const url = `https://raw.githubusercontent.com/${slug}/${branch}/${source.file}`
    console.log(`Downloading ${url}`)
    const result = await got(url)
    const text = result.body
    const textDedented = text.replaceAll(/^\s+/gm, ``)
    return textDedented.trim()
  })
  const results = await Promise.all(downloadJobs)
  const stitchedText = results.join(`\n\n`)
  await fs.outputFile(`temp/sample.txt`, stitchedText)
}
