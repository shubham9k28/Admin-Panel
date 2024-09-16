
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import image from  './Registerimage.jpg';

const RegisterPage = () => {

    let blankObj = { id: 0, fname: "", lname: "", age: "", city: "", email: "", password: "", hobby: [], gender: "" };
    let [obj, setObj] = useState({...blankObj});

    let [reg_ary, setReg_ary] = useState(JSON.parse(localStorage.getItem("reg_ary")) || []);

    const { register, handleSubmit, formState: { errors },setError } = useForm();

    let navigate = useNavigate();

    const [verification, setVerification] = useState(null);



    const onSubmit = async (data) => {

        console.log(data.profile[0], "p");

        if (data.profile) {
            for (let x in data) {
                if (x == "profile") {

                    data[x] = data.profile[0] ? await toBase64(data.profile[0]) : "";
                }
            }
        } 
        
        // verification = reg_ary.find((x) => x.email == data.email);

        const found = reg_ary.find((x) => x.email == data.email);
        setVerification(found);
        if (found) {
            setError('email', { type: 'manual', message: 'Email already exists' });
        } else {
            obj = data;
            setObj({...obj});

            reg_ary.push(obj);

            setReg_ary([...reg_ary]);
            localStorage.setItem('reg_ary', JSON.stringify(reg_ary));

            console.log(reg_ary, "ary");

            navigate('/login');
        }


    };

    let toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


    return (
<>
<div className='d-flex shadow-lg'>
        <div className='w-50 mt-4'>
        <div className="rounded-pill">

            <form className="container row p-2 " onSubmit={handleSubmit(onSubmit)} >
                <div className="col-6 px-5">
                    {/* <label className="w-100 rounded-3" htmlFor="fname">First Name</label> */}
                    <input {...register("fname", { required: "First Name is required" })} placeholder='First Name' className=" p-3 border rounded-3 mt-2" style={{width:'250px'}} type="text" name="fname" id="fname" />
                    {
                        errors.fname && <p className='text-danger fs-6 ps-2 pt-1'>{errors.fname.message}</p>
                    }

                    {/* <label className="w-50 rounded-3 mt-1" htmlFor="age">Age</label> */}
                    <input {...register("age", { required: "Age is required" })} placeholder='Age' className=" p-3 border rounded-3 mt-4" style={{width:'250px'}} type="number" name="age" id="age" />
                    {
                        errors.age && <p className='text-danger fs-6 ps-2 pt-1'>{errors.age.message}</p>
                    }
                </div>

                <div className="col-6 px-5">
                    {/* <label className="classform_label my-1" htmlFor="lname">Last Name</label> */}
                    <input {...register("lname", { required: "Last Name is required" })} placeholder='Last Name' className=" p-3 border rounded-3 mt-2" style={{width:'250px'}} type="text" name="lname" id="lname" />
                    {
                        errors.lname && <p className='text-danger fs-6 ps-2 pt-1'>{errors.lname.message}</p>
                    }
                    {/* <label className="classform_label my-1" htmlFor="city">City</label> */}
                    <input {...register("city", { required: "City is required" })} placeholder='City' className=" p-3 border rounded-3 mt-4" style={{width:'250px'}} type="text" name="city" id="city" />
                    {
                        errors.city && <p className='text-danger fs-6 ps-2 pt-1'>{errors.city.message}</p>
                    }
                </div>

                <div className="col-6 px-5">

                    {/* <label className="classform_label " htmlFor="email">email</label> */}
                    <input {...register("email", { required: "Email is required" })} placeholder='Email' className=" p-3 border rounded-3 mt-4" style={{width:'250px'}} type="email" name="email" id="email" />
                    {
                        errors.email && <p className='text-danger fs-6 ps-2 pt-1'>{errors.email.message}</p>
                    }
                    {/* <label className="classform_label my-1" htmlFor="password">Password</label> */}
                    <input {...register("password", { required: "Password is required" })} placeholder='Password' className=" p-3 mt-4 border rounded-3" style={{width:'250px'}} type="password" name="password" id="password" />
                    {
                        errors.password && <p className='text-danger fs-6 ps-2 pt-1'>{errors.password.message}</p>
                    }
                </div>

                <div className="col-6 px-5">
                    {/* --- GENDER ---  */}

                    <label className="classform_label mt-3 mb-2">Gender</label><br />

                    <input type="radio" name="gender" value="Female" {...register("gender", { required: "gender is required" })} />
                    <label >Female</label>
                    <input type="radio" name="gender" value="Male" {...register("gender", { required: "gender is required" })}  />
                    <label >Male</label>
                    <br />
                    <input type="radio" name="gender" value="Other" {...register("gender", { required: "gender is required" })}  />
                    <label >Other</label>
                    {
                        errors.gender && <p className='text-danger fs-6 ps-2 pt-1'>{errors.gender.message}</p>
                    }

                </div>
                <div className="col-12 px-5 pt-2">
                    <label className="mb-2 classform_label">Profile</label><br />
                    <input {...register("profile", { required: "Profile is required" })} type="file" name="profile" className="input_classform w-100 p-2 fs-6" />
                    {
                        errors.profile && <p className='text-danger fs-6 ps-2 pt-1'>{errors.profile.message}</p>
                    }

                </div>
<div className='text-center mt-4'>
            
                <button type='submit' className="btn btn-primary w-75 text-center   ">REGISTER</button>
                <p className='mt-3'>OR</p>
                <Link to={'/login'} className='btn btn-info w-75'>SIGN IN</Link>
                </div>
            </form>

        </div>
        </div>
        <div className='w-50'>
            {
                <img src={image}
                height={'650px'}
                width={'100%'}
                >
                </img>
            }
        </div>
        </div>
    </>
    )
}

export default RegisterPage

