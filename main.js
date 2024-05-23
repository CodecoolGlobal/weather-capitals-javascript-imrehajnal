import './style.css'
import getCountries from './api-client/getCountries';
import getCountryDetails from './api-client/getCountriyDetails.js';
import { _el } from './utils';
import { neighboringCapitals } from './neighboring-capitals';
import getWeather from './api-client/getWeatherDetails.js';

const weatherCard = document.querySelector('#weatherCard');

export let choosenCountry = '';
export let choosenCountryName = '';
let currentDay = 'Fri';

const countries = await getCountries();
// const countriesAllData = await 

async function countryDetails(cca3) {
  const details = await getCountryDetails(cca3);
  if (details) {
    return details;
  }
}

function getWeekday(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short' };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const weekday = formatter.format(date);
  return weekday;
}

async function displayWeatherCountryName(parent, currDay, currLocation) {
  const titleDiv = _el('div', { className: 'weather-card__title' })
  const tempDiv = _el('div', { className: 'weather-card__title' })
  const infoDiv = _el('div', { className: 'weather-card__title' })

  const countryNameMain = _el('h1', { className: 'displayed-country__name_main', innerText: 'Current Country' });
  const countryName = _el('h1', { className: 'displayed-country__name', innerText: currLocation.country });
  const capitalName = _el('h3', { className: 'displayed-country__name', innerText: currLocation.name });
  const time = _el('h4', { className: 'displayed-country__time', innerText: currLocation.localtime });

  const currentWeather = _el('h1', { className: 'displayed-country__name_main', innerText: 'Current Weather' });
  const icon = _el('img', { className: 'displayed-country__icon', src: currDay.day.condition.icon });
  const tempMin = _el('h3', { className: 'displayed-country__mintemp', innerText: currDay.day.mintemp_c });
  const tempMax = _el('h3', { className: 'displayed-country__maxtemp', innerText: currDay.day.maxtemp_c });

  const weatherDetails = _el('h1', { className: 'displayed-country__name_main', innerText: 'Neighbours' });
  const neighboursList = await ListTheNeighbours(choosenCountry, weatherDetails);

  titleDiv.append(countryNameMain, countryName, capitalName, time);
  tempDiv.append(currentWeather, icon, tempMin, tempMax);
  infoDiv.append(weatherDetails, neighboursList);

  parent.append(titleDiv, tempDiv, infoDiv);
}

function displayWeatherDays(parent, days) {
  let counter = 0;
  for (const day of days) {
    const dayOfWeek = getWeekday(day.date);
    const temp = Math.round(day.day.maxtemp_c);
    const dayDiv = _el('div', { className: 'weather-days', id: dayOfWeek });
    const dayH1 = _el('h1', { className: 'weather-days__h1', innerText: `${dayOfWeek}` });
    const icon = _el('img', { className: 'weather-icon', src: day.day.condition.icon });
    const maxTemp = _el('h2', { className: 'max-temp', innerText: temp });

    dayDiv.onclick = handleWeatherClick;

    dayDiv.append(dayH1, icon, maxTemp);
    parent.append(dayDiv);
    counter++;
  }
}

function displayWeatherBody(parent, days, currentDay) {
  for (const day of days) {
    const date = getWeekday(day.date);
    if (date === currentDay) {
      for (const hour of day.hour) {
        const temperature = Math.round(hour.temp_c);
        const hourDiv = _el('div', { className: 'weather-card-body__hour-div' })
        const date = new Date(hour.time);
        const clockH1 = _el('h1', { className: 'weather-card-body__text', innerText: `${date.getHours()}:00` });
        const airText = _el('h2', { className: 'weather-text', innerText: hour.condition.text })
        const icon = _el('img', { className: 'weather-icon', src: hour.condition.icon })
        const tempText = _el('h2', { className: 'weather-text-temp', innerText: `${temperature}°C` })
        const windText = _el('h2', { className: 'weather-text-wind', innerText: `${hour.wind_kph} kph` })
        hourDiv.append(clockH1, airText, icon, tempText, windText);
        parent.append(hourDiv);
      }
    }
  }
}

function displayWeather(country) {
  const card = document.querySelector('#weatherCard');
  card.innerHTML = '';

  const days = country.forecast.forecastday;
  const day = country.forecast.forecastday[0];
  const currentLocation = country.location;

  const cardName = _el('div', { className: 'card-header__name' }); //Fejléc a fejléc felett
  const cardHeader = _el('div', { className: 'card-header' }); // days
  const cardBody = _el('div', { className: 'card-body' }); // weather hours

  displayWeatherCountryName(cardName, day, currentLocation);
  displayWeatherDays(cardHeader, days);
  displayWeatherBody(cardBody, days, currentDay);

  card.append(cardName, cardHeader, cardBody);

  // weatherCard.append(card); //????????
}

