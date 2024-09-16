import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../App";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Token Form",
    href: "/tokenform",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Token Table",
    href: "/tokentable",
    icon: "bi bi-table",
  },
  {
    title: "Class Form",
    href: "/classform",
    icon: "bi bi-ui-checks",
  },
  {
    title: "Class Table",
    href: "/classtable",
    icon: "bi bi-card-list",
  },
  {
    title: "User Form",
    href: "/userform",
    icon: "bi bi-ui-checks-grid",
  },
  {
    title: "User Table",
    href: "/usertable",
    icon: "bi bi-body-text",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "bi bi-person-fill",
    className : 'btn btn-info'
  }
];


let login = [
  {
    title: "Login",
    href: "/login",
    icon: "bi bi-person-vcard",
  },
  {
    title: "Register",
    href: "/register",
    icon: "bi bi-person-fill",
  },
  
];


const Sidebar = () => {

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();
  let navigate = useNavigate();
  let { log, setLog } = useContext(context);


  return (
    <div id="slider">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {
            !(localStorage.getItem('loginObj')) ?

              login.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "active nav-link py-3"
                        : "nav-link py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))

              :

              navigation.map((navi, index) => (
                <>

                  <NavItem key={index} className="sidenav-bg">
                    <Link
                      to={navi.href}
                      className={
                        location.pathname === navi.href
                          ? "active nav-link py-3"
                          : "nav-link py-3"
                      }
                    >
                      <i className={navi.icon}></i>
                      <span className="ms-3 d-inline-block">{navi.title}</span>
                    </Link>
                  </NavItem>

                </>
              ))

          }

        </Nav>
      </div>
    </div>
  );
};


export default Sidebar;
