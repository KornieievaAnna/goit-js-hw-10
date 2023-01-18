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

refs.searchBox.addEventListener(
  'input',
  debounce(getCountryFromInput, DEBOUNCE_DELAY)
);

function getCountryFromInput() {
  refs.countryList.innerHTML = ' ';
  const countryName = refs.searchBox.value.trim();

  if (!countryName) {
    refs.countryList.innerHTML = ' ';
    refs.countryInfo.innerHTML = ' ';
    return;
  }

  fetchCountries(countryName)
    .then(countrys => {
      if (countrys.status === 404) {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      }
      if (countrys.length >= 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        // alert('to much');
      }

      if (countrys.length === 1) {
        //функция создает карточку данными о стране
        cardCountry(countrys);
      }

      if (countrys.length >= 2 && countrys.length <= 10) {
        //функция создает лист с флаг-имя стран
        listCountrys(countrys);
      }
    })
    .catch(error => {
      return error;
    });
}

// функция создает карточку данными о стране
function cardCountry(countrys) {
  console.log('one country');
  const markup = countrys
    .map(
      ({
        flags,
        name,
        capital,
        population,
        languages,
      }) => `<div class="country-card"><img class='country-info__icon' src='${
        flags.svg
      }' alt='' width='40px' />
      <h2 class="cocountry-info"> ${name.official}</h2>
    </div>
    <ul class="list">
      <li>
        <p class='country-info__list'>Capital: ${capital}</p>
      </li>
      <li>
        <p class='country-info__list'>Population: ${population}</p>
      </li>
      <li>
        <p class='country-info__list'>Languages: ${Object.values(
          languages
        )}</p>
      </li>
    </ul>`
    )
    .join('');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}
//функция создает лист с флаг-имя стран
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
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = markup;
}
