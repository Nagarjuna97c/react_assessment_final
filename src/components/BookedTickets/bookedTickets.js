import { useSelector } from "react-redux";
import NavBar from "../NavBar/navbar";

import BookedCSS from "./bookedTickets.module.css";

const BookedTickets = () => {
  const loggedInUserEmail = useSelector((state) => state.auth.token);
  const userData = JSON.parse(localStorage.getItem("usersData"));

  const loggedInUserData = userData.find(
    (each) => each.emailId === loggedInUserEmail
  );
  const userBookings = loggedInUserData["bookedTickets"];
  console.log(userBookings);
  return (
    <div>
      <NavBar />
      <div className={BookedCSS.bokingsContainer}>
        {userBookings.map((booking) => (
          <div className={BookedCSS.bookingsContainer} key={booking.name}>
            <div className={BookedCSS.vertical}>
              <div className={BookedCSS.topHorizontal}>
                <p className={BookedCSS.boldBusData}>
                  Customer Name:{` `}
                  <span className={BookedCSS.description1}>{booking.name}</span>
                </p>
              </div>
              <div className={BookedCSS.topHorizontal}>
                <p className={BookedCSS.boldBusData}>
                  Bus Number:{` `}
                  <span className={BookedCSS.description1}>
                    {booking.busname}
                  </span>
                </p>
              </div>
              <div className={BookedCSS.topHorizontal}>
                <p className={BookedCSS.boldBusData}>
                  Booked Tickets:{` `}
                  <span className={BookedCSS.description1}>
                    {booking.tickets}
                  </span>
                </p>
              </div>
            </div>

            <div className={BookedCSS.busTop}>
              <div className={BookedCSS.vertical}>
                <p className={BookedCSS.description}>Start Location </p>
                <p className={BookedCSS.boldBusData}>
                  {booking.departureLocation}
                </p>
                <p className={BookedCSS.description}>Starts At </p>
                <p className={BookedCSS.boldBusData}>
                  {String(booking.departureTime[0]).padStart(`2`, 0)}:
                  {String(booking.departureTime[1]).padStart(`2`, 0)}
                </p>
              </div>
              <div className={BookedCSS.vertical}>
                <p className={BookedCSS.description}>Destination </p>
                <p className={BookedCSS.boldBusData}>{booking.destination}</p>
                <p className={BookedCSS.description}>Arraives At </p>
                <p className={BookedCSS.boldBusData}>
                  {String(booking.arraivalTime[0]).padStart(`2`, 0)}:
                  {String(booking.arraivalTime[1]).padStart(`2`, 0)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedTickets;
