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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Notice</h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          This feature uses Amazon Web Services. Biometric identifiers and biometric information ("biometric data") may be collected, stored, and used by Amazon Web Services for the purpose of comparing the image of an individual with a stored image for analysis, verification, fraud, and security purposes. Biometric information that is generated as part of this process will be retained in line with Amazon Web Services privacy policy. You hereby provide your express, informed, written release and consent for Amazon Web Services to collect, use, and store your biometric data as described herein.
        </p>
        <div className="flex justify-end">
          <button
            className="px-6 py-3 rounded-full font-medium text-sm shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 transform hover:scale-105"
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
