
import AddUserModal from "./AddUserModal"
import RekognitionButton from "./RekognitionButton"

const Header = ({ mode = "light", setMode, ...props }) => {
  const isDark = mode === "dark"
  return (
    <nav className={`w-full flex items-center justify-between px-8 py-4 shadow-md ${isDark ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"} rounded-b-xl`}>
      <div className="font-bold text-2xl tracking-wide">LMG</div>
      <div className="flex items-center gap-5">
        <RekognitionButton
          onClick={props.toggleRekognition}
          enabled={props.readyToStream}
          mode={mode}
        />
        <AddUserModal onSave={props.addUser} mode={mode} />
        {/* Dark mode button removed as requested */}
      </div>
    </nav>
  )
}

export default Header
