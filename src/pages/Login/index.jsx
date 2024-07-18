// Hooks
import { useState } from "react";

// React Bootstrap
import { Button } from "react-bootstrap";

// Components
import Login from "../../forms/Login";
import RegistrationForm from "../../forms/Registration";

export default function LoginPage() {
  const [isToggled, setIsToggled] = useState(false);
  const [buttonText, setButtonText] = useState("Login");

  const handleChange = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      setButtonText("Register");
    } else {
      setButtonText("Login");
    }
  };

  return (
    <div>
      {isToggled ? <Login /> : <RegistrationForm />}
      <Button variant="outline-info" onClick={handleChange}>{buttonText}</Button>
    </div>
  );
}
