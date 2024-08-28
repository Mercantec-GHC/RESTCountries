async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,cca3"
    );

    if (!response.ok) {
      throw new Error("Der gik noget galt!");
    }

    const countries = await response.json();

    console.log(countries);

    // Mere kode!
  } catch (error) {
    console.error("Der var et problem med vores API-kald:", error);
  }
}

fetchCountries();
