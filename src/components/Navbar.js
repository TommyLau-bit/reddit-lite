import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pastSearches, setPastSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load past searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    setPastSearches(savedSearches);
  }, []);

  const handleSearch = (term) => {
    const search = term || searchTerm;
    if (search.trim()) {
      onSearch(search); // Trigger search logic

      // Save the search term
      const updatedSearches = [search, ...pastSearches.filter((item) => item !== search)];
      setPastSearches(updatedSearches);
      localStorage.setItem('pastSearches', JSON.stringify(updatedSearches));

      setSuggestions([]); // Clear dropdown
      navigate(`/search/${encodeURIComponent(search)}`); // Navigate to correct route
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter suggestions based on input
    if (value) {
      setSuggestions(
        pastSearches.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions(pastSearches); // Show all past searches if input is empty
    }
  };

  const handleFocus = () => {
    setSuggestions(pastSearches); // Show past searches on focus
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion); // Update search term
    handleSearch(suggestion); // Trigger search with the selected suggestion
  };

  return (
    <nav className="navbar">
      <h1>Reddit Clone</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Reddit"
          value={searchTerm}
          onFocus={handleFocus} // Show dropdown on focus
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
        />
        {suggestions.length > 0 && (
          <ul className="dropdown">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;