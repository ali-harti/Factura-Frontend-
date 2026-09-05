import React from 'react';
import { useAuth } from '../context/AuthContext';

const UploadPage = () => {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Factura Dashboard</h1>
        <button className="btn btn-outline" onClick={logout}>Sign Out</button>
      </header>
      
      <div className="problem-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <h2 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Drag and drop invoice</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>PDF, PNG, JPG (max 20MB)</p>
        <button className="btn btn-primary">Browse Files</button>
      </div>
    </div>
  );
};

export default UploadPage;
