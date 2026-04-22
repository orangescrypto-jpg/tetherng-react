import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantSignin } from '../api';

function TenantSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await tenantSignin({ email, password });
            
            if (data.success && data.token) {
                localStorage.setItem('tetherng_token', data.token);
                localStorage.setItem('tetherng_user', JSON.stringify({ ...data.tenant, type: 'tenant' }));
                alert(`✅ Welcome back ${data.tenant.fullName}!`);
                navigate('/tenant-dashboard');
            } else {
                setError(data.error || 'Invalid email or password');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-card">
                <div className="signin-header">
                    <h1>🔐 Tenant Sign In</h1>
                    <p>Sign in to your tenant account</p>
                </div>
                <div className="signin-body">
                    {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tenant@example.com" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password" 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-signin" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In →'}
                        </button>
                        <div className="signin-footer">
                            Don't have an account? <a href="/tenant-signup">Create Free Account</a>
                            <br />
                            <a href="/" style={{ fontSize: '0.8rem' }}>← Back to Homepage</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TenantSignIn;
