import React, { useState } from "react"
import { Button } from "react-bootstrap"

const RekognitionButton = (props) => {
  const [started, setStarted] = useState(false)

  return (
    <button
      onClick={(e) => {
        setStarted(!started)
        props.onClick(e)
      }}
      disabled={!props.enabled}
      className={`text-white bg-blue-500 px-4 py-2 rounded hover:pointer ${
        started ? "bg-red-500" : "opacity-75"
      }`}
    >
      {started ? "Stop" : "Start"}
    </button>
  )
}

export default RekognitionButton
