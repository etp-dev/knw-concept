import React, { useRef, useState } from "react"
import { findDOMNode } from "react-dom"
import GaugeChart from "react-gauge-chart"
import Webcam from "react-webcam"

import CameraHelp from "./components/CameraHelp"
import ConsentModal from "./components/ConsentModal"
import EngagementSummary from "./components/EngagementsSummary"
import Header from "./components/Header"
import PolarChart from "./components/PolarChart"
import SettingsHelp from "./components/SettingsHelp"

import faceDetailsMapper from "./utils/faceDetailsMapper"
import gateway from "./utils/gateway"
import getChartData from "./utils/getChartData"

const App = () => {
  const [aggregate, setAggregate] = useState({
    angry: 0,
    calm: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
  })

  const [detectedFaces, setDetectedFaces] = useState([])
  const [detectedPeople, setDetectedPeople] = useState([])
  const [happyometer, setHappyometer] = useState(50)
  const [readyToStream, setReadyToStream] = useState(false)
  const [webcamCoordinates, setWebcamCoordinates] = useState({})
  const [darkMode, setDarkMode] = useState(false)

  const iterating = useRef(false)
  const people = useRef([])
  const webcam = useRef(undefined)

  // Toggle dark mode by adding/removing the 'dark' class on <html>
  const handleDarkModeToggle = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }

  const addUser = (params) => gateway.addUser(params)

  const getSnapshot = () => {
    setWebcamCoordinates(findDOMNode(webcam.current).getBoundingClientRect())
    const image = webcam.current.getScreenshot()
    const b64Encoded = image.split(",")[1]

    gateway.getEngagement().then((response) => {
      const chartData = getChartData(response)

      if (chartData.happyometer) {
        setHappyometer(chartData.happyometer)
      }

      if (chartData.aggregate) {
        setAggregate(chartData.aggregate)
      }
    })

    gateway.detectFaces(b64Encoded).then((response) => {
      const detectedFaces = response.FaceDetails.map((person) => {
        const result = faceDetailsMapper(person)
        gateway.postEngagement(result).then(() => {})
        return result
      })
      setDetectedFaces(detectedFaces)

      if (iterating.current) {
        setTimeout(getSnapshot, 300)
      }
    })

    gateway.searchFaces(b64Encoded).then((response) => {
      const detectedPeople = []
      if (response.FaceMatches) {
        response.FaceMatches.forEach((match) => {
          const externalImageId = match.Face.ExternalImageId
          detectedPeople.push(
            people.current.find((x) => x.externalImageId === externalImageId)
          )
        })
      }
      setDetectedPeople(detectedPeople)
    })
  }

  const setupWebcam = (instance) => {
    webcam.current = instance

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setReadyToStream(true)
      } else setTimeout(checkIfReady, 250)
    }

    checkIfReady()
  }

  const toggleRekognition = () => {
    iterating.current = !iterating.current

    if (iterating.current) {
      gateway.getPeople().then((response) => {
        people.current = response.people
        getSnapshot()
      })
    }
  }

  return (
    <div className="App bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header
        toggleRekognition={toggleRekognition}
        addUser={addUser}
        readyToStream={readyToStream}
        setMode={handleDarkModeToggle}
        mode={darkMode ? "dark" : "light"}
      />
      <ConsentModal mode={darkMode ? "dark" : "light"} />
      <div className="container mx-auto px-4 py-6">
        <SettingsHelp show={!window.rekognitionSettings} />
        <CameraHelp show={!readyToStream} mode={darkMode ? "dark" : "light"} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <Webcam
                ref={setupWebcam}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 640,
                  facingMode: "user",
                }}
                width="100%"
                height="100%"
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">Trends for last hour</h3>
                <PolarChart
                  data={Object.keys(aggregate).map((sentiment) => ({
                    x: sentiment,
                    y: aggregate[sentiment],
                  }))}
                  mode={darkMode ? "dark" : "light"}
                />
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">Engagement Meter</h3>
                <div className="p-4">
                  <GaugeChart
                    id="gauge-chart1"
                    percent={happyometer / 100}
                    nrOfLevels={20}
                    colors={["#FF5F6D", "#FFC371"]}
                    animate={false}
                    cornerRadius={6}
                    arcWidth={0.3}
                    textColor={darkMode ? "#e0e0e0" : "#333333"}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
              <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">Analysis Results</h3>
              <EngagementSummary
                detectedFaces={detectedFaces}
                detectedPeople={detectedPeople}
                showFaceBoundingBoxes={iterating.current}
                webcamCoordinates={webcamCoordinates}
                mode={darkMode ? "dark" : "light"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
