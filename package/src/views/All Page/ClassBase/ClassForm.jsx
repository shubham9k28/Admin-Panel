import { Component } from "react";
import { Link } from "react-router-dom";
import WithRoute from "./WithRoute";
import '../ClassBase/style.css'
class ClassForm extends Component {

    constructor() {
        super();
        this.state = {
            ary: JSON.parse(localStorage.getItem("ary")) || [],
            count: JSON.parse(localStorage.getItem("count")) || 0,
            blankObj: { id: 0, profile: "", fname: "", email: "", password: "", city: "", gender: "", hobby: [] },
            obj: { id: 0, fname: "", profile: "", email: "", password: "", city: "", gender: "", hobby: [] },
        }
    }
    componentDidMount() {
        let { id } = this.props.params;
        if (id) {
            let editObj = this.state.ary.find((x) => x.id == id);
            if (editObj && this.state.obj.id == 0) {
                this.setState({ obj: editObj });
            }
        }
    }

    handleChange = async (x) => {

        if (x?.target?.name == "hobby") {

            if (x?.target?.checked) {
                this.state.obj.hobby = [...this.state.obj.hobby, x.target.value]
            }
            else {
                this.state.obj.hobby = this?.state?.obj?.hobby?.filter((z) => z != x.target.value);
            }

        }
        else if (x.target.name == "profile") {
            this.state.obj.profile = x.target.files[0] ? await this.toBase64(x.target.files[0]) : "";
        }
        else {
            this.state.obj[x.target.name] = x.target.value;
        }
        this?.setState({ obj: { ...this?.state?.obj } });
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    save = () => {
        if (this?.state?.obj?.id == 0) {

            let c1 = this?.state?.count;
            c1 += 1;
            this.state.obj.id = c1;
            this?.setState({ count: c1 });

            this?.state?.ary?.push(this?.state?.obj);
            localStorage.setItem("count", JSON.stringify(c1));

        }
        else {
            this.state.obj._id = this.state.obj.id;
            let i = this?.state?.ary?.findIndex((x) => x.id == this?.state?.obj.id);
            this?.state?.ary?.splice(i, 1, this?.state?.obj);
        }

        localStorage.setItem("ary", JSON.stringify(this?.state?.ary));

        this?.setState({ obj: { ...this?.state?.blankObj } });
        this?.setState({ ary: [...this?.state?.ary] });
    }

    render() {
        return (
            <>
            <div className="classform">
                <div className="shadow-lg w-75 mx-auto mt-4 p-3 inner1 rounded-5">
                    <form className="w-75 mx-auto mt-4 mb-4  px-3 p-5 rounded-5 inner ">
                        <label htmlFor="fname" className=" fw-normal">Fname</label><br />
                        <input type="text" value={this.state.obj.fname} name="fname" onChange={this.handleChange} id="fname" className="w-100 border rounded-pill p-2 shadow-lg " /><br />

                        <label htmlFor="email" className="mt-2 fw-normal">Email</label><br />
                        <input type="email" value={this.state.obj.email} name="email" onChange={this.handleChange} id="email" className="w-100 border rounded-pill p-2 shadow-lg" /><br />

                        <label htmlFor="password" className="mt-2 fw-normal">Password</label><br />
                        <input type="password" value={this.state.obj.password} name="password" onChange={this.handleChange} id="password" className="w-100 border rounded-pill p-2 shadow-lg" /><br />

                        <label htmlFor="city" className="mt-2 fw-normal">City</label><br />
                        <input type="text" value={this.state.obj.city} name="city" onChange={this.handleChange} id="city" className="w-100 border rounded-pill p-2 shadow-lg" /><br />

                        <label htmlFor="gender" className="mt-2 fw-normal">Gender</label><br />
                        <input type="radio" value="male" name="gender" onChange={this.handleChange} checked={this.state.obj.gender.includes("male")} id="male" />
                        <label htmlFor="male" className="mt-1 me-2">Male</label>
                        <input type="radio" value="female" name="gender" onChange={this.handleChange} checked={this.state.obj.gender.includes("female")} id="female" />
                        <label htmlFor="female" className=" me-2">Female</label>
                        <input type="radio" value="other" name="gender" onChange={this.handleChange} checked={this.state.obj.gender.includes("other")} id="other" />
                        <label htmlFor="other">other</label>


                        <br />
                        <label htmlFor="hobby" className="mt-3 fw-normal">Hobby</label><br />
                        <input type="checkbox" value="read" name="hobby" onChange={this.handleChange} checked={this.state.obj.hobby.includes("read")} id="read" />
                        <label htmlFor="read" className="mt-1 ms-1 me-4">Read </label>
                        <input type="checkbox" value="write" name="hobby" onChange={this.handleChange} checked={this.state.obj.hobby.includes("write")} id="write" />
                        <label htmlFor="write" className="ms-1">Write</label><br />
                        <input type="checkbox" value="dance" name="hobby" onChange={this.handleChange} checked={this.state.obj.hobby.includes("dance")} id="dance" />
                        <label htmlFor="dance" className="me-3 ms-1">Dance</label>
                        <input type="checkbox" value="travel" name="hobby" onChange={this.handleChange} checked={this.state.obj.hobby.includes("travel")} id="travel" />
                        <label htmlFor="travel" className="ms-1">Travel</label>

                        <br />
                        <label className="mb-2 classform_label mt-2">Profile</label><br />
                        <input onChange={this.handleChange} type="file" name="profile" className="input_classform w-100 p-2 fs-6 " />
                        <br />


                        <Link to={'/classtable'} className="btn btn-outline-dark mt-3" onClick={this.save}>SAVE</Link>
                
                    </form>
                </div>
                </div>
            </>
        )
    }
}

export default WithRoute(ClassForm);

