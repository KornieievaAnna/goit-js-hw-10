import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_FILDS =
  '?fields=name,capital,currencies,population,flags,languages';
const name = 'peru';

refs.searchBox.addEventListener(
  'input',
  debounce(getCountryFromInput, DEBOUNCE_DELAY)
);

function getCountryFromInput() {
  refs.countryList.innerHTML = ' ';
  const countryName = refs.searchBox.value.trim();

  if (!countryName) {
    refs.countryList.innerHTML = ' ';
    return;
  }

  fetchCountries(countryName)
    .then(countrys => {
      if (countrys.length >= 10) {
        Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
        // alert('to much');
      }
      if (countrys.length === 1) {
        //функция создает карточку данными о стране
        cardCountry(countrys);
      }

      if (countrys.length >= 2 && countrys.length <= 10) {
        //функция создает лист с флаг-имя страны
        listCountrys(countrys);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      return error;
    });
}

//функция создает карточку данными о стране

function cardCountry(countrys) {
  //   console.log('one country');
  const markup = countrys
    .map(
      ({
        flags,
        name,
        capital,
        population,
        languages,
      }) => `<div class="country-card"><img class='country-info__icon' src='${flags.svg}' alt='' width='40px' />
      <h2 class="cocountry-info"> ${name.official}</h2>
    </div>
    <ul class="list">
      <li>
        <p class='country-info__description'>Capital: ${capital}</p>
      </li>
      <li>
        <p class='country-info__description'>Population: ${population}</p>
      </li>
      <li>
        <p class='country-info__description'>Languages: ${languages}</p>
      </li>
    </ul>`
    )
    .join('');
  refs.countryInfo.innerHTML = markup;
  console.log('one country');
}
//функция создает лист с флаг-имя страны
function listCountrys(countrys) {
  console.log('two and more countrys');
  const markup = countrys
    .map(
      ({
        flags,
        name,
      }) => `<div class="country-card"><img class='country-info__icon' src='${flags.svg}' alt='' width='40' />
      <h3 class="cocountry-info"> ${name.official}</h3>
    </div>`
    )
    .join('');
  refs.countryList.innerHTML = markup;
}
