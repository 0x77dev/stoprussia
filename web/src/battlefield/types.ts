type AttackHook = (battlefield: number) => [
  {
    start: () => void
    stop: () => void
    reset: () => void
  },
  boolean,
  State,
]

enum ACTION_TYPE {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

interface Action {
  type: ACTION_TYPE
  payload?: string
}

type State = Record<string, number>

export { ACTION_TYPE }
export type { AttackHook, Action, State }
