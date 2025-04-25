import React, { useState } from 'react';
import { Button } from 'antd';
import QualificationsTable from './QualificationsTable';
import AcademicForm from './AcademicForm';
import ProfessionalForm from './ProfessionalForm';
import './QualificationsSection.css';

const QualificationsSection = ({ type }) => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  
  const handleAdd = () => {
    setCurrentRecord(null);
    setShowForm(true);
  };
  
  const handleEdit = (record) => {
    console.log('Editing record:', record);
    setCurrentRecord(record);
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };
  
  const handleSave = async (qualification) => {
    try {
      console.log('Saving qualification:', qualification);
      
      if (currentRecord) {
        // Editing existing record
        setData(data.map(item => 
          item.id === currentRecord.id ? { ...qualification, id: currentRecord.id } : item
        ));
      } else {
        // Adding new record
        setData([...data, { ...qualification, id: Date.now().toString() }]);
      }
      
      setShowForm(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Error saving qualification:', error);
    }
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setCurrentRecord(null);
  };
  
  return (
    <div className="qualifications-section">
      <div className="action-buttons">
        <Button
          type="primary"
          onClick={handleAdd}
        >
          Add {type === 'academic' ? 'Academic' : 'Professional'} Qualification
        </Button>
      </div>
      
      {showForm ? (
        <div className="qualification-form">
          {type === 'academic' ? (
            <AcademicForm
              initialValues={currentRecord}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ProfessionalForm
              initialValues={currentRecord}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      ) : (
        <QualificationsTable
          data={data}
          type={type}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default QualificationsSection;