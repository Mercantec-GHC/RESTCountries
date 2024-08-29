let ChosenCountry;

async function initializeGame() {
  ChosenCountry = await fetchCountries();
}

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
  } catch (error) {
    console.error("Der var et problem med vores API-kald:", error);
  }
  let randomCountry = GetRandomCountry(countries);

  return randomCountry;
}

function GetRandomCountry(countries) {
  let randomCountryNumber = Math.floor(Math.random() * countries.length);
  let randomCountry = countries[randomCountryNumber];
  console.log(randomCountry);
  console.log(randomCountry.name.common);
  console.log(randomCountry.flags.png);
  return randomCountry;
}

function GuessCountry(guess) {
  if (guess === ChosenCountry.name.common) {
    console.log("Rigtigt");
  } else {
    console.log("Forkert, prøv igen!");
  }
}

initializeGame();
