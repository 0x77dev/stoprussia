import { useAttack } from './hooks'

const App = () => {
  const data = useAttack()

  return (
    <div>
      {Object.entries(data).map((v) => {
        const [url, count] = v as [string, number]

        return (
          <div key={url}>
            {url}: {count} requests
          </div>
        )
      })}
    </div>
  )
}

export { App }
