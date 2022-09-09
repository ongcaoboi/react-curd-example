import React from 'react'
import CallApi from '../../services'
import './Employees.scss'
import Paginate from '../../layouts/components/Paginate'

const defaultPageInfo = {
  totalPage: 0,
  totalRecord: 0,
  currentPage: 0
}
function Employees() {
  const pageSize = 15
  const [searchName, setSeachName] = React.useState('')
  const [pageInfo, setPageInfo] = React.useState(defaultPageInfo)
  const [employees, setEmployees] = React.useState([])

  React.useEffect(() => {
    getData()
  }, [])

  const getData = (pageNumber = 1, searchName) => {
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
    })
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <h1>Employees page</h1>
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
            className="px-2 bg-blue-500 rounded-lg text-white ml-2 hover:opacity-60"
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
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employ, index) => {
              return (
                <tr className="odd:bg-gray-100 even:bg-slate-50" key={index}>
                  <td>{++index}</td>
                  <td>{employ.FullName}</td>
                  <td>{employ.Gender === 0 ? 'Male' : employ.Gender === 1 ? 'Female' : ''}</td>
                  <td>{employ.Email}</td>
                  <td>{employ.Address}</td>
                  <td>{
                    (() => {
                      let date = new Date(employ.DateOfBirth)
                      return date.toISOString().split('T')[0]
                    })()
                  }</td>
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
