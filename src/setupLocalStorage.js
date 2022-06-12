const usersData = localStorage.getItem("usersData");
const busData = localStorage.getItem("busData");

if (usersData === null) {
  console.log("setting users data");
  const setUsersData = [
    { emailId: "nagarjuna@gmail.com", password: "polavarapu97@" },
  ];
  localStorage.setItem("usersData", JSON.stringify(setUsersData));
}

console.log("usersdata", usersData);

if (busData === null) {
  const setBusData = [
    {
      name: "APSRTC1120",
      departureLocation: "Vijayawada",
      destination: "Hyderabad",
      departureTime: [21, 30],
      arraivalTime: [4, 45],
      rating: 4.2,
      tickets: 30,
      price: 450,
      type: "Non-AC",
    },
    {
      name: "APSRTC1121",
      departureLocation: "Vijayawada",
      destination: "Hyderabad",
      departureTime: [20, 30],
      arraivalTime: [4, 45],
      rating: 4.5,
      tickets: 30,
      price: 450,
      type: "AC",
    },
    {
      name: "TSRTC1120",
      destination: "Vijayawada",
      departureLocation: "Hyderabad",
      departureTime: [20, 30],
      arraivalTime: [5, 45],
      rating: 4.4,
      tickets: 30,
      price: 550,
      type: "AC",
    },
    {
      name: "TSRTC1122",
      destination: "Bangalore",
      departureLocation: "Hyderabad",
      departureTime: [21, 30],
      arraivalTime: [10, 45],
      rating: 4.0,
      tickets: 30,
      price: 550,
      type: "AC",
    },
    {
      name: "BANG1123",
      destination: "Bangalore",
      departureLocation: "Hyderabad",
      departureTime: [21, 30],
      arraivalTime: [9, 45],
      rating: 3.7,
      tickets: 30,
      price: 550,
      type: "AC",
    },
    {
      name: "APSRTC1126",
      destination: "Bangalore",
      departureLocation: "Vijayawada",
      departureTime: [21, 30],
      arraivalTime: [8, 45],
      rating: 4.2,
      tickets: 30,
      price: 550,
      type: "AC",
    },
    {
      name: "BANG1120",
      destination: "Vijayawada",
      departureLocation: "Bangalore",
      departureTime: [21, 30],
      arraivalTime: [7, 45],
      rating: 4.4,
      tickets: 30,
      price: 550,
      type: "AC",
    },
  ];
  localStorage.setItem("busesData", JSON.stringify(setBusData));
}
