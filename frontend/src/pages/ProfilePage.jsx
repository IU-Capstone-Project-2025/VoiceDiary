import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from "../features/calendar/components/MoodCalendar";
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <button className="back-button" onClick={() => navigate('/homepage')}>
        ← Back
      </button>
      
      <div className="profile-content">
        <header className="profile-header">
          <h1>Profile</h1>
          <button 
            className="logout-button"
            onClick={() => navigate('/onboarding')}
          >
            Sign Out
          </button>
        </header>

        <div className="profile-card">
          <div className="user-info">
            <img
              src="https://ui-avatars.com/api/?name=Dzhamila&background=672f94&color=fff"
              alt="User"
              className="avatar"
            />
            <div className="user-details">
              <h2>Dzhamila</h2>
              <p className="activity-status">Active today</p>
            </div>
          </div>

          <div className="profile-fields">
            <div className="field">
              <label>Email</label>
              <p>dopoine@gmail.com</p>
            </div>
            
            <div className="field">
              <label>Password</label>
              <p>••••••••</p>
            </div>
            
            <button 
              className="edit-button"
              onClick={() => navigate('/profile/settings')}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="calendar-container">
          <h3>Your Mood Calendar</h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;