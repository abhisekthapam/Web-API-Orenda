import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TheBearer from "../api/TheBearer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const TheLogin = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const response = await TheBearer.post("/user/login", values);

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setLoginError("Login Failed. Invalid Email or Password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[60vh] flex flex-col justify-center px-[2%] md:px-[4%] lg:px-[10%]">
      <div className="flex justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-custom-shadow rounded-lg relative">
          <h2 className="text-xl font-bold text-center mb-8 primary-color">
            Login To Orenda Restaurant
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 p-2 py-3 w-full rounded-md border focus:outline-none text-xs"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password*
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 p-2 py-3 w-full rounded-md border focus:outline-none text-xs"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm text-center mb-4">
                    {loginError}
                  </div>
                )}
                <div className="flex justify-center">
                  <button type="submit" disabled={isSubmitting}>
                    <span className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium primary-btn-color">
                      {isSubmitting ? "Submitting..." : "Login"}
                    </span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TheLogin;
