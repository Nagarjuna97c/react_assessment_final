const usersData = localStorage.getItem("usersData");
const busData = localStorage.getItem("busData");

if (usersData === null) {
  const setUsersData = [
    { emailId: "nagarjuna@gmail.com", password: "polavarapu97@" },
  ];
  localStorage.setItem("usersData", JSON.stringify(setUsersData));
}

console.log(usersData);

if (busData === null) {
  const setBusData = [
    {
      name: "APSRTC1120",
      departureLocation: "Vijayawada",
      ArraivalLocation: "Hyderabad",
    },
    {
      name: "APSRTC1121",
      departureLocation: "Vijayawada",
      ArraivalLocation: "Hyderabad",
    },
    {
      name: "TSRTC1120",
      ArraivalLocation: "Vijayawada",
      departureLocation: "Hyderabad",
    },
    {
      name: "TSRTC1120",
      ArraivalLocation: "Vijayawada",
      departureLocation: "Hyderabad",
    },
  ];
}
