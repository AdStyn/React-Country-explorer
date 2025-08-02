import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetailsCountry() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((res) => {
          setCountry(res.data[0]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!country)
    return (
      <div className="text-center mt-20 text-red-500">Country not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <div className="fixed top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition"
        >
          ← Back
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 overflow-y-hidden">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full md:w-1/2 h-60 object-cover rounded"
            />
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                {country.name.common}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Official Name:</strong>
                  <div>{country.name.official}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Region:</strong>
                  <div>{country.region}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Subregion:</strong>
                  <div>{country.subregion}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Capital:</strong>
                  <div>{country.capital?.[0]}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Population:</strong>
                  <div>{country.population.toLocaleString()}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow">
                  <strong className="text-gray-600">Area:</strong>
                  <div>{country.area.toLocaleString()} km²</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow col-span-1 sm:col-span-2">
                  <strong className="text-gray-600">Timezones:</strong>
                  <div>{country.timezones.join(", ")}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow col-span-1 sm:col-span-2">
                  <strong className="text-gray-600">Languages:</strong>
                  <div>
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded shadow col-span-1 sm:col-span-2">
                  <strong className="text-gray-600">Currencies:</strong>
                  <div>
                    {country.currencies
                      ? Object.values(country.currencies)
                          .map((c: any) => `${c.name} (${c.symbol})`)
                          .join(", ")
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
