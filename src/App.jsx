import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import TenantSignIn from './pages/TenantSignIn';
import AgentSignUp from './pages/AgentSignUp';
import TenantSignUp from './pages/TenantSignUp';
import AgentDashboard from './pages/AgentDashboard';
import TenantDashboard from './pages/TenantDashboard';
import PropertyDetail from './pages/PropertyDetail';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import AgentInbox from './pages/AgentInbox';
import ContactAgent from './pages/ContactAgent';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/agent-signin" element={<SignIn />} />
                <Route path="/tenant-signin" element={<TenantSignIn />} />
                <Route path="/agent-signup" element={<AgentSignUp />} />
                <Route path="/tenant-signup" element={<TenantSignUp />} />
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/edit-property/:id" element={<EditProperty />} />
                <Route path="/agent-inbox" element={<AgentInbox />} />
                <Route path="/contact-agent/:id" element={<ContactAgent />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
