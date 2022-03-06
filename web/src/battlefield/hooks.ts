import { useCallback, useReducer, useState } from 'react'
import { reducer } from './reducer'
import { ACTION_TYPE, AttackHook } from './types'

type Response = { targets: string[]; version?: number }

const API = 'https://srl.0x77.dev'

function* getChunks<T = any>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

const useAttack: AttackHook = (battlefield) => {
  const [state, dispatch] = useReducer(reducer, {})

  const [isActive, setIsActive] = useState(false)
  const [workers, setWorkers] = useState<Worker[]>([])

  const start = useCallback(async () => {
    const res = await fetch(API)

    let { targets } = (await res.json()) as Response

    targets = [...(getChunks(targets, Math.floor(targets.length / 4)) as any)][
      battlefield
    ]

    setIsActive(true)

    const spawn = (target: string) => {
      const worker = new Worker(new URL('../worker.ts', import.meta.url), {
        type: 'module',
      })

      setWorkers((workers) => {
        return [...workers, worker]
      })

      worker.postMessage([{ target }])

      worker.onmessage = (e: MessageEvent) => {
        dispatch({
          type: ACTION_TYPE.UPDATE,
          payload: e.data.target,
        })
      }
    }

    for (const target of targets) {
      spawn(target)
    }
  }, [battlefield])

  const stop = useCallback(() => {
    setIsActive(false)

    workers.forEach((worker) => {
      worker.terminate()
    })
  }, [workers])

  const reset = useCallback(() => {
    dispatch({ type: ACTION_TYPE.RESET })
  }, [])

  return [
    {
      start,
      stop,
      reset,
    },
    isActive,
    state,
  ]
}

export { useAttack }
