declare let self: any

onmessage = function (e) {
  const [{ target }] = e.data as [{ target: string }]
  console.log(target)

  setInterval(async () => {
    try {
      await fetch(target, {
        mode: 'no-cors',
      })

      self.postMessage({ target })
    } catch (err) {
    } finally {
    }
  }, 100)
}

export {}
