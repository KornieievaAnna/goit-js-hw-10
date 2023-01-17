const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_FILDS ='?fields=name,capital,population,flags,languages';

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}${countryName}${FILTER_FILDS}`).then(response => {
    return response.json();
  });
}
 export { fetchCountries };
