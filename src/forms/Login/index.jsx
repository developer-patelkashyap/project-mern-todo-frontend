// Core Dependencies
import axios from "axios";

// Hooks
import { useState } from "react";

// React Bootstrap
import { Alert, Button, Form } from "react-bootstrap";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [incorrectCredentialMessage, setIncorrectCredentialMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/api/v1/user/login", {
          userName,
          password,
        })
        .then((res) => {
          if (res.data.statusCode === 401) {
            setIncorrectCredentials(true);
            setIncorrectCredentialMessage(res.data.statusMessage);
          }
          if (res.data.statusCode === 200) {
            setIncorrectCredentials(false);
            setIncorrectCredentialMessage("");
            // navigate to dashboard
          } else {
            setIncorrectCredentials(true);
            setIncorrectCredentialMessage("Internal Server Error");
          }
        });
    } catch (error) {
      console.error(error.msg);
    }
  };

  return (
    <div id="LoginForm">
      <Form onSubmit={handleSubmit}>
        {/* Alert Incorrect User Name or Password */}
        {incorrectCredentials ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setIncorrectCredentials(false)}
            dismissible
          >
            {incorrectCredentialMessage}
          </Alert>
        ) : (
          <></>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Button
            variant="primary"
            type="submit"
            id="LoginButton"
            disabled={!userName || !password}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
