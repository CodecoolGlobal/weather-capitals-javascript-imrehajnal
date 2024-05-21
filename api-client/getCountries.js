const all =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/all";

export default async function getCountries() {
  const response = await fetch(all)
  const countries = await response.json()
  return countries;
}
