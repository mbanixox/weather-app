const SearchCity = ({ city }: { city: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <form action="/" className="search-bar">
        <input
          type="text"
          name="city"
          defaultValue={city}
          placeholder="Search for a city..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg
                    hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchCity;
