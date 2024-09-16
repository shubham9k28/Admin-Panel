import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Callapi, InsertToken, UpdateData } from './Action/Action'
import './Reduxstyle.css'

const TokenForm = () => {
  let state = useSelector((data) => data?.token?.tokenData)
  const blank = {id: 0, name: "",email: "",gender: "",status: ""}

  const params = useParams();
  const dispatch = useDispatch()
  const [obj, setobj] = useState({ ...blank })
  const inputChange = (e) => {
    console.log(e)
    obj[e.target.name] = e.target.value
    setobj({ ...obj })
  }
  const saveData = () => {
    if (obj.id == 0) {
      dispatch(InsertToken(obj))
    } else {
      dispatch(UpdateData(obj))
    }
  }
  useEffect(() => {
    dispatch(Callapi())
  }, [])
  useEffect(() => {
    editData();
  }, [params.id, state]);

  const editData = () => {
    if (params.id) {
      let editObj = state.find(x => x.id == params.id)
      if (editObj) {
        setobj({ ...editObj })
      }
    }
  }

  return (
    <div className='inp'>
      <div className='cls w-50 ms-5 mt-5 rounded-3'>
    <div className="w-100  mt-5" >
      <form className="p-5 ">


        <label htmlFor="name" className="w-100 mt-2 mb-1 fs-6 fw-bolder">Name</label>
        <input onChange={inputChange} type="text" value={obj.name} name='name' className="input_classform p-2 w-100  rounded-3 border" id="name" />

        <label htmlFor="email" className="w-100 mt-2 mb-1 fs-6 fw-bolder">Email</label>
        <input onChange={inputChange} type="email" value={obj.email} name='email' className="input_classform p-2 w-100 rounded-3 border" id="email" />


        <br />
        <label className='w-100 mt-2 mb-1 fs-6 fw-bolder'>Gender</label>

        <input onChange={inputChange} checked={obj.gender == "male"} className='me-1' value={"male"} type="radio" name="gender" />
        <label className='fs-6'>Male</label>
        <input onChange={inputChange} checked={obj.gender == "female"} className='me-1 ms-3' value={"female"} type="radio" name="gender" />
        <label className='fs-6'>Female</label>
        <input onChange={inputChange} checked={obj.gender == "other"} className='me-1 ms-3' value={"other"} type="radio" name="gender" />
        <label className='fs-6'>Other</label>


        <br />
        <label className='w-100 mt-2 mb-1 fs-6 fw-bolder'>Status</label>

        <input onChange={inputChange} checked={obj.status == "active"} className='me-1' value={"active"} type="radio" name="status" />
        <label className='fs-6'>Active</label>
        <input onChange={inputChange} checked={obj.status == "inactive"} className='me-1 ms-3' value={"inactive"} type="radio" name="status" />
        <label className='fs-6'>InActive</label>

        <Link type="button" className="btn btn-outline-light w-100 mt-4" onClick={saveData} to={"/tokentable"}>SAVE</Link>
  

      </form>

    </div>
    </div>
    </div>
  )
}

export default TokenForm 