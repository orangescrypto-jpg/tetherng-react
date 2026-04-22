import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../api';

function AddProperty() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '🏠',
        priceValue: '',
        price: '',
        location: '',
        status: 'available',
        bedrooms: '',
        bathrooms: '',
        size: '',
        propertyType: 'apartment',
        description: ''
    });

    const images = ['🏠', '🏢', '🏘️', '🏡', '🏚️', '🏤'];

    useEffect(() => {
        const token = localStorage.getItem('tetherng_token');
        const userData = localStorage.getItem('tetherng_user');
        
        if (!token || !userData) {
            navigate('/agent-signin');
            return;
        }
        
        const parsedUser = JSON.parse(userData);
        if (parsedUser.type !== 'agent') {
            navigate('/agent-signin');
            return;
        }
        
        setUser(parsedUser);
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'priceValue') {
            const numValue = parseInt(value);
            if (!isNaN(numValue)) {
                setFormData(prev => ({ ...prev, price: `₦${numValue.toLocaleString()}/year` }));
            }
        }
    };

    const handleImageSelect = (image) => {
        setFormData(prev => ({ ...prev, image }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { title, image, priceValue, price, location, status, bedrooms, bathrooms, size, propertyType, description } = formData;

        const errors = [];
        if (!title) errors.push('Property Title is required');
        if (!priceValue) errors.push('Price is required');
        if (!location) errors.push('Location is required');
        if (!bedrooms) errors.push('Number of bedrooms is required');
        if (!bathrooms) errors.push('Number of bathrooms is required');
        if (!size) errors.push('Size is required');
        if (!description) errors.push('Description is required');

        if (errors.length > 0) {
            setError(errors.join('\n• '));
            setLoading(false);
            return;
        }

        try {
            await addProperty({
                agentEmail: user.email,
                title,
                image,
                price,
                priceValue: parseInt(priceValue),
                location,
                status,
                bedrooms: parseInt(bedrooms),
                bathrooms: parseInt(bathrooms),
                size,
                propertyType,
                description
            });

            alert('✅ Property Added Successfully!\n\nRedirecting to your dashboard...');
            navigate('/agent-dashboard');
        } catch (err) {
            setError(err.message || 'Failed to add property. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <div className="form-header">
                    <h1>🏠 Add New Property</h1>
                    <p>List your property for thousands of tenants to see</p>
                </div>
                <div className="form-body">
                    {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>❌ {error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Property Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Modern 3-Bedroom Apartment" required />
                        </div>

                        <div className="form-group">
                            <label>Property Image *</label>
                            <div className="image-selector">
                                {images.map(img => (
                                    <div 
                                        key={img}
                                        className={`image-option ${formData.image === img ? 'selected' : ''}`}
                                        onClick={() => handleImageSelect(img)}
                                    >
                                        {img}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price (per year) *</label>
                                <input type="number" name="priceValue" value={formData.priceValue} onChange={handleChange} placeholder="e.g., 1500000" required />
                                <small style={{ color: '#6b7280' }}>In Naira (₦)</small>
                            </div>
                            <div className="form-group">
                                <label>Price Display</label>
                                <input type="text" value={formData.price} readOnly placeholder="₦1,500,000/year" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Location *</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Lekki Phase 1, Lagos" required />
                            </div>
                            <div className="form-group">
                                <label>Property Status</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="available">Available</option>
                                    <option value="rented">Rented</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Bedrooms *</label>
                                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="e.g., 3" required />
                            </div>
                            <div className="form-group">
                                <label>Bathrooms *</label>
                                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="e.g., 2" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Size (m²) *</label>
                                <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g., 150m²" required />
                            </div>
                            <div className="form-group">
                                <label>Property Type</label>
                                <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                                    <option value="apartment">Apartment</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="self-contained">Self-Contained</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe the property... amenities, nearby facilities, etc." required></textarea>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Adding Property...' : '✓ List Property'}
                        </button>
                        <a href="/agent-dashboard" className="btn-cancel" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', background: '#6b7280', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', textDecoration: 'none' }}>← Cancel</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProperty;
