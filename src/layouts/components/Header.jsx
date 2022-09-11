import { Link } from "react-router-dom"
import config from '../../config'
import { ToggleButton } from '../../components/Buttons'

function Header() {
  return (
    <div className="h-14 bg-blue-600 text-white flex items-center justify-between px-10 py-2">
      <div className="flex items-center justify-evenly">
        <Link className="mr-5 text-xl font-bold" to={config.routes.home}>
          Home
        </Link>

        <Link className="mr-5 font-bold" to={config.routes.employees}>
          Employees
        </Link>
        <Link to='./hihi'>Test</Link>
      </div>
      <div className="flex items-center justify-end">
        <ToggleButton />
      </div>
    </div>
  )
}

export default Header
