
import React from "react"

const RekognitionButton = ({ onClick, enabled, mode = "light" }) => {
  const [started, setStarted] = React.useState(false)
  // removed unused isDark
  return (
    <button
      onClick={(e) => {
        setStarted(!started)
        if (onClick) onClick(e)
      }}
      disabled={!enabled}
      className={`px-5 py-2.5 rounded-full font-medium text-sm shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
        ${started ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white" : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"}
        ${!enabled ? "opacity-50 cursor-not-allowed" : "transform hover:scale-105"}
      `}
    >
      {started ? "Stop" : "Start"}
    </button>
  )
}

export default RekognitionButton
