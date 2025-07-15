
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
      className={`px-8 py-3.5 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[120px]
        ${started ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white" : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"}
        ${!enabled ? "opacity-50 cursor-not-allowed" : "transform hover:scale-102"}
      `}
    >
      {started ? "Stop" : "Start"}
    </button>
  )
}

export default RekognitionButton
