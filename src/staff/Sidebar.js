import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaUserPlus, 
  FaCalendarAlt,
  FaBriefcase,
  FaFileAlt,
  FaCog,
  FaChartLine,
  FaMoneyBillAlt,
  FaTasks,
  FaChevronDown,
  FaChevronRight,
  FaUserFriends,     
  FaUserEdit,        
  FaUsersCog,                  
} from 'react-icons/fa';
import './Sidebar.css';

export default function HRSidebar() {
  const [employeesOpen, setEmployeesOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title"></h2>
      <nav>
        <ul className="sidebar-nav">
          <li>
            <Link to="/hr-dashboard" className="sidebar-link">
              <FaTachometerAlt className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-dropdown">
            <div 
              className="sidebar-link dropdown-toggle" 
              onClick={() => setEmployeesOpen(!employeesOpen)}
            >
              <FaUsers className="sidebar-icon" />
              <span>Employees</span>
              <span className="dropdown-arrow">
                {employeesOpen ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {employeesOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/employees/all" className="dropdown-item">
                    <FaUserFriends className="dropdown-icon" />
                    <span>All Employees</span>
                  </Link>
                </li>
                <li>
                  <Link to="/employees/add" className="dropdown-item">
                    <FaUserEdit className="dropdown-icon" />
                    <span>Add New Employee</span>
                  </Link>
                </li>
                <li>
                  <Link to="/employees/departments" className="dropdown-item">
                    <FaUsersCog         className="dropdown-icon" />
                    <span>Departments</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/payroll" className="sidebar-link">
              <FaMoneyBillAlt className="sidebar-icon" />
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="sidebar-link">
              <FaCalendarAlt className="sidebar-icon" />
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link to="/recruitment" className="sidebar-link">
              <FaUserPlus className="sidebar-icon" />
              <span>Recruitment</span>
            </Link>
          </li>
          <li>
            <Link to="/performance" className="sidebar-link">
              <FaChartLine className="sidebar-icon" />
              <span>Performance</span>
            </Link>
          </li>
          <li>
            <Link to="/activities" className="sidebar-link">
              <FaTasks className="sidebar-icon" />
              <span>Activities</span>
            </Link>
          </li>
          <li>
            <Link to="/reports" className="sidebar-link">
              <FaFileAlt className="sidebar-icon" />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="sidebar-link">
              <FaCog className="sidebar-icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}