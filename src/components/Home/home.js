import { useState, useRef } from "react";
import NavBar from "../NavBar/navbar";
import HomeCSS from "./home.module.css";
import Booking from "../Booking/booking";
import SuccessMessage from "../Booking/successMessage";

const cities = ["Bangalore", "Hyderabad", "Vijayawada"];

const Home = () => {
  const [displayBusdata, setdisplayBusdata] = useState();
  const [bookingModalData, setBookingModalData] = useState({
    display: false,
    busData: {},
  });
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();
  const travelDateRef = useRef();

  let busData = localStorage.getItem("busesData");

  console.log("component rendered");

  let filteredBuses;

  const filterBuses = () => {
    const departureLocation = fromRef.current.value;
    const destinationLocation = toRef.current.value;
    console.log(departureLocation, destinationLocation);
    filteredBuses = JSON.parse(busData).filter(
      (eachBus) =>
        eachBus.departureLocation === departureLocation &&
        eachBus.destination === destinationLocation
    );
    setdisplayBusdata(filteredBuses);
  };

  const closeBookingModal = () => {
    setBookingModalData({ display: false, busData: {} });
  };

  const openSuccessMessage = () => {
    setBookingModalData({ display: false, busData: {} });
    setDisplaySuccessMessage(true);
  };

  const closeSuccessMessage = () => {
    setDisplaySuccessMessage(false);
    filterBuses();
  };

  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = `${today.getMonth() + 1}`;
  const month01 = month.padStart(`2`, 0);
  const date = `${today.getDate()}`;
  const date01 = date.padStart(`2`, 0);

  const currentdate = `${year}-${month01}-${date01}`;

  return (
    <div className={HomeCSS.mainContainer}>
      <NavBar />
      <div className={HomeCSS.inputsContainer}>
        <div className={HomeCSS.inputFieldContainer}>
          <label htmlFor="from" className={HomeCSS.inputLabel}>
            FROM
          </label>
          <select
            className={HomeCSS.selectInput}
            name="from"
            id="from"
            ref={fromRef}
          >
            {cities.map((each) => (
              <option value={each} key={each}>
                {each.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className={HomeCSS.inputFieldContainer}>
          <label htmlFor="to" className={HomeCSS.inputLabel}>
            TO
          </label>
          <select className={HomeCSS.selectInput} name="to" id="to" ref={toRef}>
            {cities.map((each) => (
              <option value={each} key={each + "1"}>
                {each.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className={HomeCSS.inputFieldContainer}>
          <label htmlFor="date" className={HomeCSS.inputLabel}>
            Travel Date
          </label>
          <input
            type="date"
            allowinputtoggle="true"
            id="date"
            min={currentdate}
            defaultValue={currentdate}
            className={HomeCSS.dateInput}
            ref={travelDateRef}
          />
        </div>
        <button className={HomeCSS.button} onClick={filterBuses}>
          Search
        </button>
      </div>

      {
        <div className={HomeCSS.busesDisplay}>
          {displayBusdata !== undefined &&
            displayBusdata.map((busData) => {
              const bookedTickets =
                busData["bookedTickets"][travelDateRef.current.value];
              console.log(travelDateRef.current.value);
              let remTickets;
              if (bookedTickets === undefined) {
                remTickets = 30;
              } else {
                remTickets = 30 - bookedTickets;
              }

              return (
                <div className={HomeCSS.busContainer} key={busData.name}>
                  <div className={HomeCSS.horizontal}>
                    <div className={HomeCSS.topHorizontal}>
                      <h1 className={HomeCSS.boldBusData}>{busData.name}</h1>
                      <span className={HomeCSS.busType}>{busData.type}</span>
                    </div>
                    <p className={HomeCSS.rating}>&#9733;{busData.rating}</p>
                  </div>
                  <div className={HomeCSS.horizontal}>
                    <p className={HomeCSS.price}>Rs.{busData.price}</p>
                  </div>
                  <div className={HomeCSS.busTop}>
                    <div className={HomeCSS.vertical}>
                      <p className={HomeCSS.description}>Departs From </p>
                      <p className={HomeCSS.boldBusData}>
                        {busData.departureLocation}
                      </p>
                      <p className={HomeCSS.description}>At </p>
                      <p className={HomeCSS.boldBusData}>
                        {String(busData.departureTime[0]).padStart(`2`, 0)}:
                        {String(busData.departureTime[1]).padStart(`2`, 0)}
                      </p>
                    </div>
                    <div className={HomeCSS.vertical}>
                      <p className={HomeCSS.description}>Destination is </p>
                      <p className={HomeCSS.boldBusData}>
                        {busData.destination}
                      </p>
                      <p className={HomeCSS.description}>At </p>
                      <p className={HomeCSS.boldBusData}>
                        {String(busData.arraivalTime[0]).padStart(`2`, 0)}:
                        {String(busData.arraivalTime[1]).padStart(`2`, 0)}
                      </p>
                    </div>
                  </div>
                  <p className={HomeCSS.remTickets}>
                    {remTickets} tickets are available for booking.
                  </p>
                  <button
                    className={HomeCSS.bookNowButton}
                    onClick={() =>
                      setBookingModalData({
                        display: true,
                        busData: { ...busData, tickets: remTickets },
                      })
                    }
                  >
                    Book Now
                  </button>
                </div>
              );
            })}
        </div>
      }
      {bookingModalData.display && (
        <Booking
          busData={bookingModalData.busData}
          travelDate={travelDateRef.current.value}
          openSuccessMessage={openSuccessMessage}
          closeBookingModal={closeBookingModal}
        />
      )}
      {displaySuccessMessage && (
        <SuccessMessage closeSuccessMessage={closeSuccessMessage} />
      )}
    </div>
  );
};

export default Home;
