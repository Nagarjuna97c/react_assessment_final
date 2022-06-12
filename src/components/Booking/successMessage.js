import { useNavigate } from "react-router-dom";
import SuccessCSS from "./booking.module.css";

const SuccessMessage = (props) => {
  const navigate = useNavigate();
  return (
    <div className={SuccessCSS.backdrop}>
      <div className={SuccessCSS.successContainer}>
        <h1 className={SuccessCSS.successMessage}>
          Tickets booked successfully
        </h1>
        <button
          className={SuccessCSS.button}
          onClick={() => navigate("/booked-tickets")}
        >
          Go to Booked Tickets Page
        </button>
        <button
          className={[SuccessCSS.button, SuccessCSS.closeButton].join(" ")}
          onClick={() => props.closeSuccessMessage()}
        >
          Close PopUp
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
