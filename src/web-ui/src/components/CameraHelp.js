
const CameraHelp = ({ show, mode = "light" }) => {
  const currentUrl = window.location.href
  // removed unused isDark
  if (!show) return null
  return (
    <div className={`w-full flex justify-center my-4`}>
      <div className="rounded px-4 py-3 text-center shadow bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700">
        When prompted, you need to click <i>Allow</i> to use the application with your webcamera.<br />
        If you don't see the dialog, try <a className="underline" href={currentUrl}>opening the application</a> in a new incognito window, or review your webcam settings on your browser.
      </div>
    </div>
  )
}

export default CameraHelp
