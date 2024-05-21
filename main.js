import './style.css'
import getCountries from './api-client/getCountries';
import getCountryDetails from './api-client/getCountrieDetails';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <h1>Hello World</h1>
//   </div>
// `;

async function main() {
  const countries = await getCountries();
  

}

main();
