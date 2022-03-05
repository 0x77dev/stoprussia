import { Reducer, useCallback, useReducer, useState } from 'react'

type Response = { targets: string[]; version?: number }

const API = 'https://srl.0x77.dev'

enum KIND {
  UPDATE = 'UPDATE',
}

interface Action {
  type: KIND
  payload: string
}

type State = Record<string, number>

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case KIND.UPDATE: {
      const count = state[action.payload] ?? 0

      return { ...state, [action.payload]: count + 1 }
    }
  }
}

function* getChunks<T = any>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

const useAttack = (
  battlefield: number,
): [() => void, () => void, boolean, State] => {
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
          type: KIND.UPDATE,
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

  return [start, stop, isActive, state]
}

export { useAttack }
