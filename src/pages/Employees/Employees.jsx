import React from 'react'
import CallApi from '../../services'
import './Employees.scss'
import Paginate from '../../components/Paginate'
import { Link } from 'react-router-dom'

const defaultPageInfo = {
  totalPage: 0,
  totalRecord: 0,
  currentPage: 0
}

function Employees() {
  const pageSize = 10
  const [searchName, setSeachName] = React.useState('')
  const [pageInfo, setPageInfo] = React.useState(defaultPageInfo)
  const [employees, setEmployees] = React.useState([])
  const isCallApi = React.useRef(false)

  React.useEffect(() => {
    getData()
  }, [])

  const getData = (pageNumber = 1, searchName) => {
    if (isCallApi.current) {
      return
    }
    isCallApi.current = true
    CallApi.getEmployees({ pageSize: pageSize, pageNumber: pageNumber, employeeFilter: searchName }, (data) => {
      if (data) {
        setEmployees(data.Data)
        setPageInfo({
          totalPage: data.TotalPage,
          totalRecord: data.TotalRecord,
          currentPage: data.CurrentPage
        })
      } else {
        setEmployees([])
        setPageInfo(defaultPageInfo)
      }
      isCallApi.current = false
    })
  }

  const handlerDelete = (id) => {

    setEmployees(prev => {
      const fetchApi = async () => {
        await CallApi.deleteEmploy(id)
      }
      fetchApi()
      return prev.filter(item => item.EmployeeId !== id)
    })
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <div className="flex">
          <h1>Employees page</h1>
          <Link
            className="px-2 bg-green-500 rounded text-white ml-2 hover:opacity-60"
            to='edit/null'>
            New
          </Link>
        </div>
        <div className="flex justify-between">
          <input
            className="border-gray-600 border-2 rounded-lg px-2"
            type="text"
            value={searchName}
            onChange={(e) => {
              setSeachName(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                getData(1, searchName)
              }
            }}
          />
          <button
            className="px-2 bg-blue-500 rounded text-white ml-2 hover:opacity-60"
            onClick={() => {
              getData(1, searchName)
            }}
          >Search</button>
        </div>
      </div>
      <div className="block">
        <table className="table-fixed">
          <thead className="table-header-group">
            <tr className="bg-blue-50">
              <th>STT</th>
              <th>Employ Code</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employ, index) => {
              return (
                <tr className="odd:bg-gray-100 even:bg-slate-50" key={index}>
                  <td>{++index}</td>
                  <td>{employ.EmployeeCode}</td>
                  <td>{employ.FullName}</td>
                  <td>{employ.Gender === 0 ? 'Male' : employ.Gender === 1 ? 'Female' : ''}</td>
                  <td>{
                    (() => {
                      let date = new Date(employ.DateOfBirth)
                      return date.toISOString().split('T')[0]
                    })()
                  }</td>
                  <td>{employ.PhoneNumber}</td>
                  <td>{employ.Email}</td>
                  <td>{employ.Address}</td>
                  <td>
                    <div className="flex">
                      <Link
                        className="mr-3 rounded bg-blue-400 text-white py-1 px-5 hover:opacity-60"
                        to={`/employees/edit/${employ.EmployeeId}`} >
                        Edit
                      </Link>
                      <button
                        className="rounded bg-red-400 text-white py-1 px-5 hover:opacity-60"
                        onClick={() => handlerDelete(employ.EmployeeId)}
                      >Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {employees.length === 0 ?
          <div className="flex py-2">
            <h1 className="text-xl my-0 mx-auto">Data employees is empty!</h1>
          </div>
          : ''}
      </div>
      <Paginate totalPage={pageInfo.totalPage} currentPage={pageInfo.currentPage}
        callback={(page) => {
          getData(page, searchName)
        }} />
    </div>
  )
}

export default Employees
