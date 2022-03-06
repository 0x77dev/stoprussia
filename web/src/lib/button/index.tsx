import './styles.css'

import { ButtonHTMLAttributes, FC } from 'react'

type Props = {
  kind?: 'primary' | 'danger'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = (props) => {
  const { children, kind = 'primary', ...propsNext } = props

  return (
    <button className={`button button--${kind}`} {...propsNext}>
      {children}
    </button>
  )
}

export { Button }
