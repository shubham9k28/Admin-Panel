import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
// import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import user1 from './new only logo.png';
import user2 from './logo 1.png';
import { context } from "../App";
import Swal from "sweetalert2";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let { log, setLog } = useContext(context);

  let navigate = useNavigate();
  return (
    <Navbar light expand="md" className="fix-header rounded-pill " id="header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none ">
          {/* <Logo /> */}
          <img

            src={user2}
            alt="profile"
            className=""
            width="240"
            height="80"

          ></img>
        </div>
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto ms-2" navbar>

          {
            !(localStorage.getItem('loginObj')) ?

              <>
                <NavItem>
                  <Link to="/login" className="btn pt-2 link_header fw-bolder fs-5">
                    Login
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/register" className="btn pt-2 link_header fw-bolder fs-5">
                    Register
                  </Link>
                </NavItem>
              </>

              :

              <>
                <div className="rounded-pill  d-flex" >
                  <NavItem>
                    <Link to="/starter" className="btn pt-2  link_header fw-bolder fs-5">
                      Dashboard
                    </Link>
                  </NavItem>

                  <NavItem>
                    <Link to="*" className="btn pt-2 link_header fw-bolder fs-5" >
                      About
                    </Link>
                  </NavItem>

                  <NavItem>
                    <Link to="/profile" className="btn pt-2 link_header fw-bolder fs-5">
                      Profile
                    </Link>
                  </NavItem>


                </div>
              </>

          }

        </Nav>



        {
          (localStorage.getItem('loginObj')) ?

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="transparent">
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                ></img>
              </DropdownToggle>
              <DropdownMenu className="border border-0 shadow">
                <DropdownItem><Link to={'/profile'} style={{ textDecoration: "none", color: "black" }}>My Account</Link></DropdownItem>

                <DropdownItem onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Logout!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "ed!",
                        text: "Your file has been Logout.",
                        icon: "success"
                      }).then((res) => {
                        setLog(localStorage.removeItem('loginObj'));
                        navigate('/login');
                      });
                    }
                  });

                }}>Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
            :
            <h1></h1>
        }

      </Collapse>
    </Navbar>
  );
};

export default Header;
