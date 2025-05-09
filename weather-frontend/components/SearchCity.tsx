const SearchCity = ({ city }: { city: string }) => {
  return (
    <div className="bg-white rounded-xl min-w-0 py-6">
      <form action="/" className="search_bar">
        <input
          type="text"
          name="city"
          defaultValue={city}
          placeholder="Search for a city..."
          className="search_input"
        />

        <button
          type="submit"
          className="search_btn"
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default SearchCity;
