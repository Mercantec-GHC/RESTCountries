let ChosenCountry;

async function initializeGame() {
  let countries = await fetchCountries();
  ChosenCountry = GetRandomCountry(countries);
  ChangeFlag();
  let Choices = MultipleChoice(countries, ChosenCountry, 3);
  AddChoisesToHTML(Choices);
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

function MultipleChoice(countries, correctAnswer, numberOfChoices) {
  let Choices = [];
  Choices.push(correctAnswer.name.common);
  for (let i = 0; i < numberOfChoices; i++) {
    let randomCountryNumber = Math.floor(Math.random() * countries.length);
    let randomCountry = countries[randomCountryNumber];
    Choices.push(randomCountry.name.common);
  }
  console.log(Choices);
  return Choices;
}

function AddChoisesToHTML(Choices) {
  const selectElement = document.getElementById("flag-choices");
  selectElement.innerHTML = "";
  let option = document.createElement("option");
  option.value = "";
  option.textContent = "Vælg et land";
  selectElement.appendChild(option);

  Choices.forEach((countryName) => {
    option = document.createElement("option");
    option.value = countryName;
    option.textContent = countryName;
    selectElement.appendChild(option);
  });

  // Tilføj event listener, der aktiverer gætningen når et valg ændres
  selectElement.addEventListener("change", GuessCountry);
}

function GuessCountry() {
  const userGuess = document.getElementById("flag-choices").value.trim();
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
