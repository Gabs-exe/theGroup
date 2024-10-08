// Parse query parameters from sessionStorage
const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
console.log(flightInfo);

const fromLocation = flightInfo.fromLocation;
const toLocation = flightInfo.toLocation;
const departDate = flightInfo.departDate;
const returnDate = flightInfo.returnDate;
const passengers = flightInfo.passengers;
const oneWayOrReturn = flightInfo.oneWayOrReturn;

async function fetchFlightData() {
  const response = await fetch('js/flightdata.json');
  let object = await response.json();
  return object;
}
const flightData = fetchFlightData();

const shortName = {"Sydney": "SYD", "Melbourne": "MEL", "Brisbane": "BNE", "Perth": "PER", "Auckland": "AKL", "Wellington": "WLG"};

window.onload = function() {
    flightData.then(data => {
        // console.log(data.route[0].to[0].destination);
        for (let i = 0; i < data.route.length; i++) {
            if (data.route[i].from === fromLocation) {
                for (let t = 0; t < data.route[i].to.length; t++) {
                    if (data.route[i].to[t].destination === toLocation) {
                        console.log(data.route[i].to[t]);

                        // Display flight details
                        console.log(data.route[i].to[t].timings.length);

                        for (let j = 0; j < data.route[i].to[t].timings.length; j++) {
                            let flightCard = document.getElementById('results');

                            let dateObj = new Date(dapartDate);
                            let formattedDate = dateObj.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
                            console.log(formattedDate)

                            let flightDetail = `
                                <div class="flight-card">
                                    <div class="card1">
                                        <p>${shortName[fromLocation]} | ${data.route[i].to[t].timings[j]}</p>
                                        <p>${fromLocation}</p>
                                        <p>${formattedDate}</p>
                                    </div>
                                    <div class="card2">
                                        <img src="img/plane.png">
                                    </div>
                                    <div class="card1">
                                        <p>${shortName[fromLocation]} | ${data.route[i].to[t].timings[j]}</p>
                                        <p>${toLocation}</p>
                                        <p>${formattedDate}</p>
                                    </div>
                                    <button class="card4">Price</button>
                                </div>
                            `;
                            flightCard.innerHTML += flightDetail;
                        }
                    }
                }
            }
        }
    });
};