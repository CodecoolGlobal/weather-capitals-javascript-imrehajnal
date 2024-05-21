import './style.css'
import getCountries from './api-client/getCountries';
import getCountryDetails from './api-client/getCountrieDetails';
import { _el } from './utils';
import getWeather from './api-client/getWeatherDetails.js';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <h1>Hello World</h1>
//   </div>
// `;

async function countryDetails(cca3) {
  const details = await getCountryDetails(cca3);
  if (details)  {
    console.log(details);
  }
}

async function main() {
  const countries = await getCountries();

  const ul = _el('ul', { className: 'countries-list' });

  for (const country of countries) {
    const li = _el('ul', {
      innerText: country.name.common,
      className: 'countries-list__element'
    });
    const capitalLi = _el('li',
      {
        innerText: country.capitals[0],
        className: 'country-capital'
      });
    li.dataset.cc = country.cca3;
    ul.append(li);
    li.append(capitalLi);
  }
  app.append(ul);

  const weatherDetails = await getWeather();
  console.log(weatherDetails);

  countryDetails('HUN');

}


main();
