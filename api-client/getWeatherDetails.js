const apiKey = '155ce8ba19d14d2999b85105242105';

export default async function getWeather(capital){
  try {
      const response = await fetch(`https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${capital}&days=5`);
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
