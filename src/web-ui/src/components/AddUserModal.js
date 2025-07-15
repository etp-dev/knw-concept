
import React from "react"

const AddUserModal = ({ onSave, mode = "light" }) => {
  const [show, setShow] = React.useState(false)
  const [fullName, setFullName] = React.useState("")
  const [jobTitle, setJobTitle] = React.useState("")
  const [image, setImage] = React.useState(undefined)
  const [formState, setFormState] = React.useState("initial")
  // removed unused isDark

  const processImage = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setImage(reader.result.split(",")[1])
    reader.onerror = () => setFormState("error")
  }

  const submitForm = (e) => {
    setFormState("saving")
    e.preventDefault()
    onSave({ fullName, jobTitle, image })
      .then(() => setFormState("saved"))
      .catch(() => setFormState("error"))
  }

  const toggle = (reset) => {
    setShow(!show)
    if (reset) {
      setFormState("initial")
      setFullName("")
      setJobTitle("")
      setImage(undefined)
    }
  }

  return (
    <>
      <button
        className={`px-4 py-2 rounded font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ml-5
          bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-100
          ${formState === "saving" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 dark:hover:bg-blue-900"}
        `}
        onClick={() => toggle(true)}
      >
        Add a new user
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative text-gray-900 dark:text-gray-100">
            <button
              className="absolute top-2 right-2 text-lg font-bold px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => toggle(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">Add a new user</h2>
            <p className="mb-2 text-sm">By uploading a picture and associating it with a name, Amazon Rekognition can recognize that person.</p>
            <hr className="mb-2" />
            {formState === "saving" && (
              <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 px-3 py-2 rounded mb-2">Please wait...</div>
            )}
            {formState === "error" && (
              <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-3 py-2 rounded mb-2">An error happened. Retry.</div>
            )}
            {formState === "saved" && (
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-2 rounded mb-2">The user has been added.</div>
            )}
            {formState === "initial" && (
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    placeholder="Full Name e.g. Jane Doe"
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    placeholder="Job Title e.g. CEO"
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1 font-medium">Photo</label>
                  <input
                    type="file"
                    onChange={(e) => processImage(e.target.files[0])}
                    id="image"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    disabled={!fullName || !jobTitle || !image || formState !== "initial"}
                    className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-600 dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(false)}
                    className="px-4 py-2 rounded font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  >
                    Close
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AddUserModal
