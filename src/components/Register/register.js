import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import RegisterCSS from "./register.module.css";

const Register = () => {
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
    } else if (passwordInputValue.length < 8) {
      setIsValidPasswordEntered(false);
      setPasswordErrorMessage({
        errorExists: true,
        message: "Password should contain atleast 8 characters.",
      });
    } else if (
      !passwordInputValue.includes(
        "@" || "!" || "#" || "." || "$" || "%" || "^" || "&" || "*"
      )
    ) {
      console.log("special character check");
      setIsValidPasswordEntered(false);
      setPasswordErrorMessage({
        errorExists: true,
        message:
          "Password must contain a special character Ex: @,!,#,$,%,^,&,*",
      });
    } else {
      setIsValidPasswordEntered(true);
    }
    setIsPasswordTouched(true);
  };

  const registerFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const selectUser = usersData.find((each) => each.emailId === enteredEmail);

    if (selectUser !== undefined) {
      setIsValidEmailEntered(false);
      setEmailErrorMessage({
        errorExists: true,
        message: "Email already exists.Please enter a new email..",
      });
    } else {
      usersData.push({ emailId: enteredEmail, password: enteredPassword });
      localStorage.setItem("usersData", JSON.stringify(usersData));
    }
  };

  const isEmailInvalid = !isValidEmailEntered & isEmailTouched;
  const isPasswordInvalid = !isValidPasswordEntered & isPasswordTouched;

  return (
    <div className={RegisterCSS.maincontainer}>
      <form
        className={RegisterCSS.formcontainer}
        onSubmit={registerFormHandler}
      >
        <div className={RegisterCSS.inputContainer}>
          <label htmlFor="email" className={RegisterCSS.inputlabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`${RegisterCSS.inputbox} ${
              isEmailInvalid ? RegisterCSS.emptyInputField : ""
            }`}
            ref={emailRef}
            onBlur={emailValidationHandler}
            onChange={() => {
              setIsValidPasswordEntered(true);
            }}
          />
          {isEmailInvalid ? (
            <p className={RegisterCSS.errorMessage}>
              {emailErrorMessage.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={RegisterCSS.inputContainer}>
          <label htmlFor="password" className={RegisterCSS.inputlabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${RegisterCSS.inputbox} ${
              isPasswordInvalid ? RegisterCSS.emptyInputField : ""
            }`}
            ref={passwordRef}
            onBlur={passwordValidationHandler}
            onChange={() => {
              setIsValidPasswordEntered(true);
            }}
          />
          {isPasswordInvalid ? (
            <p className={RegisterCSS.errorMessage}>
              {passwordErrorMessage.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={!(isValidEmailEntered && isValidPasswordEntered)}
          type="submit"
          className={RegisterCSS.button}
        >
          Register
        </button>
        <Link to="/login" className={RegisterCSS.center}>
          Go to Login Page
        </Link>
      </form>
    </div>
  );
};

export default Register;
