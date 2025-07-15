
import AddUserModal from "./AddUserModal"
import RekognitionButton from "./RekognitionButton"

const Header = ({ mode = "light", setMode, ...props }) => {
  const isDark = mode === "dark"
  return (
    <nav className={`w-full flex items-center justify-between px-6 py-3 shadow ${isDark ? "bg-gray-900 text-white" : "bg-blue-500 text-white"}`}>
      <div className="font-bold text-xl tracking-wide">LMG</div>
      <div className="flex items-center gap-4">
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
