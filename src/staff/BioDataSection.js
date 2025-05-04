import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BioDataSection.css';
import request from "./request";

const TITLE_OPTIONS = ['Prof.', 'PhD', 'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Other'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const MARITAL_STATUS_OPTIONS = ['Single', 'Married', 'Divorced', 'Widowed', 'Other'];

const BioDataSection = ({ staffId }) => {
  const [bioData, setBioData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    title: '',
    gender: '',
    date_of_birth: '',
    marital_status: '',
    email: '',
    contact_info: {}
  });
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBioData = async () => {
      if (!staffId) {
        setLoading(false);
        setError("No staff ID provided");
        return;
      }

      try {
        setLoading(true);
        const response = await request.get(`/staff/${staffId}`);
        
        if (response && response.data && response.data.main && response.data.main.Employee) {
          const employee = response.data.main.Employee;
          setBioData(employee);

          if (employee.date_of_birth) {
            setDob(new Date(employee.date_of_birth));
          }
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Error fetching bio data: ", err);
        setError("Failed to fetch bio data. " + (err.message || ''));
      } finally {
        setLoading(false);
      }
    };

    fetchBioData();
  }, [staffId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBioData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setDob(date);
    setBioData(prev => ({ ...prev, date_of_birth: date ? date.toISOString().split('T')[0] : '' }));
  };

  const handleSave = async () => {
    try {
      await request.put(`/staff/${staffId}`, bioData);
      alert("Bio data saved successfully!");
    } catch (err) {
      console.error("Error saving bio data: ", err);
      alert("Failed to save bio data.");
    }
  };

  const handleProposeUpdate = () => {
    console.log("Proposing bio-data update:", bioData);
    alert("Update proposal submitted!");
  };

  if (loading) return <p>Loading bio-data...</p>;
  if (error) return <p className="error">{error}</p>;
  
  // If neither loading nor error, but no staffId is provided, show message
  if (!staffId) return <p>Please select a staff member to view their bio data.</p>;

  return (
    <div className="bio-data-section">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={bioData.first_name || ''}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>

      <div className="form-group">
        <label>Middle Name</label>
        <input
          type="text"
          name="middle_name"
          value={bioData.middle_name || ''}
          onChange={handleChange}
          placeholder="Middle Name"
        />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={bioData.last_name || ''}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>

      <div className="form-group">
        <label>Title</label>
        <select name="title" value={bioData.title || ''} onChange={handleChange}>
          <option value="">Select Title</option>
          {TITLE_OPTIONS.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={bioData.gender || ''} onChange={handleChange}>
          <option value="">Select Gender</option>
          {GENDER_OPTIONS.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <DatePicker 
          selected={dob} 
          onChange={handleDateChange} 
          dateFormat="yyyy-MM-dd" 
          placeholderText="Select date" 
        />
      </div>

      <div className="form-group">
        <label>Marital Status</label>
        <select name="marital_status" value={bioData.marital_status || ''} onChange={handleChange}>
          <option value="">Select Marital Status</option>
          {MARITAL_STATUS_OPTIONS.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={bioData.email || ''}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>

      <div className="form-group">
        <label>Contact Information</label>
        <textarea
          name="contact_info"
          value={typeof bioData.contact_info === 'object' ? JSON.stringify(bioData.contact_info, null, 2) : bioData.contact_info || ''}
          onChange={handleChange}
          placeholder="Contact Information"
        />
      </div>

      <div className="section-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleProposeUpdate}>Propose Update</button>
      </div>
    </div>
  );
};

export default BioDataSection;