async function handleNeighboursClick(event){
  const target = event.currentTarget;
  console.log(target);
  const currentCca3 = target.id;
  console.log(currentCca3);
  choosenCountry = currentCca3;  

  choosenCountryName = findCountryName(countries, choosenCountry);
  displayWeather(await getWeather(choosenCountryName));

}

async function handleWeatherClick(event) {
  const target = event.currentTarget;
  currentDay = target.id;

  const cardBody = document.querySelector('.card-body');
  cardBody.innerHTML = '';

  const countryWeather = await getWeather(choosenCountryName);
  const days = countryWeather.forecast.forecastday;

  /////////////////////////////////////////////////////
  const parentCard = this.closest('.weather-days');
  const allCards = document.querySelectorAll('.weather-days');
  allCards.forEach(card => card.classList.remove('weather-days--active'));
  parentCard.classList.add('weather-days--active');
  /////////////////////////////////////////////////////

  displayWeatherBody(cardBody, days, currentDay);
}

async function handleCountryClick(event) {
  const target = event.currentTarget;
  choosenCountry = target.dataset.cc;
  await activateCountry(target);
  choosenCountryName = findCountryName(countries, choosenCountry);
  displayWeather(await getWeather(choosenCountryName));

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

function findCountryName(countries, cca3) {
  for (const country of countries) {
    if (country.cca3 === cca3) {
      return country.name.common;
    }
  }
}

async function ListTheNeighbours(cca3, parent) {
  const countryAllData = await countryDetails(cca3);
  const neighbours = countryAllData.borders;
  const neighbourDivList = _el('div', { className: 'displayed-neighbour__div'});
  
  for(const neighbour of neighbours){
    const fullCountryName = await findCountryName(countries, neighbour);
    const weather = await getWeather(fullCountryName);
    const actualTemp_c = weather.forecast.forecastday[0].day.avgtemp_c;
    const weatherIcon = weather.forecast.forecastday[0].day.condition.icon;

    const countryEl = _el('h3', { className: 'displayed-country__text', innerText: fullCountryName, id: neighbour });
    const tempEl = _el('h3', { className: 'displayed-country__text', innerText: `${actualTemp_c}°C` });
    const iconEl = _el('img', { className: 'displayed-country__imgX', src: weatherIcon });

    countryEl.onclick = handleNeighboursClick;
    neighbourDivList.append(countryEl, tempEl, iconEl);
    parent.append(neighbourDivList);
  }

  return neighbourDivList;
}

async function main() {
  const div = _el('div', { className: 'countries-list' });
  const countriesCard = document.querySelector('#countriesCard');

  for (const country of countries) {
    const countryData = await countryDetails(country.cca3);
    const countryFlag = countryData.flags.svg;
    const flag = _el('img', { className: 'flag', src: `${countryFlag}` });

    const countryDiv = _el('div', { className: 'country-mini__card' });

    const countryUl = _el('h1', {
      innerText: country.name.common,
      className: 'countries-list__element'
    });

    const capitalLi = _el('h3', {
      innerText: country.capitals[0],
      className: 'country-capital'
    });

    capitalLi.dataset.cc = country.cca3;
    countryUl.dataset.cc = country.cca3;

    countryUl.append(capitalLi);
    countryDiv.append(flag, countryUl);

    div.append(countryDiv);
    countryUl.onclick = handleCountryClick;
  }

  countriesCard.append(div);

  const controlPanel = _el('div', { className: 'control-panel' });

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

  nextButton.onclick = async () => {
    const activeClass = 'countries-list__element--active';
    const activeElement = document.querySelector(`.${activeClass}`);

    if (activeElement) {
      const parentDiv = activeElement.closest('.country-mini__card');
      const nextDiv = parentDiv.nextElementSibling;

      if (nextDiv) {
        const nextH1 = nextDiv.querySelector('h1');
        if (nextH1) {
          choosenCountry = nextH1.dataset.cc;
          choosenCountryName = findCountryName(countries, choosenCountry);
          activateCountry(nextH1);

          const allCards = document.querySelectorAll('.country-mini__card');
          allCards.forEach(card => card.classList.remove('country-mini__card--active'));

          nextDiv.classList.add('country-mini__card--active');
        }
      }
    }
    displayWeather(await getWeather(choosenCountryName));

  };

  prevButton.onclick = async () => {
    const activeClass = 'countries-list__element--active';
    const activeElement = document.querySelector(`.${activeClass}`);

    if (activeElement) {
      const parentDiv = activeElement.closest('.country-mini__card');
      const prevDiv = parentDiv.previousElementSibling;

      if (prevDiv) {
        const prevH1 = prevDiv.querySelector('h1');
        if (prevH1) {
          choosenCountry = prevH1.dataset.cc;
          choosenCountryName = findCountryName(countries, choosenCountry);
          activateCountry(prevH1);

          const allCards = document.querySelectorAll('.country-mini__card');
          allCards.forEach(card => card.classList.remove('country-mini__card--active'));

          prevDiv.classList.add('country-mini__card--active');
        }
      }
    }
    displayWeather(await getWeather(choosenCountryName));
  };
}

main();
