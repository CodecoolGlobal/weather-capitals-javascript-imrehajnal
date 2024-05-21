


const capital = 'Budapest';
const apiKey = '155ce8ba19d14d2999b85105242105';
const details = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;

export default async function getWeather(){
  try {
      const response = await fetch(details);
      if (!response.ok) {
          throw new Error('Hálózati válasz nem megfelelő.');
      }
      const data = await response.json();
      return data;

  } catch (error) {
      console.error('Hiba történt:', error);
      const weatherDiv = document.getElementById('weatherData');
      weatherDiv.innerHTML = `<p>Hiba történt az adatok lekérdezése során.</p>`;
  }
}

/*


      const weatherDiv = document.getElementById('weatherData');
      const weatherInfo = `
          <p>Város: ${data.location.name}</p>
          <p>Régió: ${data.location.region}</p>
          <p>Ország: ${data.location.country}</p>
          <p>Hőmérséklet: ${data.current.temp_c} °C</p>
          <p>Érzékelt hőmérséklet: ${data.current.feelslike_c} °C</p>
          <p>Állapot: <img src="https:${data.current.condition.icon}" alt="Időjárás ikon"> ${data.current.condition.text}</p>
          <p>Szélsebesség: ${data.current.wind_kph} km/h</p>
          <p>Páratartalom: ${data.current.humidity} %</p>
          <p>Felhőzet: ${data.current.cloud} %</p>
          <p>Széllökések: ${data.current.gust_kph} km/h</p>
          <p>Helyi idő: ${data.location.localtime}</p>
      `;
      weatherDiv.innerHTML = weatherInfo;


{
  "Connection": "keep-alive",
  "Vary": "Accept-Encoding",
  "CDN-PullZone": "93447",
  "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
  "CDN-RequestCountryCode": "GB",
  "Age": "0",
  "x-weatherapi-qpm-left": "5000001",
  "CDN-ProxyVer": "1.04",
  "CDN-RequestPullSuccess": "True",
  "CDN-RequestPullCode": "200",
  "CDN-CachedAt": "05/21/2024 09:50:37",
  "CDN-EdgeStorageId": "755",
  "CDN-Status": "200",
  "CDN-RequestId": "f6705dcdc8ffb9dc4254f807bde34185",
  "CDN-Cache": "EXPIRED",
  "Accept-Ranges": "bytes",
  "Content-Length": "359",
  "Cache-Control": "public, max-age=180",
  "Content-Type": "application/json",
  "Date": "Tue, 21 May 2024 09:50:37 GMT",
  "Server": "BunnyCDN-DE1-1054",
  "Via": "1.1 varnish (Varnish/6.0)"
}
Response Body
{
    "location": {
        "name": "Kecskemét",
        "region": "Bacs-Kiskun",
        "country": "Hongrie",
        "lat": 46.9,
        "lon": 19.78,
        "tz_id": "Europe/Budapest",
        "localtime_epoch": 1716285014,
        "localtime": "2024-05-21 11:50"
    },
    "current": {
        "temp_c": 24.0,
        "condition": {
            "icon": "//cdn.weatherapi.com/weather/64x64/day/122.png"
        },
        "wind_kph": 20.2,
        "humidity": 54,
        "cloud": 100,
        "feelslike_c": 25.4,
        "gust_kph": 22.4
    }
}
*/
