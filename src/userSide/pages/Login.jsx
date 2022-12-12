import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userLoginApi } from "../../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      // .min(4)
      // .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/
        ),
    }),
  });

  const userInfor = useSelector(state => state.user)
  userInfor.message === 'LoginSuccess' && localStorage.setItem("userInfor", JSON.stringify(userInfor.userInfor));
    
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = undefined;
    formik.values.name && formik.values.password
      ? formik.errors.name || formik.errors.password
        ? toast.error("Name or passworld invalid")
        : (data = formik.values)
      : toast.error("Name or Password invalid!");

    const fectLoginApi = async () => {
      dispatch(userLoginApi(data));
    };

    if (data !== undefined) fectLoginApi();

  };

  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-food fs-4">Login</h3>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter your email"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter your passworld"
                  />
                </FormGroup>
                <button className="buy__btn auth__btn">Login</button>
                <p>
                  Don't have an account?
                  <Link to="/signup">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
