import ReactDOM from 'react-dom'
import GlobalStyles from '../components/GlobalStyles'

function Portal({ children }) {
  const domElement = document.getElementById('portal')
  children = <GlobalStyles>{children}</GlobalStyles>

  return (
    ReactDOM.createPortal(children, domElement)
  )
}

export default Portal
