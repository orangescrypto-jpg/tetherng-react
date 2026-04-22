import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import { getProperties } from '../api';

function Home() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const cities = ['Lagos', 'Abuja (FCT)', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Benin City', 'Abeokuta', 'Warri', 'Jos', 'Kaduna', 'Maiduguri', 'Calabar', 'Uyo', 'Owerri', 'Akure', 'Asaba'];

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await getProperties();
            setProperties(data.properties || []);
            setFilteredProperties(data.properties || []);
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredProperties(properties);
            return;
        }
        
        const filtered = properties.filter(property =>
            property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProperties(filtered);
    };

    const handleCityClick = (city) => {
        handleSearch(city);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Next Home <br />With Trust Across Nigeria</h1>
                    <p>Your rent is held in escrow until you get the keys. No more fake listings or advance fee fraud.</p>
                    <SearchBar onSearch={handleSearch} />
                    <div className="trust-badges">
                        <span>✅ Verified Agents</span>
                        <span>🔒 Escrow Protection</span>
                        <span>🏠 Real Properties</span>
                        <span>💰 No Advance Fees</span>
                    </div>
                </div>
            </section>

            {/* Cities Section */}
            <section className="cities">
                <div className="container">
                    <h2>We Cover All Major Cities in Nigeria</h2>
                    <div className="city-grid">
                        {cities.map(city => (
                            <span 
                                key={city} 
                                className="city-badge" 
                                onClick={() => handleCityClick(city)}
                            >
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="features">
                <div className="container">
                    <h2>How Tetherng Protects You</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3>1. Find Verified Properties</h3>
                            <p>All agents and properties are verified before listing. No fake listings anywhere in Nigeria.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>2. Pay Into Escrow</h3>
                            <p>Your rent is held safely by Tetherng - not released to the agent until you get the keys.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔑</div>
                            <h3>3. Get Keys, Then Release</h3>
                            <p>Agent gets paid only after you confirm you've received the keys to your new home.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Section */}
            <section className="properties">
                <div className="container">
                    <h2>Featured Properties Across Nigeria</h2>
                    <p className="section-subtitle">Verified listings from trusted agents</p>
                    {loading ? (
                        <div className="loading">Loading properties...</div>
                    ) : (
                        <div className="property-grid">
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))
                            ) : (
                                <div className="empty-state">No properties found. Check back soon!</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action for Agents */}
            <section className="cta-section">
                <div className="container">
                    <h2>Are You a Property Agent?</h2>
                    <p>Join Tetherng and get verified tenants with guaranteed payments through escrow.</p>
                    <a href="/agent-signup" className="btn-cta">List Your Properties Today →</a>
                </div>
            </section>
        </div>
    );
}

export default Home;
