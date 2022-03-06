import './styles.css'

import { FC } from 'react'

const TextDescr: FC = (props) => {
  const { children } = props

  return <p className="text-descr">{children}</p>
}

export { TextDescr }
