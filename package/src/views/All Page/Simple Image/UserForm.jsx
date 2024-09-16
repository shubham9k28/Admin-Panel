import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './style.css'

const UseForm = () => {


    let blankObj = { _id: 0, UserImage: "", firstName: "", lastName: "", age: "", image: '', hobbies: [], gender: "", city: "" }
    let [obj, setObj] = useState({ ...blankObj });

    let [ary, setAry] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        CallApi();
    }, []);

    useEffect(() => {
        if (id) {
            let editObj = ary?.find((z) => z._id == id);
            console.log(editObj, "edit");
            if (editObj) {
                setObj({ ...editObj });
            }
        }
    }, [ary, id]);

    let CallApi = () => {
        axios.get('https://student-api.mycodelibraries.com/api/user/get').then((res) => {
            setAry([...res.data.data]);
        }).catch((error) => {
            console.log(error, 'error');
        })
    }


    let handleChange = (x) => {

        if (x?.target?.name == "hobbies") {

            if (x?.target?.checked) {
                obj.hobbies = [...obj?.hobbies, x?.target?.value];
            }
            else {
                obj.hobbies = obj?.hobbies?.filter((Hoobie) => Hoobie != x.target.value);
            }
        }
        else if (x.target.type == 'file') {
            obj.image = x.target.files[0];
        }

        else {
            obj[x.target.name] = x?.target?.value;
        }
        setObj({ ...obj });
    }


    let save = () => {
        let form = new FormData();

        form.append("id", obj?._id)
        form.append("firstName", obj?.firstName)
        form.append("lastName", obj?.lastName)
        form.append("age", obj?.age)
        form.append("userImage", obj?.image)
        form.append("gender", obj?.gender)
        form.append("hobbies", obj?.hobbies)
        form.append("city", obj?.city)
        console.log(obj.image);

        if (obj._id == 0) {
            axios.post("https://student-api.mycodelibraries.com/api/user/add", form).then(() => {
                ary.push(obj);
                CallApi();
            });
        }
        else {
            obj.id = obj?._id;
            axios.post("https://student-api.mycodelibraries.com/api/user/update", form).then(() => {

                CallApi();
            });
        }
        console.log(obj.image);
        setAry([...ary]);
        setObj({ ...blankObj });
    }

    return (
        <div className='userform'>
        <div className=" w-75 mx-auto  p-3 inn1 rounded-5 cnp ">
            <div className='inn2 w-75 mx-auto  rounded-5'>
            <form className=" w-100 mx-auto mt-5 mb-5 p-5  rounded-5 cnp ">


                <label className='slc'>firstName </label><br />
                <input type="text" value={obj.firstName} name='firstName' id='firstName' onChange={handleChange}  className='w-100 p-2 rounded-pill border inp '/><br />

                <label className='mt-2 slc' >lastName  </label><br />
                <input type="text" value={obj.lastName} name='lastName' id='lastName' onChange={handleChange} className='w-100 p-2 rounded-pill border  inp'/><br />

                <label className='mt-2 slc'>age  </label><br />
                <input type="number" value={obj.age} name='age' id='age' onChange={handleChange} className='w-100 p-2 rounded-pill border  inp'/><br />

                <label className='mt-2 slc'>city  </label><br />
                <input type="text"  value={obj.city} name='city' id='city' onChange={handleChange} className='w-100 p-2 rounded-pill border  inp'/><br />



                <label className='mt-2 slc'>Hobbies</label>
                <br />
                <input type="checkbox"  checked={obj.hobbies.includes("travel")} value="travel" name='hobbies' id='travel' onChange={handleChange} />
                <label className='ms-1 me-1 mt-1 slc' htmlFor="travel">Travel  </label>
                <input type="checkbox"  checked={obj.hobbies.includes("read")} value="read" name='hobbies' id='read' onChange={handleChange} />
                <label className='ms-1 slc' htmlFor="read">Read  </label><br />
                <input type="checkbox"  checked={obj.hobbies.includes("write")} value="write" name='hobbies' id='write' onChange={handleChange} />
                <label className='ms-1 me-1 slc' htmlFor="write">Write  </label>
                <input type="checkbox"  checked={obj.hobbies.includes("cricket")} value="cricket" name='hobbies' id='cricket' onChange={handleChange} />
                <label className='ms-1 slc' htmlFor="cricket">Cricket  </label>
                <br />

                <label className='mt-3 slc'>Gender</label>
                <br />
                <input type="radio" className='mt-1 me-1 slc' value="male" checked={obj.gender.includes("male")} name='gender' id='male' onChange={handleChange} /><label className='slc'>Male</label> 
                <input type="radio" className='ms-1 slc' value="female" checked={obj.gender.includes("female")} name='gender' id='female' onChange={handleChange} /><label className='slc'>Female</label> 
              
              
              <br />


                <br />

                <label htmlFor="image" className='slc'>UserImage   </label><br />
                <input type="file" className='me-1 p-2 input_classform fs-6 w-100 slc' name='image' id='image ' onChange={handleChange} />

                <Link to='/usertable' className='btn btn-primary mt-2 slc' onClick={save} type='button' >SAVE</Link>




            </form>
        </div>
        </div>

        </div>
    )
}

export default UseForm
