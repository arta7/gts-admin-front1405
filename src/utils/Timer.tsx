import React, { useEffect, useState } from 'react'

export default function Timer() {
  const [time, setTime] = useState(200)

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer)
          return 0
        } else return time - 1
      })
    }, 1000)
  }, [])

  return (
    <>
      {`${Math.floor(time / 60)}`}:{`${time % 60}`}
    </>
  )
}
