import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../pages/user/userSlice";
import { setTrans } from "../../pages/dashboard/transactionSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleOnLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser({}));
        toast.success("user loged out");
        // clear
        dispatch(setTrans());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home" className="text-warning fw-bolder">
          <i className="fa-solid fa-money-bill-1-wave "></i> Mgmt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-4">
            {user?.uid ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  <i className="fa-solid fa-gauge"></i> Dashboard
                </Link>

                <Link to="/profile" className="nav-link">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>

                <Link to="#" className="nav-link" onClick={handleOnLogOut}>
                  <i
                    className="fa-solid fa-right-from-bracket"
                    title="Log Out"
                  ></i>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  <i className="fa-solid fa-right-to-bracket" title="Login"></i>{" "}
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  <i className="fa-solid fa-user-pen" title="Register"></i>
                  Signup
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
