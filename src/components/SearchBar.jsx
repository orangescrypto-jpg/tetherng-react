import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Search by city... Lagos, Abuja, Port Harcourt, Ibadan, Kano"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">🔍 Search Properties</button>
        </form>
    );
}

export default SearchBar;
