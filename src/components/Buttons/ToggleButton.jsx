import { useCallback, useState } from "react"

function ToggleButton(props) {
  const [active, setActive] = useState(false)
  const handlerOnChange = useCallback((e) => {
    setActive(e.target.checked)
    if (typeof props.onChange == 'function') {
      props.onChange(e.target.checked)
    }
  }, [props])
  return (
    <label htmlFor={`toggle-button-${props.keyId}`}
      className="flex items-center bg-gray-300 relative w-7 h-4 rounded-full cursor-pointer select-none shadow-inner shadow-gray-400/50">
      <div className={`w-3 h-3 rounded-full absolute inline-block bg-white z-10 transition-all duration-300 drop-shadow-lg ${active ? 'left-3.5' : 'left-0.5'}`}></div>
      <div className={`absolute left-0 h-4 inline-block bg-gray-700 rounded-full z-0 transition-all duration-300 shadow-inner shadow-gray-100/20 ${active ? 'w-7' : 'w-4 bg-transparent'}`}></div>
      <input id={`toggle-button-${props.keyId}`} type="checkbox" onChange={handlerOnChange} hidden />
    </label>
  )
}

export default ToggleButton
