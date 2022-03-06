onmessage = function (e) {
  const [{ target }] = e.data as [{ target: string }]

  setInterval(() => {
    console.time(target)
    self.postMessage([true])
    fetch(target, { mode: 'no-cors' }).finally(() => console.timeEnd(target))
  }, 15)
}
