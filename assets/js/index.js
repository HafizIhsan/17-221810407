class Flightradar24Data {
    static root_url = "https://flask-flight-radar-apps.azurewebsites.net";
    //details
    static async getAirportDetails({
            url = `${Flightradar24Data.root_url}`,
            iata = "TIM",
            pages = 0,
        } = {}) {
            try {
                const response = await fetch(`${url}/${iata}/details/${pages}`);
                const responseJSON = await response.json();
                return responseJSON;
            } catch (err) {
                console.log(err);
            }
        }
        //arrivals
    static async getAirportArrivals({
            url = `${Flightradar24Data.root_url}`,
            iata = "TIM",
            pages = 0,
        } = {}) {
            try {
                const response = await fetch(`${url}/${iata}/arrivals/${pages}`);
                const responseJSON = await response.json();
                return responseJSON;
            } catch (err) {
                console.log(err);
            }
        }
        //departures
    static async getAirportDepartures({
            url = `${Flightradar24Data.root_url}`,
            iata = "TIM",
            pages = 0,
        } = {}) {
            try {
                const response = await fetch(`${url}/${iata}/departures/${pages}`);
                const responseJSON = await response.json();
                return responseJSON;
            } catch (err) {
                console.log(err);
            }
        }
        //onground
    static async getAirportOnground({
            url = `${Flightradar24Data.root_url}`,
            iata = "TIM",
            pages = 0,
        } = {}) {
            try {
                const response = await fetch(`${url}/${iata}/onground/${pages}`);
                const responseJSON = await response.json();
                return responseJSON;
            } catch (err) {
                console.log(err);
            }
        }
        //weather
    static async getAirportWeather({
            url = `${Flightradar24Data.root_url}`,
            iata = "TIM",
            pages = 0,
        } = {}) {
            try {
                const response = await fetch(`${url}/${iata}/weather/${pages}`);
                const responseJSON = await response.json();
                return responseJSON;
            } catch (err) {
                console.log(err);
            }
        }
        //stat
    static async getAirportStat({
        url = `${Flightradar24Data.root_url}`,
        iata = "TIM",
        pages = 0,
    } = {}) {
        try {
            const response = await fetch(
                `${url}/${iata}/stat/${pages}`,
                (iata = "TIM"),
                (pages = 0)
            );
            const responseJSON = await response.json();
            return responseJSON;
        } catch (err) {
            console.log(err);
        }
    }
}

async function renderData() {
    //     try{
    //             const response = await fetch('https://flask-flight-radar-apps.azurewebsites.net/TIM/details/1');
    //             const responseJson = await response.json();
    //             const airport_name = document.getElementById('airport-name');
    //             airport_name.innerText = responseJson.name;
    //             const airport_code = document.getElementById('airport-code');
    //             airport_code.innerText = responseJson.code.iata;
    //             console.log(responseJson);
    // } catch(err){
    //         console.log(err);
    //     }

    //memasukkan nama airport menggunakan data response

    // Data Weather
    const data_weather = await Flightradar24Data.getAirportWeather({
        iata: "TIM",
    });

    const airport_kondisi = document.getElementById("weather-kondisi");
    airport_kondisi.innerText = data_weather.sky.condition.text;

    const airport_temp = document.getElementById("weather-temp");
    airport_temp.innerHTML = "<h5 class='font-weight-bolder mb-0'>" + data_weather.temp.celsius + "&deg;C</h5>";

    const airport_windSpeed = document.getElementById("weather-windSpeed");
    airport_windSpeed.innerHTML = "<h5 class='font-weight-bolder mb-0'>" + data_weather.wind.speed.text + " <span class='text-success text-sm font-weight-bolder'>" + data_weather.wind.speed.mph + " mph</span>";

    const airport_windDirection = document.getElementById("weather-windDirection");
    if (data_weather.wind.direction.text != "None") {
        airport_windDirection.innerHTML = "<h5 class='font-weight-bolder mb-0'>" + data_weather.wind.direction.text + " <span class='text-success text-sm font-weight-bolder'>" + data_weather.wind.direction.degree + "&deg;</span></h5>";
    } else {
        airport_windDirection.innerHTML = "<h5 class='font-weight-bolder mb-0'>" + data_weather.wind.direction.text + "</h5>";
    };

    // Data Arrivals
    const data_arrivals = await Flightradar24Data.getAirportArrivals({
        iata: "TIM",
    });

    const airport_arrival = document.getElementById("arrival");
    const date = new Date();
    const today = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate());

    let table = "<table class='table align-items-center mb-0'><thead><tr>" +
        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Flight</th>" +
        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>From</th>" +
        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Airline</th>" +
        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Aircraft</th>" +
        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Status</th>" +
        "</tr></thead><tbody>";

    const data_arrivals_today = data_arrivals.filter(item => `${item.flight.time.scheduled.arrival_date}` == today);
    const arrival_today = data_arrivals_today.length;
    const sum_arrival = document.getElementById("jumlah_arrival");
    sum_arrival.innerText = arrival_today;

    data_arrivals_today.forEach((item) => {
        table +=
            "<tr><td>" +
            "<div class='d-flex px-2 py-1'>" +
            "<div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" + `${item.flight.identification.number.default}` + "</h6></div>" +
            "</div></td>" +
            "<td>" +
            "<div class='d-flex px-2 py-1'>" +
            "<div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" + `${item.flight.airport.origin.position.region.city}` + " (" + `${item.flight.airport.origin.code.iata}` + ")" + "</h6></div>" +
            "</div></td>" +
            "<td>" +
            "<div class='d-flex px-2 py-1'>" +
            "<div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" + `${item.flight.airline.name}` + "</h6></div>" +
            "</div></td>" +
            "<td>" +
            "<div class='d-flex px-2 py-1'>" +
            "<div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" + `${item.flight.aircraft.model.code}` + "</h6></div>" +
            "</div></td>" +
            "<td>" +
            "<div class='d-flex px-2 py-1'>" +
            "<div class='d-flex flex-column justify-content-center'><h6 class='mb-0 text-sm'>" + `${item.flight.status.text}` + "</h6></div>" +
            "</div></td></tr>";
    });

    table += "</tbody></table>";
    airport_arrival.innerHTML = table;

    // Data Departures
    const data_departures = await Flightradar24Data.getAirportDepartures({
        iata: "TIM",
    });

    const airport_departure = document.getElementById("departure");
    const data_departures_today = data_departures.filter(item => `${item.flight.time.scheduled.arrival_date}` == today);


}

document.addEventListener("DOMContentLoaded", renderData);