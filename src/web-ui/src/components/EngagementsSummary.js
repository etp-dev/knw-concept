
const filterAndSortEmotions = (face) =>
  Object.keys(face.emotions)
    .map((emotion) => ({
      emotion,
      confidence: face.emotions[emotion],
    }))
    .filter((x) => x.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)

const EngagementsSummary = ({
  detectedFaces,
  detectedPeople,
  showFaceBoundingBoxes,
  webcamCoordinates,
  mode = "light",
}) => {
  const isDark = mode === "dark"
  return (
    <div className="w-full">
      {detectedFaces.map((face, index) => (
        <div key={index} className="mb-6">
          {showFaceBoundingBoxes && (
            <div
              style={{
                border: "2px solid rgba(246, 173, 85, 0.7)",
                borderRadius: "12px",
                fontWeight: "500",
                position: "fixed",
                height: webcamCoordinates.height * face.boundingBox.Height,
                left:
                  webcamCoordinates.left +
                  face.boundingBox.Left * webcamCoordinates.width,
                top:
                  webcamCoordinates.top +
                  face.boundingBox.Top * webcamCoordinates.height,
                width: webcamCoordinates.width * face.boundingBox.Width,
                zIndex: 30,
                backdropFilter: "blur(2px)",
                background: isDark ? "rgba(40,20,20,0.15)" : "rgba(255,255,255,0.15)",
                color: isDark ? "#fff" : "#000",
                padding: "4px 8px",
                fontSize: "12px",
                display: "flex",
                alignItems: "flex-start",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Person #{index + 1}
            </div>
          )}
          <div className="overflow-hidden mt-4 rounded-xl shadow-lg border bg-white border-gray-200 text-gray-900 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-100 backdrop-blur-sm">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/80">
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Person #{index + 1}</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap">Age</td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium">
                    {face.ageLow} - {face.ageHigh} years old
                  </td>
                </tr>
                {filterAndSortEmotions(face).map(({ emotion, confidence }) => (
                  <tr key={emotion} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap capitalize">{emotion}</td>
                    <td className="px-6 py-3 whitespace-nowrap font-medium">{confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {detectedPeople.map((person) => (
        <div key={person.externalImageId} className="mt-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 shadow-md">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">
            Welcome <span className="font-bold">{person.memberName}</span> <span className="text-yellow-600 dark:text-yellow-300 text-sm">({person.jobTitle})</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default EngagementsSummary
