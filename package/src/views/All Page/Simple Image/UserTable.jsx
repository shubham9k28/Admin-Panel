import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTable = () => {

  let blankObj = { _id: 0,UserImage: "", firstName: "", lastName: "", age: "", image: '', hobbies: [], gender: "", city: "" }
    let [obj, setObj] = useState({ ...blankObj });

    let [ary, setAry] = useState([]);

    useEffect(() => {
      CallApi();
  }, [ary]);


  let CallApi = () => {
      axios.get('https://student-api.mycodelibraries.com/api/user/get').then((res) => {

          setAry([...res.data.data]);

      }).catch((error) => {
          console.log(error, 'error');
      })
  }

    let del = (x) => {

      axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${x}`).then(() => {
          CallApi();
      }).catch((error) => {
          console.log("error", error);
      });

  }


  return (
    <div>
       <table className='table table-hover fs-6 class_table mt-2'>
                <thead>

                    <tr>
                        <th>id</th>
                        <th>UserImage</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>City</th>
                        <th>Age</th>
                        <th>Hobbies</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {ary.map((x, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                           <td><img src={x.image} style={{width: '60px'}} /></td>
                            <td>{x.firstName}</td>
                            <td>{x.lastName}</td>
                            <td>{x.city}</td>
                            <td>{x.age}</td>
                            <td>{x.hobbies}</td>
                            <td>{x.gender}</td>
                            <td>
                                <Link type='button' to={`/userform/${x._id}`} className='btn btn-success me-2'>Edit</Link>
                                <button type='button' onClick={() => del(x._id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
    </div>
    
  )
}

export default UserTable
