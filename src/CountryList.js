import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css'; 

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
    }
  }
`;

const PAGE_SIZE = 10; 

const predefinedColors = ['lightblue', 'lightgreen', 'lightpink']; // 

const CountryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); 
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    if (!loading && data) {
      const filteredCountries = data.countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const lastItemIndex = Math.min(filteredCountries.length - 1, 9);
      setSelectedCountry(filteredCountries[lastItemIndex]);
    }
  }, [loading, data, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleCountryClick = country => {
    setSelectedCountry(country); 
    setSelectedColorIndex(prevIndex => (prevIndex + 1) % predefinedColors.length);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const countriesForPage = filteredCountries.slice(startIndex, endIndex);

  return (
    <div className="country-list-container">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="country-list">
        {countriesForPage.map((country, index) => (
          <li
            key={country.code}
            className={`country-item ${selectedCountry === country ? 'selected' : ''}`}
            style={{
              background:
                selectedCountry === country ? predefinedColors[selectedColorIndex] : 'transparent',
            }}
            onClick={() => handleCountryClick(country)} 
          >
            <strong>{country.name}</strong>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default CountryList;
