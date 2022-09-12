import { useEffect } from 'react'
import { useState } from 'react'
import './Edit.scss'
import CallApi from '../../services'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import { useLocation } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

function Edit() {
  let isNew = true
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  // const { employeeId } = useParams()
  const employeeId = query.get("employId")
  if (employeeId) {
    isNew = false
  }
  const [employ, setEmploy] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const result = await CallApi.getEmploy(employeeId)
      setEmploy(result)
    }

    if (!isNew) {
      fetchApi()
    } else {
      setEmploy({
        EmployeeCode: '',
        FullName: '',
        Gender: null,
        DateOfBirth: '',
        PhoneNumber: '',
        Email: '',
        Address: ''
      })
    }
  }, [employeeId, isNew])

  const handlerSave = () => {
    const fetchApi = async () => {
      if (isNew) {
        await CallApi.createEmploy(employ)
      } else {
        await CallApi.updateEmploy(employeeId, employ)
      }
      navigate(config.routes.employees)
    }
    fetchApi()
  }

  const handlerCancel = () => {
    navigate(config.routes.employees)
  }
  return (
    <div className="content-center">
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30 w-30">Employee Id:</p>
        <p className="w-80 px-1">{employ.EmployeeId}</p>
      </div>
      <div className="flex item-center justify-between my-5">
        <p>Full Name</p>
        <div className=" w-80 ">
          <input
            className="w-full border-gray-600 border-2 rounded-lg px-2"
            type="text"
            value={employ.FullName ? employ.FullName : ''}
            onChange={(e) => {
              setEmploy(prev => {
                return {
                  ...prev, FullName: e.target.value
                }
              })
            }}
          />
        </div>
      </div>
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30">Gender</p>
        <select
          className=" w-80 border-gray-600 border-2 rounded-lg px-2"
          value={`${employ.Gender !== 'null' ? employ.Gender : ''}`}
          onChange={(e) => {
            setEmploy(prev => {
              return {
                ...prev,
                Gender: e.target.value === '' ? null : Number.parseInt(e.target.value)
              }
            })
            console.log(employ)
          }}>
          <option value=""></option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </div>
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30">Phone number</p>
        <div className=" w-80 ">
          <input
            className="w-full border-gray-600 border-2 rounded-lg px-2"
            type="text"
            value={employ.PhoneNumber ? employ.PhoneNumber : ''}
            onChange={(e) => {
              setEmploy(prev => {
                return {
                  ...prev, PhoneNumber: e.target.value
                }
              })
            }}
          />
        </div>
      </div>
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30">Email</p>
        <div className=" w-80 ">
          <input
            className="w-full border-gray-600 border-2 rounded-lg px-2"
            type="text"
            value={employ.Email ? employ.Email : ''}
            onChange={(e) => {
              setEmploy(prev => {
                return {
                  ...prev, Email: e.target.value
                }
              })
            }}
          />
        </div>
      </div>
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30">Date Of Birth</p>
        <div className=" w-80 ">
          <input
            className="w-full border-gray-600 border-2 rounded-lg px-2"
            type="date"
            value={employ.DateOfBirth ?
              (new Date(employ.DateOfBirth)).toISOString().split('T')[0] : ''}
            onChange={(e) => {
              setEmploy(prev => {
                return {
                  ...prev, DateOfBirth: e.target.value
                }
              })
            }}
          />
        </div>
      </div>
      <div className="flex item-center justify-between my-5">
        <p className="mr-5 w-30">Address</p>
        <div className=" w-80 ">
          <input
            className="w-full border-gray-600 border-2 rounded-lg px-2"
            type="text"
            value={employ.Address ? employ.Address : ''}
            onChange={(e) => {
              setEmploy(prev => {
                return {
                  ...prev, Address: e.target.value
                }
              })
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="rounded mr-5 bg-blue-400 text-white px-5 py-1 hover:opacity-60"
          onClick={handlerSave}
        >Save</button>
        <button
          className="rounded bg-gray-300 px-5 py-1 hover:opacity-60"
          onClick={handlerCancel}
        >Cancel</button>
      </div>
    </div>
  )
}

export default Edit
