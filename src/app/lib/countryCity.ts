"use client";

export const getCountries = async () => {
  const { Country } = await import("country-state-city");
  return Country.getAllCountries().map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
  }));
};

export const getStates = async (countryCode: string) => {
  const { State } = await import("country-state-city");
  return State.getStatesOfCountry(countryCode).map((s) => ({
    name: s.name,
    isoCode: s.isoCode,
  }));
};

export const getCities = async (countryCode: string, stateCode: string) => {
  const { City } = await import("country-state-city");
  return City.getCitiesOfState(countryCode, stateCode).map((c) => ({
    name: c.name,
  }));
};
