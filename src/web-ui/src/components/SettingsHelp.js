import React from "react"


const SettingsHelp = ({ show }) => {
  if (!show) return null
  return (
    <div className="w-full my-6">
      <div
        className="border-l-4 border-red-500 rounded-xl px-8 py-5 shadow-lg bg-red-50 text-red-800 dark:bg-red-900/80 dark:text-red-100 backdrop-blur-sm w-full"
        role="alert"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-xl">There is an issue with your settings configuration.</p>
            <p className="mt-2 text-lg">Please check your application configuration and ensure all required settings are properly defined.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsHelp
