import { RefObject, useEffect } from 'react'

const useMark = (ref: RefObject<SVGElement>) => {
  useEffect(() => {
    const list = ref.current?.childNodes as HTMLElement[] | undefined

    const add = 1 / 180

    let scale = 0

    if (list?.length) {
      const animation = () => {
        if (scale >= 1) {
          scale = 0
        }

        scale += add

        list.forEach((el) => {
          el.style.transform = `scale(${scale})`
          el.style.opacity = String(scale)
        })

        requestAnimationFrame(animation)
      }

      requestAnimationFrame(animation)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export { useMark }
