import { Target } from "./target"

export const start = async (urls: string[], size: number = 1, onStats?: Parameters<Target['on']>[1]) => {
  const targets = await Promise.all(urls.map(async (url) => {
    const target = new Target(url, size)
    if (onStats) target.on('stats', onStats)
    await target.start()
    return target
  }))

  return () => Promise.all(targets.map((target) => target.stop()))
}
