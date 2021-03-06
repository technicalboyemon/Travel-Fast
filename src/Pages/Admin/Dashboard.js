import React from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SubHeader from "../../Components/SubHeader";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user, logout, admin } = useAuth();
  return (
    <div>
      <SubHeader pageName="Dashboard" />
      <div className="py-4 my-4">
        <Container>
          <div className="row">
            <div className="col-md-3">
              <div className="dashboard-navbar">
                <nav className="nav flex-column">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link className="nav-link" to="/dashboard/addblog">
                    Add Blog / Experience
                  </Link>
                  {admin && (
                    <>
                      <Link className="nav-link" to="/dashboard/addCategory">
                        Add Category
                      </Link>
                      <Link className="nav-link" to="/dashboard/blogList">
                        Blog List
                      </Link>
                      <Link className="nav-link" to="/dashboard/categoryList">
                        Category List
                      </Link>
                      <Link className="nav-link" to="/dashboard/makeAdmin">
                        Make Admin
                      </Link>
                      <Link className="nav-link" to="/dashboard/adminApprove">
                        Blog Approval
                      </Link>
                    </>
                  )}

                  <Link onClick={logout} className="nav-link logout-bg" to="/">
                    Log Out
                  </Link>
                </nav>
              </div>
            </div>
            <div className="col-md-9 my-2">
              <div className="dashboard-sidebar">
                <Outlet />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
