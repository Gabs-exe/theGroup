// Parse query parameters from sessionStorage
const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
console.log(flightInfo);

// Parse in the flight data
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
            if (data.route[i].from === flightInfo.fromLocation) {
                for (let t = 0; t < data.route[i].to.length; t++) {
                    if (data.route[i].to[t].destination === flightInfo.toLocation) {
                        console.log(data.route[i].to[t]);

                        // Display flight details
                        console.log(data.route[i].to[t].timings.length);

                        for (let j = 0; j < data.route[i].to[t].timings.length; j++) {
                            let flightCard = document.getElementById('results');

                            let dateObj = new Date(flightInfo.departDate);
                            let formattedDate = dateObj.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
                            console.log(formattedDate);

                            let timing = data.route[i].to[t].timings[j];

                            let timingEndMin = (data.route[i].to[t].timings[j] < 1000) ? (Math.floor(data.route[i].to[t].timings[j] / 100) * 60) + (data.route[i].to[t].timings[j] % 100) : (Math.floor(data.route[i].to[t].timings[j] / 100) * 60) + (data.route[i].to[t].timings[j] % 100);
                            let timingEndAdd = timingEndMin + data.route[i].to[t].duration;
                            let timingEnd = Math.floor(((timingEndAdd) / 60) % 100) * 100 + Math.floor((timingEndAdd) % 60);

                            let hours = Math.floor(timing / 100).toString().padStart(2, '0');
                            let minutes = (timing % 100).toString().padStart(2, '0');
                            let formattedTimeStart = `${hours}:${minutes}`;
                            let hoursEnd = Math.floor(timingEnd / 100).toString().padStart(2, '0');
                            let minutesEnd = (timingEnd % 100).toString().padStart(2, '0');
                            let formattedTimeEnd = `${hoursEnd}:${minutesEnd}`;
                            console.log(formattedTimeStart);
                            console.log(formattedTimeEnd);

                            let flightDetail = `
                                <div class="flight-card">
                                    <div class="card1">
                                        <p>${shortName[flightInfo.fromLocation]} ${formattedTimeStart}</p>
                                        <p>${flightInfo.fromLocation}</p>
                                        <p>${formattedDate}</p>
                                    </div>
                                    <div class="card2">
                                        <img src="img/plane.png">
                                    </div>
                                    <div class="card1">
                                        <p>${shortName[flightInfo.toLocation]} ${formattedTimeEnd}</p>
                                        <p>${flightInfo.toLocation}</p>
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