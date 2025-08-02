interface CountryProps {
  name: string;
  region: string;
  population: number;
  flags: string;
  onClick: () => void;
}

export default function Country({
  name,
  region,
  population,
  flags,
  onClick,
}: CountryProps) {
  return (
    <div
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 transition-transform"
      onClick={onClick}
    >
      <img
        src={flags}
        alt={name}
        className="w-full h-32 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">{region}</p>
      <p className="text-gray-600"> {population.toLocaleString()}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        View Details{" "}
      </button>
    </div>
  );
}
