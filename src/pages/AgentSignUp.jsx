import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentSignup } from '../api';

function AgentSignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        agencyName: '',
        bvn: '',
        experience: '',
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
        
        if (name === 'bvn') {
            value = value.replace(/\D/g, '').slice(0, 11);
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const { fullName, email, phone, agencyName, bvn, experience, password, confirmPassword } = formData;
        
        const errors = [];
        if (!fullName) errors.push('Full Name is required');
        if (!email) errors.push('Email Address is required');
        if (!phone) errors.push('Phone Number is required');
        if (!agencyName) errors.push('Agency Name is required');
        if (!bvn) errors.push('BVN/NIN is required');
        if (!experience) errors.push('Years of Experience is required');
        if (password.length < 6) errors.push('Password must be at least 6 characters');
        if (password !== confirmPassword) errors.push('Passwords do not match');
        
        if (errors.length > 0) {
            setError(errors.join('\n• '));
            return;
        }
        
        setLoading(true);
        
        try {
            await agentSignup({
                fullName,
                email,
                phone,
                agencyName,
                bvn,
                experience,
                password
            });
            
            alert(`✅ Application Received!\n\nThank you ${fullName} from ${agencyName}.\n\nWe will verify your BVN/NIN and contact you within 24-48 hours.`);
            navigate('/agent-signin');
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
                    <h1>🏢 Become a Verified Agent</h1>
                    <p>Join Nigeria's most trusted property platform</p>
                </div>
                <div className="signup-body">
                    <div className="verification-badge">
                        <strong>⚠️ Important:</strong> All agents must verify their identity (BVN/NIN) before listing properties. This builds trust with tenants.
                    </div>
                    
                    {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', whiteSpace: 'pre-line' }}>❌ {error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Olu Adeyemi" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="agent@example.com" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0803 123 4567" required />
                            </div>
                            <div className="form-group">
                                <label>Agency Name *</label>
                                <input type="text" name="agencyName" value={formData.agencyName} onChange={handleChange} placeholder="Adeyemi Properties Ltd" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>BVN or NIN *</label>
                                <input type="text" name="bvn" value={formData.bvn} onChange={handleChange} placeholder="11-digit number" required />
                                <small style={{ color: '#6b7280', fontSize: '0.7rem' }}>For identity verification</small>
                            </div>
                            <div className="form-group">
                                <label>Years of Experience *</label>
                                <select name="experience" value={formData.experience} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="0-1">Less than 1 year</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5+">5+ years</option>
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
                            {loading ? 'Submitting...' : '✓ Submit Verification'}
                        </button>

                        <div className="signup-footer">
                            Already have an account? <a href="/agent-signin">Sign in here</a>
                            <br />
                            <a href="/" style={{ fontSize: '0.8rem' }}>← Back to Homepage</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgentSignUp;
