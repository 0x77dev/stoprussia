import { Reducer, useCallback, useEffect, useReducer } from 'react'

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

const useAttack = () => {
  const [state, dispatch] = useReducer(reducer, {})

  const start = useCallback(async () => {
    const res = await fetch(API)

    const { targets } = (await res.json()) as Response

    const spawn = (target: string) => {
      const worker = new Worker(new URL('../worker.ts', import.meta.url), {
        type: 'module',
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
  }, [])

  useEffect(() => {
    start()
  }, [start])

  return state
}

export { useAttack }
