import { useCallback } from "react"
import { useState } from "react"

function ToggleButton(props) {
  const [isCheck, setIsCheck] = useState(false)

  const handlerClick = useCallback((e) => {
    console.log(e)
    if (typeof props.onClick === 'function') {
      props.onClick(!isCheck)
    }
    setIsCheck(!isCheck)
  })
  return (
    <button className="rounded-full bg-white relative z-10 border flex items-center border-gray-200 h-6 w-14"
      onClick={handlerClick}>
      <span className={`transform duration-300 inline-block z-10 bg-gray-500 h-6 w-6 rounded-full border border-gray-400 ${isCheck ? 'ml-8' : 'ml-0.5'}`}></span>
      <div className={`absolute ${isCheck ? 'w-14 opacity-1' : 'w-6 opacity-0'} transform duration-300 bg-gray-700 rounded-full h-6 left-0 z-0 inline-block`}>

      </div>
      <div className={`absolute ${isCheck ? 'w-6 opacity-0' : 'w-14 opacity-1'} transform duration-300 bg-gray-200 rounded-full h-6 right-0 z-0 inline-block`}>

      </div>
    </button>
  )
}
export default ToggleButton
