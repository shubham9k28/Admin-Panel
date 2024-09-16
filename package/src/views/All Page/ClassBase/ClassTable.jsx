import { Component } from "react";
import { Link } from "react-router-dom";

class ClassTable extends Component{
    constructor() {
        super();
        this.state = {
            ary: JSON.parse(localStorage.getItem("ary")) || [],
            obj: { id: 0, fname: "", lname: "", email: "", password: "", hobby: [], gender: "" },
            blankObj: { id: 0, fname: "", lname: "", email: "", password: "", hobby: [], gender: "" },
            count: JSON.parse(localStorage.getItem("count")) || 0
        }
    }

    del = (i)=>{
        this.state.ary.splice(i,1);
        this.setState({ary:[...this.state.ary]});
        localStorage.setItem("ary",JSON.stringify(this.state.ary));
    }


    render(){
        return(
            <div className="Table mt-2 ">
            
                <table className="table table-striped fs-6 " id="class_table">
                    <thead >
                        <tr className="fw-bolder">
                            <th>Id</th>
                            <th>Profile</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Hobby</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.ary.map((x,i)=>{
                                return <>
                                    <tr key={i}>
                                        <td>{x.id}</td>
                                        <td><img src={x.profile} width={50} /></td>
                                        <td>{x.fname}</td>
                                        <td>{x.city}</td>
                                        <td>{x.email}</td>
                                        <td>{x.password}</td>
                                        <td>{x.hobby.join(",")}</td>
                                        <td>{x.gender}</td>
                                        <td>
                                            <button className="btn btn-danger me-2 fs-6" onClick={()=>this.del(i)}>DELETE</button>
                                            <Link to={`/classform/${x.id}`} className="btn btn-success fs-6">EDIT</Link>
                                        </td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

export default ClassTable;