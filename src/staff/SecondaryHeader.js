import { useState } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import './SecondaryHeader.css';

export default function SecondaryHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      message: "New leave request from Jane Smith",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      message: "Performance review deadline tomorrow",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      message: "New job application for Developer position",
      time: "Yesterday",
      read: true
    }
  ];

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    console.log("Notification state:", !isNotificationsOpen); // Debug line
  };

  return (
    <header className="secondary-header">
      <div className="secondary-header__notification">
        <button 
          className="secondary-header__notification-btn"
          onClick={toggleNotifications}
        >
          <FaBell />
          <span className="secondary-header__badge">3</span>
        </button>
        
        {isNotificationsOpen && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button className="mark-all-read">Mark all as read</button>
            </div>
            <div className="notification-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
                </div>
              ))}
            </div>
            <div className="notification-footer">
              <a href="#">View all notifications</a>
            </div>
          </div>
        )}
      </div>
      
      <div className="secondary-header__profile">
        <img src="/profile.jpg" alt="Profile" className="secondary-header__image" />
        <div className="secondary-header__info">
          <span className="secondary-header__name">John Doe</span>
          <div
            className="secondary-header__title-container"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="secondary-header__title">HR Manager</span>
            <FaChevronDown className={`secondary-header__arrow ${isDropdownOpen ? 'open' : ''}`} />
            {isDropdownOpen && (
              <div className="secondary-header__dropdown">
                <a href="#">Profile</a>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}