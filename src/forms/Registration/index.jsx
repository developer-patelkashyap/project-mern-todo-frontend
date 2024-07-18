// Stylesheets
import "./index.css";

// Hooks
import { useState } from "react";

// Axios
import axios from "axios";

// Formik
import { Formik, Field, Form, ErrorMessage } from "formik";

// Yup
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

// React Bootstrap
import { FormLabel, FormGroup, Button, Alert } from "react-bootstrap";

export default function RegistrationForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      await axios
        .post("http://localhost:3000/api/v1/user/register", values)
        .then((res) => {
          if (res.data.statusCode === 409) {
            setError(res.data.statusMessage);
          }
          if (res.data.statusCode === 201) {
            // navigate to login
          }
        });
    } catch (error) {
      console.error(error.msg);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          firstName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .password()
            .required("Required")
            .minUppercase(
              1,
              "password must contain at least 1 uppercase letter"
            )
            .minNumbers(1, "password must contain at least 1 number")
            .minSymbols(1, "password must contain at least 1 symbol"),
          // confirmPassword: Yup.string()
          //   .password()
          //   .oneOf([Yup.ref("password"), null], "Password does not match")
          //   .required("Required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        <Form id="RegistrationForm">
          {error ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setError("")}
              dismissible
            >
              {error}
            </Alert>
          ) : (
            <></>
          )}
          <FormGroup className="mb-3">
            <FormLabel htmlFor="userName">Username</FormLabel>
            <Field name="userName" type="text" />
            <ErrorMessage name="userName" component="div" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field name="email" type="text" />
            <ErrorMessage name="email" component="div" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </FormGroup>

          {/* <FormGroup>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Field name="confirmPassword" type="password" />
          <ErrorMessage name="confirmPassword" />
        </FormGroup> */}

          <FormGroup className="mb-3">
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </Formik>
    </div>
  );
}
