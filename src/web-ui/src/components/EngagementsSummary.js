
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
                border: "2px solid #f0ad4e",
                fontWeight: "bold",
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
                background: isDark ? "rgba(40,20,20,0.2)" : "rgba(255,255,255,0.2)",
                color: isDark ? "#fff" : "#000",
              }}
            >
              Person #{index + 1}
            </div>
          )}
          <div className="overflow-x-auto mt-2 rounded shadow border bg-white border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2 text-left">Person #{index + 1}</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Age</td>
                  <td className="px-4 py-2">
                    {face.ageLow} - {face.ageHigh} years old
                  </td>
                </tr>
                {filterAndSortEmotions(face).map(({ emotion, confidence }) => (
                  <tr key={emotion}>
                    <td className="px-4 py-2">{emotion}</td>
                    <td className="px-4 py-2">{confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {detectedPeople.map((person) => (
        <p key={person.externalImageId} className="mt-2 font-semibold text-yellow-700 dark:text-yellow-300">
          Welcome <b>{person.memberName}</b> ({person.jobTitle})
        </p>
      ))}
    </div>
  )
}

export default EngagementsSummary
