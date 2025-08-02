// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import Country from "../components/Country";
import { useNavigate } from "react-router-dom";

interface Country {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    svg: string;
  };
}

export default function Dashboard() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,flags,population"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.error("Gagal fetch data negara:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = Array.isArray(countries)
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 overflow-x-hidden">
      <div className="w-full max-w-5xl mb-6 text-center">
        <h1 className="text-3xl font-bold text-black">🌍 Country Explorer</h1>
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full max-w-md mt-4 p-2 text-black rounded-md shadow focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.name.common}
            className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4 hover:shadow-lg transition"
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-3 font-semibold text-black text-lg">
              {country.name.common}
            </div>
            <div className="text-gray-600 text-sm">{country.region}</div>
            <div className="text-gray-500 text-xs">
              Population: {country.population.toLocaleString()}
            </div>
            <button
              className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-sm"
              onClick={() => navigate(`/details/${country.name.common}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
