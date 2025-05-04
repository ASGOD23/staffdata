// src/components/staff/EmploymentDetailsSection.js
import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './EmploymentDetailsSection.css';

const EmploymentDetailsSection = ({ employmentDetails, onEdit }) => {
  return (
    <div className="employment-details-section">
      <div className="section-header">
        <h3>Employment Details</h3>
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={onEdit}
          className="edit-button"
        >
          Edit Details
        </Button>
      </div>
      
      {employmentDetails?.branch && (
        <div className="form-group">
          <label>Branch</label>
          <div className="detail-value">{employmentDetails.branch}</div>
        </div>
      )}
      
      <div className="form-group">
        <label>Department</label>
        <div className="detail-value">{employmentDetails.department}</div>
      </div>
      
      <div className="form-group">
        <label>Rank</label>
        <div className="detail-value">{employmentDetails.rank}</div>
      </div>
    </div>
  );
};

export default EmploymentDetailsSection;