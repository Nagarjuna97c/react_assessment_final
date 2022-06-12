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
        <button onClick={filterBuses}>Search</button>
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
                  <div className={HomeCSS.busTop}>
                    <div className={HomeCSS.horizontal}>
                      <h1>{busData.name}</h1>
                      <p>{busData.type}</p>
                    </div>
                    <h1>Rs.{busData.price}</h1>
                  </div>
                  <div className={HomeCSS.busTop}>
                    <div className={HomeCSS.vertical}>
                      <h2>Departs At </h2>
                      <h1>{busData.departureLocation}</h1>
                      <h1>
                        {busData.departureTime[0]}:{busData.departureTime[1]}
                      </h1>
                    </div>
                    <div className={HomeCSS.vertical}>
                      <h2>Destination is </h2>
                      <h1>{busData.destination}</h1>
                      {/* <h2>Destination is </h2> */}
                      <h1>
                        {busData.arraivalTime[0]}:{busData.arraivalTime[1]}
                      </h1>
                    </div>
                  </div>
                  <p>{remTickets} are available.</p>
                  <button
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
