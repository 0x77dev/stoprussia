import './styles.css'

import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { LinkProps } from 'react-router-dom'

type Props = {
  kind?: 'primary' | 'danger'
} & LinkProps

const ButtonLink: FC<Props> = (props) => {
  const { children, kind = 'primary', ...propsNext } = props

  return (
    <RouterLink className={`link button button--${kind}`} {...propsNext}>
      {children}
    </RouterLink>
  )
}

export { ButtonLink }
