import { BrowserRouter, Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";
// import Themeroutes from "./routes/Router";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import ClassForm from "./views/All Page/ClassBase/ClassForm";
import { Container } from "reactstrap";
import { createContext, useState } from "react";
import ClassTable from "./views/All Page/ClassBase/ClassTable";
// import Profile from "./views/All Pages/Profile";
import Starter from "./views/Starter.js";
import UserForm from "./views/All Page/Simple Image/UserForm.jsx";
import UserTable from "./views/All Page/Simple Image/UserTable";
import ProfilePage from "./views/ProfilePage.jsx";
import Page404 from "./views/All Page/Page404";
import LoginPage from "./views/LoginPage.jsx";
import RegisterPage from "./views/RegisterPage";
// import ProfilePage from "./views/ProfilePage.jsx";
import TokenForm from "./views/All Page/Redux/TokenForm.jsx";
import TokenTable from "./views/All Page/Redux/TokenTable.jsx";
export const context = createContext();


const App = () => {
  // const routing = useRoutes(Themeroutes);
  const obj = JSON.parse(localStorage.getItem("loginObj")) || {};
  let [log, setLog] = useState(obj);


  return (
    <>
      <main>
        <BrowserRouter>
          <context.Provider value={{ log, setLog }}>


            {/********header**********/}
            <Header />
            <div className="pageWrapper d-lg-flex">
              {/********Sidebar**********/}
              <aside className="sidebarArea shadow" id="sidebarArea">
                <Sidebar />
              </aside>
              {/********Content Area**********/}
              <div className="contentArea">
                <Routes>

                  {
                    !(localStorage.getItem('loginObj')) ?
                    <>
                        {/* ----------Dashboard----------- */}
                        <Route path="/" element={<Navigate to='/starter' />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Page404 />} />
                      </>
                      :
                      <>

                        <Route path="/starter" element={<Starter />} />
                        {/* ----------ClassBase----------- */}
                        <Route path="/classform" element={<ClassForm />} >
                          <Route path=":id" element={<ClassForm />} />
                        </Route>
                        <Route path="/classtable" element={<ClassTable />} />


                        {/* -------------UserApi------------- */}
                        <Route path="/userform" element={<UserForm />} >
                          <Route path=":id" element={<UserForm />} />
                        </Route>
                        <Route path="/usertable" element={<UserTable />} />


                        {/* --------------------Token--------------------- */}
                        <Route path="/tokenform" element={<TokenForm />} >
                          <Route path=":id" element={<TokenForm />} />
                        </Route>
                        <Route path="/tokentable" element={<TokenTable />} />




                        <Route path="/profile" element={<ProfilePage />} />
                      </>
                  }
                </Routes>


                {/********Middle Content**********/}
                <Container className="p-4" fluid>
                  <Outlet />
                </Container>


              </div>
            </div>
          </context.Provider>
        </BrowserRouter>
      </main>
    </>
  )
};

export default App;
