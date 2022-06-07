import NavBar from "../NavBar/navbar";
import HomeCSS from "./home.module.css";

const cities = ["Banglore", "Hyderabad", "Vijayawada"];

const Home = () => {
  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = `${today.getMonth() + 1}`;
  const month01 = month.padStart(`2`, 0);
  const date = `${today.getDate()}`;
  const date01 = date.padStart(`2`, 0);

  const currentdate = `${year}-${month01}-${date01}`;

  return (
    <>
      <NavBar />
      <div className={HomeCSS.inputsContainer}>
        <div className={HomeCSS.inputFieldContainer}>
          <label htmlFor="from" className={HomeCSS.inputLabel}>
            FROM
          </label>
          <select className={HomeCSS.selectInput} name="from" id="from">
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
          <select className={HomeCSS.selectInput} name="to" id="to">
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
            className={HomeCSS.dateInput}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
