"use client";

export const getCountries = async () => {
  if (typeof window === "undefined") return [];
  const { Country } = await import("country-state-city");
  return Country.getAllCountries().map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
  }));
};

export const getStates = async (countryCode: string) => {
  if (typeof window === "undefined") return [];
  const { State } = await import("country-state-city");
  return State.getStatesOfCountry(countryCode).map((s) => ({
    name: s.name,
    isoCode: s.isoCode,
  }));
};

export const getCities = async (countryCode: string, stateCode: string) => {
  if (typeof window === "undefined") return [];
  const { City } = await import("country-state-city");
  return City.getCitiesOfState(countryCode, stateCode).map((c) => ({
    name: c.name,
  }));
};
