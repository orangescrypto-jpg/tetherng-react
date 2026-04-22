import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAgentInquiries, markInquiryRead } from '../api';

function AgentInbox() {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loadInquiries = useCallback(async (email) => {
        try {
            const data = await getAgentInquiries(email);
            const msgs = data.inquiries || [];
            setInquiries(msgs);
            applyFilter(msgs, currentFilter);
        } catch (error) {
            console.error('Error loading inquiries:', error);
        } finally {
            setLoading(false);
        }
    }, [currentFilter]);

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
        loadInquiries(parsedUser.email);
    }, [navigate, loadInquiries]);

    const applyFilter = (msgs, filter) => {
        let filtered = msgs;
        if (filter === 'unread') {
            filtered = msgs.filter(i => !i.is_read);
        } else if (filter === 'read') {
            filtered = msgs.filter(i => i.is_read);
        }
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilteredInquiries(filtered);
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        applyFilter(inquiries, filter);
    };

    const handleViewMessage = async (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
        
        if (!inquiry.is_read) {
            try {
                await markInquiryRead(inquiry.id);
                const updatedInquiries = inquiries.map(i => 
                    i.id === inquiry.id ? { ...i, is_read: true } : i
                );
                setInquiries(updatedInquiries);
                applyFilter(updatedInquiries, currentFilter);
            } catch (error) {
                console.error('Error marking as read:', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedInquiry(null);
    };

    const getStats = () => {
        const total = inquiries.length;
        const unread = inquiries.filter(i => !i.is_read).length;
        const read = inquiries.filter(i => i.is_read).length;
        return { total, unread, read };
    };

    const stats = getStats();

    if (loading) return <div className="loading">Loading messages...</div>;
    if (!user) return null;

    return (
        <div className="inbox-wrapper">
            <div className="welcome-card">
                <h1>📬 Agent Inbox</h1>
                <p>Messages from tenants interested in your properties</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{stats.total}</div>
                    <div className="stat-label">Total Messages</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.unread}</div>
                    <div className="stat-label">Unread</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.read}</div>
                    <div className="stat-label">Read</div>
                </div>
            </div>

            <div className="filter-buttons">
                <button 
                    className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                >
                    All Messages
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'unread' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('unread')}
                >
                    Unread
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'read' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('read')}
                >
                    Read
                </button>
            </div>

            <div className="messages-list">
                {filteredInquiries.length === 0 ? (
                    <div className="empty-state">📭 No messages yet.<br /><br />When tenants contact you about properties, they'll appear here.</div>
                ) : (
                    filteredInquiries.map(inquiry => (
                        <div 
                            key={inquiry.id} 
                            className={`message-item ${!inquiry.is_read ? 'unread' : ''}`}
                            onClick={() => handleViewMessage(inquiry)}
                        >
                            <div className="message-header">
                                <span className="sender-name">{inquiry.sender_name}</span>
                                <span className="message-date">
                                    {new Date(inquiry.created_at).toLocaleDateString('en-NG')}
                                </span>
                                {!inquiry.is_read && <span className="unread-badge">New</span>}
                            </div>
                            <div className="property-title">🏠 {inquiry.property_title}</div>
                            <div className="message-preview">
                                {inquiry.message.substring(0, 100)}{inquiry.message.length > 100 ? '...' : ''}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && selectedInquiry && (
                <div className="modal" style={{ display: 'flex' }} onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Message Details</h2>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row" style={{ marginBottom: '1rem' }}>
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>From:</div>
                                <div className="detail-value">{selectedInquiry.sender_name}</div>
                            </div>
                            <div className="detail-row" style={{ marginBottom: '1rem' }}>
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>Email:</div>
                                <div className="detail-value">{selectedInquiry.sender_email}</div>
                            </div>
                            <div className="detail-row" style={{ marginBottom: '1rem' }}>
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>Phone:</div>
                                <div className="detail-value">{selectedInquiry.sender_phone || 'Not provided'}</div>
                            </div>
                            <div className="detail-row" style={{ marginBottom: '1rem' }}>
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>Property:</div>
                                <div className="detail-value">{selectedInquiry.property_title} - {selectedInquiry.property_location}</div>
                            </div>
                            <div className="detail-row" style={{ marginBottom: '1rem' }}>
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>Message:</div>
                                <div className="full-message" style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
                                    {selectedInquiry.message}
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-label" style={{ fontWeight: 'bold' }}>Received:</div>
                                <div className="detail-value">{new Date(selectedInquiry.created_at).toLocaleString('en-NG')}</div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1rem' }}>
                            <button 
                                className="btn-reply" 
                                onClick={() => alert(`📧 Reply to: ${selectedInquiry.sender_email}\n\nEmail feature coming soon!`)}
                                style={{ background: '#1D4ED8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                            >
                                📧 Reply (Coming Soon)
                            </button>
                            <button 
                                className="btn-close" 
                                onClick={closeModal}
                                style={{ background: '#6b7280', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgentInbox;
