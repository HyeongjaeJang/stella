import { getCountries, getStates, getCities } from "@/app/lib/countryCity";
import { Info } from "@/types/types";
import React, { useEffect, useState } from "react";

const User1 = ({
  setFormData,
  formData,
  edit,
}: {
  setFormData: React.Dispatch<React.SetStateAction<Partial<Info>>>;
  formData: Partial<Info>;
  edit: () => void;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.birth_date &&
      formData.birth_time &&
      formData.gender &&
      formData.city_country
    ) {
      setFormData(formData as Info);
      edit();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(
    formData.city_country?.split(",")[0] || "",
  );
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry).then((data) => setStates(data));
    }
  }, [selectedCountry]);

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    const states = await getStates(countryCode);
    setStates(states);
    setCities([]);
    setSelectedCity("");
    if (states.length === 0) {
      const countryName =
        countries.find((c) => c.isoCode === countryCode)?.name || "";
      setSelectedCity(countryName);
      setFormData((prev) => ({
        ...prev,
        city_country: `${countryCode}, ${countryName}`,
      }));
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    const cities = await getCities(selectedCountry, stateCode);
    setCities(cities);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setFormData((prev) => ({
      ...prev,
      city_country: `${selectedCountry}, ${cityName}`,
    }));
  };

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400 font-semibold text-sm">Full Name</p>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400 font-semibold text-sm">Date of birth</p>
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date?.toString() || ""}
          onChange={handleChange}
          className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400 font-semibold text-sm">Time of birth</p>
        <input
          type="time"
          name="birth_time"
          value={formData.birth_time?.toString() || ""}
          onChange={handleChange}
          className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400 font-semibold text-sm">Gender</p>
        <select
          name="gender"
          value={formData.gender || selectedGender}
          onChange={(e) => {
            setSelectedGender(e.target.value);
            setFormData((prev) => ({ ...prev, gender: e.target.value }));
          }}
          className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-400 font-semibold text-sm">Country</label>
        <select
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
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

        {selectedCountry && states.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-gray-400 font-semibold text-sm">State</label>
            <select
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
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
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-gray-400 font-semibold text-sm">City</label>
            <select
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
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
        <input
          type="hidden"
          name="city_country"
          value={
            selectedCity
              ? `${selectedCountry}, ${selectedCity}`
              : selectedCountry
          }
        />
      </div>
      <button
        type="submit"
        className="bg-button text-white p-2 rounded-md self-center mt-2"
      >
        Save Partner Info
      </button>
    </form>
  );
};

export default User1;
