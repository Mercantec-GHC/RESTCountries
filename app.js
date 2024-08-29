let ChosenCountry;

async function initializeGame() {
  let countries = await fetchCountries();
  ChosenCountry = GetRandomCountry(countries);
  ChangeFlag();
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
  return countries;
}

function GetRandomCountry(countries) {
  let randomCountryNumber = Math.floor(Math.random() * countries.length);
  let randomCountry = countries[randomCountryNumber];
  console.log(randomCountry);
  console.log(randomCountry.name.common);
  console.log(randomCountry.flags.png);
  return randomCountry;
}

function GuessCountry() {
  const userGuess = document.getElementById("flag-guess").value.trim();
  console.log(userGuess);
  const resultDiv = document.getElementById("result");

  if (!userGuess) {
    resultDiv.textContent = "Indtast venligst et lands navn.";
    resultDiv.style.color = "orange";
    return;
  }

  if (
    ChosenCountry &&
    userGuess.toLowerCase() === ChosenCountry.name.common.toLowerCase()
  ) {
    resultDiv.textContent = "Korrekt! Det er " + userGuess + "!";
    resultDiv.style.color = "green";
    document.getElementById("flag-guess").value = "";
  } else {
    resultDiv.textContent =
      "Forkert, det var ikke " + userGuess + " prøv igen!";
    resultDiv.style.color = "red";
  }
}

function ChangeFlag() {
  let img = document.getElementById("flag-image");
  console.log(ChosenCountry);
  img.src = ChosenCountry.flags.png;
}

initializeGame();
