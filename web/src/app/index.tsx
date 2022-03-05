import './styles.css'

import { useAttack } from './hooks'
import { ReactComponent as Map } from './m.svg'
import { Mark } from './mark'
import { getMarks } from './marks'

const marks = getMarks()

const App = () => {
  const [start, stop, isActive, data] = useAttack(3)

  return (
    <div className="main">
      <div className="mapWrapper">
        <svg className="map" viewBox="0 0 720 380">
          <Map />
          {marks.map((mark, key) => {
            return <Mark key={key} x={mark[0]} y={mark[1]} />
          })}
        </svg>
      </div>
      <div className="content">
        <form>
          <select>
            <option>Battlefield #1</option>
            <option>Battlefield #2</option>
            <option>Battlefield #3</option>
            <option>Battlefield #4</option>
          </select>
          {isActive ? (
            <button
              className="button button--stop"
              onClick={stop}
              type="button"
            >
              STOP ATTACK
            </button>
          ) : (
            <button onClick={start} type="button">
              START ATTACK
            </button>
          )}
        </form>
        <table className="table">
          <thead>
            <tr>
              <th className="table-th--name">Name</th>
              <th className="table-th--requests">Requests</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map((v) => {
              const [url, count] = v as [string, number]
              return (
                <tr key={url}>
                  <td>{url}</td>
                  <td>{count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { App }
