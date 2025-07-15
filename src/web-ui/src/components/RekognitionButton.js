
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
      className={`px-4 py-2 rounded font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${started ? "bg-red-500 text-white dark:bg-red-700 dark:text-red-100" : "bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-100"}
        ${!enabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 dark:hover:bg-blue-900"}
      `}
    >
      {started ? "Stop" : "Start"}
    </button>
  )
}

export default RekognitionButton
