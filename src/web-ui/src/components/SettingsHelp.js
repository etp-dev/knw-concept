import React from "react"


const SettingsHelp = ({ show }) => {
  if (!show) return null
  return (
    <div className="w-full flex justify-center my-4">
      <div
        className="border rounded px-4 py-3 text-center shadow bg-red-100 text-red-900 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700"
        role="alert"
      >
        There is an issue with your settings configuration.
      </div>
    </div>
  )
}

export default SettingsHelp
