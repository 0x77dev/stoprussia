import { useRef } from 'react'
import { useMark } from './hooks'

const Mark = (props: any) => {
  const ref = useRef<SVGElement>(null)

  useMark(ref)

  return (
    <svg ref={ref} className="target" height="20px" width="20px" {...props}>
      <circle
        className="target-pulse target-pulse--fill"
        cx="50%"
        cy="50%"
        r="3px"
      />
      <circle
        className="target-pulse target-pulse--stroke"
        cx="50%"
        cy="50%"
        r="7px"
      />
    </svg>
  )
}

export { Mark }
