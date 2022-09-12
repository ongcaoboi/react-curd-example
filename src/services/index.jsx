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

async function getEmploy(id) {
  if (id) {
    const url = `${API_BASE}Employees/${id}`
    const response = await fetch(url);
    return await response.json()
  }
}

async function updateEmploy(id, employ) {
  if (id) {
    const url = `${API_BASE}Employees/${id}`
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employ)
    }
    const response = await fetch(url, requestOptions)
    return await response.text()
  }
}

async function deleteEmploy(id) {
  if (id) {
    const url = `${API_BASE}Employees/${id}`
    const requestOptions = {
      method: 'DELETE',
    }
    const response = await fetch(url, requestOptions)
    return await response.text()
  }
}

async function getNewCode() {
  const url = `${API_BASE}Employees/NewEmployeeCode`
  const response = await fetch(url)
  return await response.text()
}

async function createEmploy(employ) {
  if (employ) {
    const newCode = await getNewCode()
    employ.EmployeeCode = newCode
    const url = `${API_BASE}Employees`
    console.log(employ)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employ)
    }
    const response = await fetch(url, requestOptions)
    return await response.text()
  }
}

const CallApi = {
  getEmployees,
  getEmploy,
  updateEmploy,
  createEmploy,
  deleteEmploy
}
export default CallApi
