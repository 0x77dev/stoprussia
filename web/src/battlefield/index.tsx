import './styles.css'

import { useAttack } from './hooks'
import { ReactComponent as Map } from './map.svg'
import { Mark } from './components/mark'
import { getMarks } from './marks'
import { FormEvent, useMemo, useState } from 'react'
import { Button } from '../lib/button'
import { PageBattlefieldDescr } from './components/descr'

const BATTLEFIELD_DEFAULT = 4

const PageBattlefield = () => {
  const [battlefield, setBattlefield] = useState(BATTLEFIELD_DEFAULT)

  const [{ start, stop, reset }, isActive, data] = useAttack(battlefield)

  const targets = Object.entries(data)

  const marks = useMemo(() => {
    return getMarks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battlefield])

  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    reset()

    setBattlefield(parseInt(e.currentTarget.value))
  }

  return (
    <div className="battlefield-wrapper">
      <div className="map-wrapper">
        <svg className="map" viewBox="0 0 720 380">
          <Map />
          {marks.map((mark, key) => {
            return <Mark key={key} x={mark[0]} y={mark[1]} />
          })}
        </svg>
      </div>
      <div className="battlefield-content">
        {targets.length ? (
          <table className="table">
            <thead>
              <tr>
                <th className="table-th--name">Name</th>
                <th className="table-th--count">Requests</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((v) => {
                const [url, count] = v as [string, number]
                return (
                  <tr key={url}>
                    <td>{url}</td>
                    <td className="table-td--count">{count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <PageBattlefieldDescr />
        )}
        <form className="form">
          <select
            className="select"
            disabled={isActive}
            value={battlefield}
            onChange={handleChange}
          >
            <option value={1}>Battlefield #1</option>
            <option value={2}>Battlefield #2</option>
            <option value={3}>Battlefield #3</option>
            <option value={4}>Battlefield #4</option>
          </select>
          {!isActive ? (
            <Button onClick={start} type="button">
              start attack
            </Button>
          ) : (
            <Button kind="danger" onClick={stop} type="button">
              stop attack
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export { PageBattlefield }
