declare let self: any

onmessage = function (e) {
  const [{ target }] = e.data as [{ target: string }]

  setInterval(async () => {
    try {
      await fetch(target, {
        mode: 'no-cors',
      })
    } catch (err) {
    } finally {
      self.postMessage({ target })
    }
  }, 100)
}

export {}
