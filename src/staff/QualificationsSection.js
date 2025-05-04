import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import QualificationsTable from './QualificationsTable';
import AcademicForm from './AcademicForm';
import ProfessionalForm from './ProfessionalForm';
import './QualificationsSection.css';

const QualificationsSection = ({ type }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  
  const handleAdd = () => {
    setCurrentRecord(null);
    setShowModal(true);
  };
  
  const handleEdit = (record) => {
    console.log('Editing record:', record);
    setCurrentRecord(record);
    setShowModal(true);
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
      
      setShowModal(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Error saving qualification:', error);
    }
  };
  
  const handleCancel = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };
  
  const modalTitle = `${currentRecord ? 'Edit' : 'Add'} ${type === 'academic' ? 'Academic' : 'Professional'} Qualification`;
  
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
      
      <QualificationsTable
        data={data}
        type={type}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* Modal for qualification forms */}
      <Modal
        title={modalTitle}
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose={true}
      >
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
      </Modal>
    </div>
  );
};

export default QualificationsSection;