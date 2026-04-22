import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantSignup } from '../api';

function TenantSignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        preferredLocation: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        
        if (name === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 0 && !value.startsWith('0')) value = '0' + value;
            if (value.length > 11) value = value.slice(0, 11);
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const { fullName, email, phone, preferredLocation, password, confirmPassword } = formData;
        
        const errors = [];
        if (!fullName) errors.push('Full Name is required');
        if (!email) errors.push('Email Address is required');
        if (!phone) errors.push('Phone Number is required');
        if (password.length < 6) errors.push('Password must be at least 6 characters');
        if (password !== confirmPassword) errors.push('Passwords do not match');
        
        if (errors.length > 0) {
            setError(errors.join('\n• '));
            return;
        }
        
        setLoading(true);
        
        try {
            await tenantSignup({
                fullName,
                email,
                phone,
                preferredLocation,
                password
            });
            
            alert(`✅ Welcome to Tetherng, ${fullName}!\n\nYour account has been created successfully.\n\nYou can now save properties you love!`);
            navigate('/tenant-signin');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>🏠 Create Free Account</h1>
                    <p>Save your favorite properties and find your dream home</p>
                </div>
                <div className="signup-body">
                    {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>❌ {error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Olu Adeyemi" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tenant@example.com" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0803 123 4567" required />
                            </div>
                            <div className="form-group">
                                <label>Preferred Location</label>
                                <select name="preferredLocation" value={formData.preferredLocation} onChange={handleChange}>
                                    <option value="">Select city</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Abuja">Abuja (FCT)</option>
                                    <option value="Port Harcourt">Port Harcourt</option>
                                    <option value="Ibadan">Ibadan</option>
                                    <option value="Kano">Kano</option>
                                    <option value="Enugu">Enugu</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Create Password *</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password *</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required />
                            </div>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Creating account...' : '✓ Create Free Account'}
                        </button>

                        <div className="signup-footer">
                            Already have an account? <a href="/tenant-signin">Sign in here</a>
                            <br />
                            <a href="/" style={{ fontSize: '0.8rem' }}>← Back to Homepage</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TenantSignUp;
