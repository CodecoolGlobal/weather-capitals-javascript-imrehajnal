import './style.css'
import getCountries from './api-client/getCountries';
import getCountryDetails from './api-client/getCountriyDetails.js';
import { _el } from './utils';
import { neighboringCapitals } from './neighboring-capitals';
import getWeather from './api-client/getWeatherDetails.js';

export let choosenCountry = '';

async function countryDetails(cca3) {
  const details = await getCountryDetails(cca3);
  if (details) {
    console.log(details);
  }
}

async function handleCountryClick(event) {
  const target = event.currentTarget;
  choosenCountry = target.dataset.cc;
  console.log(choosenCountry);
  await activateCountry(target);

  /////////////////////////////////////////////////////
  const parentCard = this.closest('.country-mini__card');
  const allCards = document.querySelectorAll('.country-mini__card');
  allCards.forEach(card => card.classList.remove('country-mini__card--active'));
  parentCard.classList.add('country-mini__card--active');
  /////////////////////////////////////////////////////

}

async function activateCountry(el) {
  const cc = el?.dataset?.cc;

  if (!cc) {
    return;
  }

  const activeClass = 'countries-list__element--active'

  document
    .querySelector(`.${activeClass}`)
    ?.classList.remove(activeClass);

  el.classList.add(activeClass);
  const details = await getCountryDetails(cc);
}

async function main() {
  const countries = await getCountries();
  
  const div = _el('div', { className: 'countries-list' });
  const countriesCard = document.querySelector('#countriesCard');
  
  for (const country of countries) {
    const countryData = await getCountryDetails(country.cca3);
    const countryFlag = countryData.flags.svg;
    const flag = _el('img', { className: 'flag', src: `${countryFlag}`});

    const countryDiv = _el('div', { className: 'country-mini__card' });

    const countryUl = _el('h1', {
      innerText: country.name.common,
      className: 'countries-list__element'
    });

    const capitalLi = _el('h3',
      {
        innerText: country.capitals[0],
        className: 'country-capital'
      });

    capitalLi.dataset.cc = country.cca3
    countryUl.dataset.cc = country.cca3;

    countryUl.append(capitalLi);
    countryDiv.append(flag, countryUl)

    div.append(countryDiv);
    countryUl.onclick = handleCountryClick;

  }
  
  countriesCard.append(div);

  // const countriesListUl = document.querySelector('.countries-list');
  const controlPanel = _el('div', { className: 'control-panel'});

  const nextButton = _el('button', {
    className: 'country__next_btn',
    innerText: 'Next >'
  });

  const prevButton = _el('button', {
    className: 'country__prev_btn',
    innerText: '< Prev'
  });

  controlPanel.append(prevButton, nextButton);
  countriesCard.append(controlPanel);

  nextButton.onclick = () => {
    const activeClass = 'countries-list__element--active';
    const activeElement = document.querySelector(`.${activeClass}`);
  
    if (activeElement) {
      const parentDiv = activeElement.closest('.country-mini__card');
      const nextDiv = parentDiv.nextElementSibling;
  
      if (nextDiv) {
        const nextH1 = nextDiv.querySelector('h1');
        if (nextH1) {
          choosenCountry = nextH1.dataset.cc;
          console.log(choosenCountry);
          activateCountry(nextH1);


          ///////////////////////////////////////////////////////////////
          const allCards = document.querySelectorAll('.country-mini__card');
          allCards.forEach(card => card.classList.remove('country-mini__card--active'));

          nextDiv.classList.add('country-mini__card--active');
          //////////////////////////////////////////////////////////////
        }
      }
    }
  };

  prevButton.onclick = () => {
    const activeClass = 'countries-list__element--active';
    const activeElement = document.querySelector(`.${activeClass}`);
  
    if (activeElement) {
      const parentDiv = activeElement.closest('.country-mini__card');
      const prevDiv = parentDiv.previousElementSibling;
  
      if (prevDiv) {
        const prevH1 = prevDiv.querySelector('h1');
        if (prevH1) {
          choosenCountry = prevH1.dataset.cc;
          console.log(choosenCountry);
          activateCountry(prevH1);

          //////////////////////////////////////////////////////////////
          const allCards = document.querySelectorAll('.country-mini__card');
          allCards.forEach(card => card.classList.remove('country-mini__card--active'));

          prevDiv.classList.add('country-mini__card--active');
          //////////////////////////////////////////////////////////////
        }
      }
    }
  };

  const weatherDetails = await getWeather();
  console.log(weatherDetails);

  countryDetails('HUN');


  // neighboringCapitals.addEventListener('click', () => {
  //   let data = neighboringCapitals;
  //   app.append(data);
  // })

}


main();
