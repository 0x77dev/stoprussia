onmessage = function (e) {
  const [{ target }] = e.data as [{ target: string }]
  console.log(target, 'starting')
  setInterval(async () => {
    const res = await fetch(target, { mode: 'no-cors' })
    
    self.postMessage(res.ok)
  }, 50)
}
