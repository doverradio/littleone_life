// shop/components/SearchBar.js
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    // Redirect to a search results page or handle the search functionality here
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form className="d-flex flex-grow-1 justify-content-center" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search items, bids, or listings"
        aria-label="Search"
        name="search"
        style={{ maxWidth: '400px' }}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
