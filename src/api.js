// API Configuration - Update this when backend is deployed to Railway
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('tetherng_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
    }
    
    return data;
}

// Auth APIs
export const agentSignup = (data) => apiCall('/auth/agent-signup', { method: 'POST', body: JSON.stringify(data) });
export const agentSignin = (data) => apiCall('/auth/agent-signin', { method: 'POST', body: JSON.stringify(data) });
export const tenantSignup = (data) => apiCall('/auth/tenant-signup', { method: 'POST', body: JSON.stringify(data) });
export const tenantSignin = (data) => apiCall('/auth/tenant-signin', { method: 'POST', body: JSON.stringify(data) });

// Property APIs
export const getProperties = () => apiCall('/properties');
export const getProperty = (id) => apiCall(`/properties/${id}`);
export const addProperty = (data) => apiCall('/properties', { method: 'POST', body: JSON.stringify(data) });
export const updateProperty = (id, data) => apiCall(`/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProperty = (id) => apiCall(`/properties/${id}`, { method: 'DELETE' });
export const getAgentProperties = (email) => apiCall(`/properties/agent/${email}`);

// Inquiry APIs
export const sendInquiry = (data) => apiCall('/inquiries', { method: 'POST', body: JSON.stringify(data) });
export const getAgentInquiries = (email) => apiCall(`/inquiries/agent/${email}`);
export const markInquiryRead = (id) => apiCall(`/inquiries/${id}/read`, { method: 'PUT' });

export default apiCall;
