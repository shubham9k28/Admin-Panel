import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { DeleteData, Callapi } from './Action/Action'


const TokenTable = () => {
  let state = useSelector((data) => data.token.tokenData)

  console.log(state);
  const dispatch = useDispatch()

  const DeleteOBJ = (id) => {
    dispatch(DeleteData(id))
    console.log(id,'id');
    
  }
  useEffect(() => {
    dispatch(Callapi())
  }, []);


  return (
    <div>
      <div className="classtable">
        <table className="table table-striped table-hover fs-6 class_table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {
              state?.map((x, i) => {
                return (
                  <tr key={x + i}>

                    <td>{i + 1}</td>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                    <td>{x.gender}</td>
                    <td>{x.status}</td>
                    <td>
                      {/* <Link
                      type="button"
                      className="btn btn-outline-success me-2"
                      to={`/tokenform/${x.id}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteData(x.id)}>
                      Delete
                    </button>
                  </td> */}

                      <button type='button' className="btn btn-danger me-2"  onClick={() => DeleteOBJ(x.id)}>DELETE</button>
                      <Link to={`/tokenform/${x.id}`} className="btn btn-success" >EDIT</Link>
                    </td>

                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default TokenTable



