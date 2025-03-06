import { Country, State, City } from "country-state-city";

export const getCountries = () => {
  return Country.getAllCountries().map((country) => ({
    name: country.name,
    isoCode: country.isoCode,
  }));
};

export const getStates = (countryCode: string) => {
  return State.getStatesOfCountry(countryCode).map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
  }));
};

export const getCities = (countryCode: string, stateCode: string) => {
  return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    name: city.name,
  }));
};
