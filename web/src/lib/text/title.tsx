import './styles.css'

import { FC } from 'react'

type Props = { kind?: 'primary' }

const TextTitle: FC<Props> = (props) => {
  const { children, kind } = props

  const classNameNext = kind ? `text-title--${kind}` : ''

  return <div className={`text-title ${classNameNext}`}>{children}</div>
}

export { TextTitle }
