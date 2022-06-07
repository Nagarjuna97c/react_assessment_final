import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import LoginCSS from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isValidEmailEntered, setIsValidEmailEntered] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isValidPasswordEntered, setIsValidPasswordEntered] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState({
    errorExists: false,
    message: "",
  });
  const [passwordErrorMessage, setPasswordErrorMessage] = useState({
    errorExists: false,
    message: "",
  });

  const emailValidationHandler = () => {
    const emailInputValue = emailRef.current.value;
    if (emailInputValue === "") {
      setIsValidEmailEntered(false);
      setEmailErrorMessage({
        errorExists: true,
        message: "Email field is empty",
      });
    } else if (!emailInputValue.includes("@")) {
      setIsValidEmailEntered(false);
      setEmailErrorMessage({
        errorExists: true,
        message: "Invalid email.Email does not contain @",
      });
    } else if (!emailInputValue.includes(".com")) {
      setIsValidEmailEntered(false);
      setEmailErrorMessage({
        errorExists: true,
        message: "Invalid email.Email does not contain .com",
      });
    } else {
      setIsValidEmailEntered(true);
    }
    setIsEmailTouched(true);
  };

  const passwordValidationHandler = () => {
    const passwordInputValue = passwordRef.current.value;
    if (passwordInputValue === "") {
      setIsValidPasswordEntered(false);
      setPasswordErrorMessage({
        errorExists: true,
        message: "Password field is empty",
      });
    } else {
      setIsValidPasswordEntered(true);
    }
    setIsPasswordTouched(true);
  };

  const loginFormHandler = (event) => {
    const cookies = new Cookies();

    event.preventDefault();
    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const selectUser = usersData.find(
      (each) => each.emailId === emailRef.current.value
    );

    if (selectUser === undefined) {
      setIsValidEmailEntered(false);
      setEmailErrorMessage({
        errorExists: true,
        message: "Email does not exist.Please register as new user.",
      });
    } else if (selectUser.password !== passwordRef.current.value) {
      setIsValidPasswordEntered(false);
      setPasswordErrorMessage({
        errorExists: true,
        message: "Invalid password.",
      });
    } else {
      cookies.set("loggedInUser", emailRef.current.value, {
        expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      });
      navigate("/");
    }
  };

  const isEmailInvalid = !isValidEmailEntered & isEmailTouched;
  const isPasswordInvalid = !isValidPasswordEntered & isPasswordTouched;

  return (
    <div className={LoginCSS.maincontainer}>
      <form onSubmit={loginFormHandler} className={LoginCSS.formcontainer}>
        <div className={LoginCSS.inputContainer}>
          <label htmlFor="email" className={LoginCSS.inputlabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`${LoginCSS.inputbox} ${
              isEmailInvalid ? LoginCSS.emptyInputField : ""
            }`}
            ref={emailRef}
            onBlur={emailValidationHandler}
            onChange={() => {
              setIsValidEmailEntered(true);
            }}
          />
          {isEmailInvalid ? (
            <p className={LoginCSS.errorMessage}>{emailErrorMessage.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className={LoginCSS.inputContainer}>
          <label htmlFor="password" className={LoginCSS.inputlabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${LoginCSS.inputbox} ${
              isPasswordInvalid ? LoginCSS.emptyInputField : ""
            }`}
            ref={passwordRef}
            onBlur={passwordValidationHandler}
            onChange={() => {
              setIsValidPasswordEntered(true);
            }}
          />
          {isPasswordInvalid ? (
            <p className={LoginCSS.errorMessage}>
              {passwordErrorMessage.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={!(isValidEmailEntered && isValidPasswordEntered)}
          type="submit"
          className={LoginCSS.button}
        >
          Login
        </button>
        <Link to="/register" className={LoginCSS.center}>
          Go to Register Page
        </Link>
      </form>
    </div>
  );
};

export default Login;
