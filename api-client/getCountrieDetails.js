const DETAILS = "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/by-cca3";

let CountryDetails = {
  name: {
    common: "",
    official: "",
  },
  cca3: "",
  flags: {
    png: "",
    svg: "",
    alt: "",
  },
  borders: [
    ""
  ]
};

export default async function getCountryDetails(cca3) {
  try {
    const response = await fetch(`${DETAILS}/${cca3}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const details = await response.json();
    return details;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}
