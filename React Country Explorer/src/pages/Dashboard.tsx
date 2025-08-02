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
          console.error("Data negara bukan array:", data);
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
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-black">
        Country Explorer
      </h1>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Cari negara..."
          className="w-full px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCountries.map((country) => (
          <Country
            key={country.name.common}
            name={country.name.common}
            region={country.region}
            population={country.population}
            flags={country.flags.svg}
            onClick={() => navigate(`/country/${country.name.common}`)}
          />
        ))}
      </div>
    </div>
  );
}
