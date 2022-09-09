import { API_BASE } from '../constants'

function getEmployees({
  pageSize = 15, pageNumber = 1, employeeFilter = ""
}, callback) {
  const url = `${API_BASE}Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${employeeFilter}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (typeof callback === 'function') {
        callback(data)
      }
    })
    .catch((error) => {
      console.log('Error: ', error)
      if (typeof callback === 'function') {
        callback(undefined)
      }
    })
}
const CallApi = {
  getEmployees
}
export default CallApi
