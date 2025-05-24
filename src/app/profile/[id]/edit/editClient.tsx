"use client";

import Header from "@/app/ui/home/header";
import { getCountries, getStates, getCities } from "@/app/lib/countryCity";
import { useState, useEffect } from "react";
import arrow from "../../../../../public/backArrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Info = {
  id: number;
  name: string;
  email: string;
  birth_date: Date | null;
  birth_time: Date | null;
  gender: string | null;
  city_country: string | null;
  z_sign: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const EditClient = ({
  editAction,
  info,
}: {
  editAction: (formData: FormData) => void;
  info: Info;
}) => {
  const router = useRouter();
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(
    info.city_country?.split(",")[0] || "",
  );
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState(info.gender || "");

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
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
    } else {
      setSelectedCity("");
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    const cities = await getCities(selectedCountry, stateCode);
    setCities(cities);
    setSelectedCity("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <Header
        user={{
          id: info.id.toString(),
          name: info.name,
          z_sign: info.z_sign,
          email: info.email,
        }}
      />
      <form action={editAction} className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-2">
          <Image
            src={arrow}
            alt="back"
            width={10}
            height={10}
            priority
            onClick={() => goBack()}
          />
          <h2 className="text-2xl font-extralight">Edit Profile</h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 font-semibold text-sm">Full Name</p>
          <input
            type="text"
            name="name"
            defaultValue={info.name}
            className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 font-semibold text-sm">Date of birth</p>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={info.birth_date?.toISOString().split("T")[0]}
            className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 font-semibold text-sm">Time of birth</p>
          <input
            type="time"
            name="time"
            defaultValue={info.birth_time
              ?.toISOString()
              .split("T")[1]
              .slice(0, 5)}
            className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
          />
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
              <label className="text-gray-400 font-semibold text-sm">
                State
              </label>
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
              <label className="text-gray-400 font-semibold text-sm">
                City
              </label>
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
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 font-semibold text-sm">Gender</p>
          <select
            name="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="font-thin bg-inherit border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 dark:invert text-black"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          className="bg-gray-200 text-black w-1/3 self-center p-2 rounded-xl font-semibold shadow-lg shadow-white/10"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditClient;
