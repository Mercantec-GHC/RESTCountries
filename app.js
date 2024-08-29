async function fetchCountries() {
  let countries = [];
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,cca3"
    );

    if (!response.ok) {
      throw new Error("Der gik noget galt!");
    }

    countries = await response.json();

    console.log(countries);

    // Mere kode!
  } catch (error) {
    console.error("Der var et problem med vores API-kald:", error);
  }
  GetRandomCountry(countries);
}

function GetRandomCountry(countries) {
  let randomCountryNumber = Math.floor(Math.random() * countries.length);
  let randomCountry = countries[randomCountryNumber];
  console.log(randomCountry);
  console.log(randomCountry.name.common);
  console.log(randomCountry.flags.png);
  return randomCountry;
}

fetchCountries();
