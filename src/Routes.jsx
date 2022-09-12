import Home from './pages/Home'
import Employees from './pages/Employees'
import NotFound from './pages/NotFound'
import Edit from './pages/Edit'
import config from './config'

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.employees, component: Employees },
  { path: config.routes.edit, component: Edit },
  { path: config.routes.notFound, component: NotFound, layout: null },
]

const privateRoutes = []

export {
  publicRoutes,
  privateRoutes
}
