
const CameraHelp = ({ show, mode = "light" }) => {
  const currentUrl = window.location.href
  // removed unused isDark
  if (!show) return null
  return (
    <div className={`w-full my-6`}>
      <div className="rounded-xl px-8 py-5 shadow-lg bg-blue-50 text-blue-800 border-l-4 border-blue-500 dark:bg-blue-900/80 dark:text-blue-50 backdrop-blur-sm w-full">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-xl">When prompted, you need to click <i>Allow</i> to use the application with your webcamera.</p>
            <p className="mt-2 text-lg">If you don't see the dialog, try <a className="text-blue-600 dark:text-blue-300 hover:underline font-medium" href={currentUrl}>opening the application</a> in a new incognito window, or review your webcam settings on your browser.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CameraHelp
