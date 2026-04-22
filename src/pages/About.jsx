import React from 'react';

function About() {
    return (
        <div className="about-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '1rem' }}>About Tetherng</h1>
                <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>Building trust in Nigeria's property market, one rental at a time</p>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#1D4ED8', marginBottom: '1rem' }}>📖 Our Story</h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                    Tetherng was born from a simple but painful observation: finding a legitimate place to rent in Nigeria had become a nightmare. Fake agents, non-existent properties, and advance fee fraud had made the process frustrating, expensive, and dangerous for millions of Nigerians.
                </p>
                <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                    We started Tetherng in 2025 with a mission to bring trust, transparency, and security to property rentals across Nigeria. What began as a small team in Lagos has grown into a platform serving tenants and agents from Lagos to Maiduguri, from Port Harcourt to Kano.
                </p>
                <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                    Today, Tetherng is Nigeria's fastest-growing property trust platform, helping thousands of families find their dream homes without fear of fraud.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#1D4ED8', marginBottom: '1rem' }}>🎯 Our Mission</h3>
                    <p style={{ color: '#4b5563' }}>To eliminate rental fraud in Nigeria by providing a secure escrow platform where tenants pay only when they receive their keys, and agents get paid reliably for legitimate properties.</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#1D4ED8', marginBottom: '1rem' }}>👁️ Our Vision</h3>
                    <p style={{ color: '#4b5563' }}>A Nigeria where every property transaction is transparent, every agent is verified, and every tenant can rent with complete confidence.</p>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#1D4ED8', marginBottom: '1rem' }}>💎 Our Core Values</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Trust First</h4>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Everything we build starts with trust. If it doesn't build trust, we don't build it.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚖️</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Transparency</h4>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>No hidden fees, no fine print, no surprises. What you see is what you get.</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🇳🇬</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>For Nigeria</h4>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Built by Nigerians, for Nigerians. We understand the local challenges and opportunities.</p>
                    </div>
                </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', color: 'white' }}>
                <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Find Your Next Home?</h2>
                <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Join thousands of Nigerians who trust Tetherng for secure property rentals.</p>
                <a href="/" style={{ display: 'inline-block', background: '#F59E0B', color: '#1f2937', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Start Searching →</a>
            </div>
        </div>
    );
}

export default About;
