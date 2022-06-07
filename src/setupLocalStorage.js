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
      departureTime: [21, 30],
      arraivalTime: [4, 45],
    },
    {
      name: "APSRTC1121",
      departureLocation: "Vijayawada",
      ArraivalLocation: "Hyderabad",
      departureTime: [20, 30],
      arraivalTime: [4, 45],
    },
    {
      name: "TSRTC1120",
      ArraivalLocation: "Vijayawada",
      departureLocation: "Hyderabad",
      departureTime: [20, 30],
      arraivalTime: [5, 45],
    },
    {
      name: "TSRTC1120",
      ArraivalLocation: "Vijayawada",
      departureLocation: "Hyderabad",
      departureTime: [21, 30],
      arraivalTime: [5, 45],
    },
  ];
}
