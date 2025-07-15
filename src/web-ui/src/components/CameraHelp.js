
const CameraHelp = ({ show, mode = "light" }) => {
  const currentUrl = window.location.href
  // removed unused isDark
  if (!show) return null
  return (
    <div className={`w-full flex justify-center my-6`}>
      <div className="rounded-xl px-6 py-4 text-center shadow-lg bg-blue-50 text-blue-800 border-l-4 border-blue-500 dark:bg-blue-900/80 dark:text-blue-50 backdrop-blur-sm">
        When prompted, you need to click <i>Allow</i> to use the application with your webcamera.<br />
        If you don't see the dialog, try <a className="text-blue-600 dark:text-blue-300 hover:underline font-medium" href={currentUrl}>opening the application</a> in a new incognito window, or review your webcam settings on your browser.
      </div>
    </div>
  )
}

export default CameraHelp
