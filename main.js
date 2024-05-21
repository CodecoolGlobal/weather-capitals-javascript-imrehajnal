import './style.css'
import getCountries from './api-client/getCountries';
import getCountryDetails from './api-client/getCountrieDetails';
import { _el } from './utils';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <h1>Hello World</h1>
//   </div>
// `;

async function main() {
  const countries = await getCountries();

  const ul = _el('ul', { className: 'countries-list' });

  for (const country of countries) {
    const li = _el('li', {
      innerText: country.name.common,
      className: 'countries-list__element'
    });
    li.dataset.cc = country.cca3;
    ul.append(li);
  }
  app.append(ul);
}


main();
