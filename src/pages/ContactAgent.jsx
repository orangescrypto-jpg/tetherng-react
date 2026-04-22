import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty, sendInquiry } from '../api';

function ContactAgent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        senderName: '',
        senderEmail: '',
        senderPhone: '',
        message: ''
    });

    const loadProperty = useCallback(async () => {
        try {
            const data = await getProperty(id);
            setProperty(data.property);
        } catch (error) {
            console.error('Error loading property:', error);
            setError('Failed to load property details');
        }
    }, [id]);

    useEffect(() => {
        loadProperty();
        
        const tenant = localStorage.getItem('tetherng_user');
        if (tenant) {
            const tenantData = JSON.parse(tenant);
            if (tenantData.type === 'tenant') {
                setFormData(prev => ({
                    ...prev,
                    senderName: tenantData.fullName || '',
                    senderEmail: tenantData.email || ''
                }));
            }
        }
    }, [loadProperty]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { senderName, senderEmail, senderPhone, message } = formData;

        if (!senderName || !senderEmail || !message) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            await sendInquiry({
                propertyId: parseInt(id),
                propertyTitle: property.title,
                propertyLocation: property.location,
                propertyPrice: property.price,
                senderName,
                senderEmail,
                senderPhone,
                message,
                agentEmail: property.agent_email,
                agentName: property.agent_name
            });

            alert(`✅ Message Sent Successfully!\n\nThank you ${senderName}.\n\nThe agent will contact you within 24 hours.`);
            navigate(`/property/${id}`);
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!property) return <div className="loading">Loading property details...</div>;

    return (
        <div className="contact-wrapper">
            <div className="contact-card">
                <div className="contact-header">
                    <h1>📞 Contact Agent</h1>
                    <p>Send your inquiry about this property</p>
                </div>
                <div className="contact-body">
                    <div className="property-info" style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #1D4ED8' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>📋 {property.title}</h3>
                        <p style={{ margin: '0.25rem 0' }}>📍 {property.location}</p>
                        <p style={{ margin: '0.25rem 0' }}>💰 {property.price}</p>
                        <p style={{ marginTop: '0.5rem' }}>👔 Agent: {property.agent_name || 'Verified Agent'}</p>
                    </div>

                    {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>❌ {error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Full Name *</label>
                            <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} placeholder="Olu Adeyemi" required />
                        </div>

                        <div className="form-group">
                            <label>Your Email Address *</label>
                            <input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleChange} placeholder="tenant@example.com" required />
                        </div>

                        <div className="form-group">
                            <label>Your Phone Number</label>
                            <input type="tel" name="senderPhone" value={formData.senderPhone} onChange={handleChange} placeholder="0803 123 4567" />
                        </div>

                        <div className="form-group">
                            <label>Your Message *</label>
                            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="I'm interested in this property. I would like to schedule a viewing..." required></textarea>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Sending...' : '📤 Send Message'}
                        </button>
                        <a href={`/property/${id}`} style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#6b7280', textDecoration: 'none' }}>← Back to Property</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactAgent;
