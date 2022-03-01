import { EventEmitter } from 'events'
import autocannon, { Histogram } from 'autocannon'
import PQueue from 'p-queue'
import { StaticPool } from 'node-worker-threads-pool'

export interface AttackStats {
  url: string
  latency: Histogram;
  throughput: Histogram;
  duration: number;
  queue: number
}

export class Target {
  private pool: StaticPool<any>
  private queue = new PQueue({ concurrency: this.size })
  private interval?: NodeJS.Timer
  private events = new EventEmitter()

  constructor(public url: string, private size = 1) {
    this.pool = new StaticPool({
      task: (...args: Parameters<typeof autocannon>): Promise<autocannon.Result> => {
        const autocannon = require('autocannon')
        
        return autocannon(...args)
      },
      size
    })
  }

  public async cycle() {
    const result = await this.pool.exec({ url: this.url }).catch(console.warn)

    if (!result) return
    
    const stats: AttackStats = {
      url: this.url,
      latency: result.latency,
      throughput: result.throughput,
      duration: result.duration,
      queue: this.queue.size
    }

    this.events.emit('stats', stats)
  }

  public on(event: 'stats', listener: (stats: AttackStats) => void) {
    this.events.on(event, listener)
  }

  public async start() {
    this.interval = setInterval(() => {
      this.queue.add(() => this.cycle())
    }, 250)
  }

  public async stop() {
    if (this.interval) clearInterval(this.interval)
    this.queue.clear()
    await this.pool.destroy()
  }
}
