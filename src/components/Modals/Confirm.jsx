import Portal from '../../portal'

function Confirm({
  title = 'Confirm',
  message = 'Confirm message',
  success,
  faile
}) {

  return (
    <Portal>
      <div className="fixed z-50 left-auto bg-gray-100 w-96 h-52">
        <div className="w-full h 16 flex items-center justify-between bg-gray-500" >
          <p className="text-white px-2 py-1">{title}</p>
          <button className="w-6 h-6 rounded font-bold mr-1 text-white bg-red-400 hover:opacity-60">x</button>
        </div>
      </div>
    </Portal>
  )
}

export default Confirm
