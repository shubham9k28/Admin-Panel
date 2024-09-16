import React, { useContext, useEffect, useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';
import './lodinstyle.css'

const LoginPage = () => {
    let [obj, setObj] = useState({ email: "", password: "" });
    let [logininfo, setLogininfo] = useState(JSON.parse(localStorage.getItem("logininfo")) || []);
    const reg_ary = JSON.parse(localStorage.getItem("reg_ary")) || [];

    const [err, setErr] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    // const context = createContext();
    // const {store , setStore} = useContext(context);
    // const {log , setLoginfo} = useState(store);
    const Navigate = useNavigate();
    const {log ,setLog} = useContext(context)


    useEffect(() => {
        if (Object.keys(err).length === 0 && submitting) {
            finalSubmit();
            
        }
    }, [err]);


    const validation = (value) => {
        const err = {};
        if (!value.email || !value.password) {
            if (!value.email) {
                err.email = "Please fill email";
            }
            if (!value.password) {
                err.password = "Please fill password";
            }
        }
        else if (value.email && value.password) {
            let findUser = reg_ary.find((user) => user.email == value.email);
            if (!findUser) {

                err.password = "incorrect password or email";
                err.email = "incorrect email or password";
            }
            else if (value.password !== findUser.password) {
                err.password = "incorrect password";
            }
        }

        return err;
    };

    let ChangeData = (x) => {
        obj[x.target.name] = x.target.value;
        setObj({ ...obj });
    };
    const save = (e) => {
        // console.log(save);
        e.preventDefault();
        setErr(validation(obj));
        setSubmitting(true);

    }
   

    const finalSubmit = () => {
        Navigate('/profile');
        setObj({ ...obj });
        localStorage.setItem("loginObj", JSON.stringify(obj));
        setLog(obj)
        logininfo.push(obj);
        setLogininfo([...logininfo]);
        localStorage.setItem("logininfo", JSON.stringify(logininfo));
        // console.log(login_ary, "login_ary");
        // setStore(JSON.parse(localStorage.getItem('loginObj')));        

    }

    return (
        <>
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden '>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The best Place <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>

                    </MDBCol>

                    <MDBCol md='6' className='position-relative'>

                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <MDBCard className='my-5 bg-glass mt-5'>
                            <MDBCardBody className='p-5'>


                                <MDBInput wrapperClass='mb-4' placeholder='Email' id='form3' type="email" name="email" onChange={ChangeData} value={obj.email} />
                                {err.email && <p className="text-danger">{err.email}</p>}
                                <MDBInput wrapperClass='mb-4' placeholder='Password' type="password" name="password" id="password" onChange={ChangeData} value={obj.password} />
                                {err.password && <p className="text-danger">{err.password}</p>}

                                <div className='d-flex justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                                </div>


                                <div className="text-center">
                                    <MDBBtn className='w-100 mb-0' onClick={save} type="submit">SIGN IN</MDBBtn>
                                    <p className='mt-3'>OR</p>
                                    <Link to={'/register'} className=' btn btn-info w-100 '  >New User Register</Link>



                                </div>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </>
    )
}
export default LoginPage
