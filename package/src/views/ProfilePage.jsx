import React from 'react'
import '../views/All Page/Simple Image/style.css'

const ProfilePage = () => {

  const obj = JSON.parse(localStorage.getItem("loginObj")) || {};
  const reg_ary = JSON.parse(localStorage.getItem("reg_ary")) || [];

  let user = reg_ary.find(((x) => x.email == obj.email));
  console.log(user);


  return (



    <div className='profile'>  
    <div style={{ backgroundColor: 'white' ,  width : "350px" , marginLeft: '260px'}} className=' text-center shadow-lg p-4 rounded-5 mt-5'>
    
    
      <div className=' text-center shadow-lg p-4 rounded-5 ' style={{ }}>
      {
        <div >
          <h4 className='fw-bolder text-danger fs-3'> User Informatioin</h4>
          <img id='img_profile' src={user.profile} alt="Profile" width={150} height={140}  className='mt-2' />
          <h6 className="pt-3 fw-bolder fs-4">{user.fname} {user.lname}</h6>
          <div className='w-50 mx-auto text-start'>
            <h6 className="pt-3 fw-bolder" >Email: <span>{user.email}</span></h6>
            <h6 className="pt-3 fw-bolder">Gender: <span style={{ fontWeight: "400" }}>{user.gender}</span></h6>
            <h6 className="pt-3 fw-bolder">Age: <span style={{ fontWeight: "400" }}>{user.age}  years</span></h6>
            <h6 className="pt-3 fw-bolder">City: <span style={{ fontWeight: "400" }}>{user.city}</span></h6>

          </div>
        </div>
      }
    </div>
    </div>
    </div>
  )
}

export default ProfilePage
