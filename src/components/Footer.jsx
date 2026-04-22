import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>🏠 Tetherng</h3>
                        <p>Trusted property rentals across Nigeria. Your rent is safe with escrow.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <Link to="/">Find Property</Link>
                        <Link to="/agent-signup">List Property</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: hello@tetherng.com</p>
                        <p>Phone: 0800-TETHERNG</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Tetherng.com - Securing rent from Lagos to Maiduguri</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
