import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import bookingCSS from "./booking.module.css";

const Booking = (props) => {
  const currentUser = useSelector((state) => state.auth.token);

  const [isValidTickets, setIsValidTickets] = useState(false);
  const [isTicketsTouched, setIsTicketsTouched] = useState(false);

  const [isValidName, setIsValidName] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const [isValidEmailEntered, setIsValidEmailEntered] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState({
    errorExists: false,
    message: "",
  });

  const [isValidNumber, setIsvalidNumber] = useState(false);
  const [isNumberTouched, setIsNumberTouched] = useState(false);

  const [isAgeValid, setIsAgeValid] = useState(false);
  const [isAgeTouched, setIsAgeTouched] = useState(false);

  const ticketsRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const ageRef = useRef();

  const validateTicketsHandler = () => {
    const tickets = ticketsRef.current.value.trim();

    if (tickets === "" || 1 >= parseInt(tickets) >= props.busData.tickets) {
      setIsValidTickets(false);
    }
    setIsTicketsTouched(true);
  };

  const validateNameHandler = () => {
    const name = nameRef.current.value.trim();

    if (name === "" || 8 >= name.length >= 20) {
      setIsValidName(false);
    }
    setIsNameTouched(true);
  };

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

  const validateNumberHandler = () => {
    const number = phoneNumberRef.current.value.trim();

    if (number === "" || 0 >= parseInt(number) >= 9999999999) {
      setIsvalidNumber(false);
    }
    setIsNumberTouched(true);
  };

  const validateAgeHandler = () => {
    const age = ageRef.current.value;

    if (age === "" || 0 >= parseInt(age) >= 120) {
      setIsAgeValid(false);
    }
    setIsAgeTouched(true);
  };

  const bookTickets = (event) => {
    console.log("book called");
    event.preventDefault();
    if (
      isValidTickets &&
      isValidName &&
      isValidEmailEntered &&
      isValidNumber &&
      isAgeValid
    ) {
      const tickets = ticketsRef.current.value;
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phoneNumber = phoneNumberRef.current.value;
      const age = ageRef.current.value;

      const usersList = JSON.parse(localStorage.getItem("usersData"));

      const updatedUsersList = usersList.map((user) => {
        if (user.emailId === currentUser) {
          const updatedUser = user;
          updatedUser.bookedTickets.push({
            tickets,
            name,
            email,
            phoneNumber,
            age,
            travelDate: props.travelDate,
            ...props.busData,
          });
          return updatedUser;
        }
        return user;
      });

      localStorage.setItem("usersData", JSON.stringify(updatedUsersList));

      const busData = JSON.parse(localStorage.getItem("busesData"));
      const updatedBusData = busData.map((busData) => {
        if (busData.name === props.busData.name) {
          const newBusData = { ...busData };
          if (newBusData["bookedTickets"][props.travelDate] !== undefined) {
            console.log(newBusData["bookedTickets"][props.travelDate]);
            newBusData["bookedTickets"][props.travelDate] += +tickets;
          } else {
            newBusData["bookedTickets"][props.travelDate] = +tickets;
          }

          return newBusData;
        }
        return busData;
      });

      localStorage.setItem("busesData", JSON.stringify(updatedBusData));

      props.openSuccessMessage();
    } else {
      validateTicketsHandler();
      validateNameHandler();
      emailValidationHandler();
      validateNumberHandler();
      validateAgeHandler();
    }
  };

  const isTicketsInvalid = !isValidTickets && isTicketsTouched;
  const isNameInvalid = !isValidName && isNameTouched;
  const isEmailInvalid = !isValidEmailEntered && isEmailTouched;
  const isNumberInvalid = !isValidNumber && isNumberTouched;
  const isAgeInvalid = !isAgeValid && isAgeTouched;

  return (
    <div className={bookingCSS.backdrop}>
      <form className={bookingCSS.formContainer} onSubmit={bookTickets}>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="seats">
            No. of seats
          </label>
          <input
            id="seats"
            className={`${bookingCSS.inputbox} ${
              isTicketsInvalid ? bookingCSS.emptyInputField : ""
            }`}
            ref={ticketsRef}
            onBlur={validateTicketsHandler}
            onChange={() => setIsValidTickets(true)}
          />
          {isTicketsInvalid ? (
            <p className={bookingCSS.errorMessage}>
              Enter a value between 1 and {props.busData.tickets}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="name">
            Enter your Name
          </label>
          <input
            type="text"
            id="name"
            className={`${bookingCSS.inputbox} ${
              isNameInvalid ? bookingCSS.emptyInputField : ""
            }`}
            ref={nameRef}
            onBlur={validateNameHandler}
            onChange={() => setIsValidName(true)}
          />
          {isNameInvalid ? (
            <p className={bookingCSS.errorMessage}>
              Name should be between 8 to 20 characters
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            id="email"
            className={`${bookingCSS.inputbox} ${
              isEmailInvalid ? bookingCSS.emptyInputField : ""
            }`}
            onBlur={emailValidationHandler}
            ref={emailRef}
            onChange={() => setIsValidEmailEntered(true)}
          />
          {isEmailInvalid ? (
            <p className={bookingCSS.errorMessage}>
              {emailErrorMessage.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="number">
            Enter your phone number
          </label>
          <input
            id="number"
            className={`${bookingCSS.inputbox} ${
              isNumberInvalid ? bookingCSS.emptyInputField : ""
            }`}
            onBlur={validateNumberHandler}
            ref={phoneNumberRef}
            onChange={() => setIsvalidNumber(true)}
          />
          {isNumberInvalid ? (
            <p className={bookingCSS.errorMessage}>
              Enter a valid phone number(without country code).
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="age">
            Enter your age
          </label>
          <input
            id="age"
            className={`${bookingCSS.inputbox} ${
              isAgeInvalid ? bookingCSS.emptyInputField : ""
            }`}
            onBlur={validateAgeHandler}
            ref={ageRef}
            onChange={() => setIsAgeValid(true)}
          />
          {isAgeInvalid ? (
            <p className={bookingCSS.errorMessage}>Enter a valid age.</p>
          ) : (
            ""
          )}
        </div>
        <div className={bookingCSS.verticalFlex}>
          <label className={bookingCSS.inputlabel} htmlFor="gender">
            Select your gender
          </label>
          <select name="gender" id="gender" className={bookingCSS.inputbox}>
            <option defaultValue value="Male">
              Male
            </option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={bookingCSS.buttonsContainer}>
          <button type="submit" className={bookingCSS.button}>
            Book Now
          </button>
          <button
            type="button"
            className={[bookingCSS.button, bookingCSS.closeButton].join(" ")}
            onClick={() => props.closeBookingModal()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Booking;
