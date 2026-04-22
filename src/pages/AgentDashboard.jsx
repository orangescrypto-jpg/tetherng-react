import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAgentProperties, deleteProperty } from '../api';

function AgentDashboard() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, rented: 0, earnings: 0 });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
        loadProperties(parsedUser.email);
    }, [navigate]);

    const loadProperties = async (email) => {
        try {
            const data = await getAgentProperties(email);
            const props = data.properties || [];
            setProperties(props);
            
            const total = props.length;
            const rented = props.filter(p => p.status === 'rented').length;
            const earnings = props
                .filter(p => p.status === 'rented')
                .reduce((sum, p) => sum + (p.price_value || 0), 0);
            
            setStats({ total, rented, earnings });
        } catch (error) {
            console.error('Error loading properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await deleteProperty(id);
                alert('Property deleted successfully!');
                if (user) loadProperties(user.email);
            } catch (error) {
                alert('Error deleting property: ' + error.message);
            }
        }
    };

    const handleEdit = (property) => {
        localStorage.setItem('tetherng_editing_property', JSON.stringify(property));
        navigate(`/edit-property/${property.id}`);
    };

    if (loading) return <div className="loading">Loading dashboard...</div>;
    if (!user) return null;

    return (
        <div className="dashboard-wrapper">
            <div className="welcome-card">
                <h1>Welcome back, {user.fullName}!</h1>
                <p>{user.agencyName} • {user.email}</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{stats.total}</div>
                    <div className="stat-label">Total Properties</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.rented}</div>
                    <div className="stat-label">Active Rentals</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">₦{stats.earnings.toLocaleString()}</div>
                    <div className="stat-label">Total Earnings</div>
                </div>
                <div className="stat-card" onClick={() => navigate('/agent-inbox')} style={{ cursor: 'pointer' }}>
                    <div className="stat-number" id="unreadCount">0</div>
                    <div className="stat-label">📬 Messages</div>
                </div>
            </div>

            <div className="section-header">
                <h2>📋 Your Properties</h2>
                <a href="/add-property" className="btn-add">+ Add New Property</a>
            </div>

            <div className="properties-table">
                <table>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-state">No properties yet. Click "Add New Property" to get started!</td>
                            </tr>
                        ) : (
                            properties.map(property => (
                                <tr key={property.id}>
                                    <td>
                                        <strong>{property.title}</strong>
                                        <br />
                                        <small style={{ color: '#6b7280' }}>{property.bedrooms} beds • {property.bathrooms} baths • {property.size}</small>
                                    </td>
                                    <td>📍 {property.location}</td>
                                    <td><strong>{property.price}</strong></td>
                                    <td>
                                        <span className={`property-status ${property.status === 'available' ? 'status-available' : 'status-rented'}`}>
                                            {property.status === 'available' ? 'Available' : 'Rented'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-edit" onClick={() => handleEdit(property)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(property.id)}>Delete</button>
                                            <button className="btn-view" onClick={() => navigate(`/property/${property.id}`)}>View</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AgentDashboard;
