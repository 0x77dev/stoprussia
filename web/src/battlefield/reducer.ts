import { Reducer } from 'react'
import { State, Action, ACTION_TYPE } from './types'

const reducer: Reducer<State, Action> = (state, { payload = '', type }) => {
  switch (type) {
    case ACTION_TYPE.UPDATE: {
      const count = state[payload] ?? 0

      return { ...state, [payload]: count + 1 }
    }
    case ACTION_TYPE.RESET: {
      return {}
    }
  }
}

export { reducer }
