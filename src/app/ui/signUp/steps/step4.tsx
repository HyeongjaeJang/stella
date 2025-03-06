"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCountries, getStates, getCities } from "@/app/lib/countryCity";

const Step4 = ({
  action,
  nextStep,
  prevStep,
}: {
  action: (country: string, city: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCountries(getCountries());
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setStates(getStates(countryCode));
    setCities([]);
    setSelectedCity("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setCities(getCities(selectedCountry, stateCode));
    setSelectedCity("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    action(selectedCountry, cityName);
  };

  return (
    <>
      <motion.div
        key="step4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <h2 className="text-lg font-semibold mb-2">Step 4/5</h2>
        <p>Where were you born?</p>

        {isClient && (
          <div>
            <label className="block font-semibold mt-3">Country</label>
            <select
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="border p-2 w-full mt-1 rounded-md"
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            {selectedCountry && (
              <div>
                <label className="block font-semibold mt-3">State</label>
                <select
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="border p-2 w-full mt-1 rounded-md"
                  disabled={states.length === 0}
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedState && (
              <div>
                <label className="block font-semibold mt-3">City</label>
                <select
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="border p-2 w-full mt-1 rounded-md"
                  disabled={cities.length === 0}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 p-2 rounded-md" onClick={prevStep}>
            Back
          </button>
          <button
            className={`p-2 rounded-md ${
              selectedCity ? "bg-purple-300" : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={nextStep}
            disabled={!selectedCity}
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Step4;
