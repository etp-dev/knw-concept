import React from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const ConsentModal = ({ mode = "light" }) => {
  const [hasConsent, setHasConsent] = useLocalStorage(
    "rekognitionEngagementMeterConsent",
    false
  )
  // removed unused isDark
  const onClick = () => setHasConsent(true)

  if (hasConsent) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-bold mb-2">Notice</h2>
        <p className="mb-4 text-sm">
          This feature uses Amazon Web Services. Biometric identifiers and biometric information ("biometric data") may be collected, stored, and used by Amazon Web Services for the purpose of comparing the image of an individual with a stored image for analysis, verification, fraud, and security purposes. Biometric information that is generated as part of this process will be retained in line with Amazon Web Services privacy policy. You hereby provide your express, informed, written release and consent for Amazon Web Services to collect, use, and store your biometric data as described herein.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-600 dark:hover:bg-blue-900"
            onClick={onClick}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsentModal
