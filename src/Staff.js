// src/components/Staff.js
import React, { useState } from 'react';
import SearchBar from './staff/SearchBar';
import ExpandableSection from './staff/ExpandableSection';
import BioDataSection from './staff/BioDataSection';
import QualificationsSection from './staff/QualificationsSection';
import EmploymentDetailsSection from './staff/EmploymentDetailsSection';
import EmploymentDetailsForm from './staff/EmploymentDetailsForm';
import EmergencyContactTable from './staff/EmergencyContactTable';
import EmergencyContactForm from './staff/EmergencyContactForm';
import EmploymentHistoryTable from './staff/EmploymentHistoryTable';
import EmploymentHistoryForm from './staff/EmploymentHistoryForm';
import EmployeePaymentDetailTable from './staff/EmployeePaymentDetailTable';
import EmployeePaymentDetailForm from './staff/EmployeePaymentDetailForm';
import NextOfKinTable from './staff/NextOfKinTable';
import NextOfKinForm from './staff/NextOfKinForm';
import SalaryPaymentTable from './staff/SalaryPaymentTable';
import SalaryPaymentForm from './staff/SalaryPaymentForm';
import MainHeader from './staff/MainHeader';
import SecondaryHeader from './staff/SecondaryHeader';

import './Staff.css';

const Staff = () => {
  // Employment Details state
  const [employmentDetails, setEmploymentDetails] = useState({
    branch: 'Main Branch',
    department: 'Engineering',
    rank: 'Senior Developer'
  });
  const [showEmploymentDetailsForm, setShowEmploymentDetailsForm] = useState(false);

  // Emergency Contacts state
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: '1',
      employee: { id: 'EMP001' },
      name: 'John Doe',
      relation: 'Father',
      phone: '+1234567890',
      address: '123 Main St, City',
      details: 'Available 24/7'
    },
  ]);

  // Employment History state
  const [employmentHistory, setEmploymentHistory] = useState([
    {
      id: '1',
      job_title: 'Software Developer',
      company: 'Tech Corp',
      start_date: '2020-01-15',
      end_date: '2022-12-31',
      details: 'Developed web applications using React',
      documents_path: [
        {
          uid: '-1',
          name: 'employment_contract.pdf',
          status: 'done',
          url: '/documents/employment/1'
        }
      ]
    },
    {
      id: '2',
      job_title: 'Senior Developer',
      company: 'Innovate Tech',
      start_date: '2023-01-01',
      end_date: '',
      details: 'Led frontend development team',
      documents_path: [
        {
          uid: '-2',
          name: 'employment_agreement.pdf',
          status: 'done',
          url: '/documents/employment/2'
        }
      ]
    }
  ]);

  // Payment Details state
  const [paymentDetails, setPaymentDetails] = useState([
    {
      employee_id: 'EMP001',
      payment_mode: 'Bank Transfer',
      bank_name: 'Ghana Commercial Bank',
      account_number: '1234567890',
      mobile_money_provider: '',
      wallet_number: '',
      is_verified: true,
      additional_info: 'Primary account for salary payments'
    }
  ]);

  // Form visibility states
  const [showContactForm, setShowContactForm] = useState(false);
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [currentHistory, setCurrentHistory] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);

  // Employment Details handlers
  const handleEditEmploymentDetails = () => {
    setShowEmploymentDetailsForm(true);
  };

  const handleSaveEmploymentDetails = (values) => {
    setEmploymentDetails(values);
    setShowEmploymentDetailsForm(false);
  };

  const handleCancelEmploymentDetailsForm = () => {
    setShowEmploymentDetailsForm(false);
  };

  // Emergency Contact handlers
  const handleEditContact = (record) => {
    setCurrentContact(record);
    setShowContactForm(true);
  };

  const handleAddContact = () => {
    setCurrentContact({
      id: null,
      employee: { id: 'EMP001' },
      name: '',
      relation: '',
      phone: '',
      address: '',
      details: ''
    });
    setShowContactForm(true);
  };

  const handleDeleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const handleSaveContact = (values) => {
    if (currentContact.id) {
      setEmergencyContacts(emergencyContacts.map(contact => 
        contact.id === currentContact.id ? { ...contact, ...values } : contact
      ));
    } else {
      const newContact = {
        ...values,
        id: `${Date.now()}`,
        employee: { id: 'EMP001' }
      };
      setEmergencyContacts([...emergencyContacts, newContact]);
    }
    setShowContactForm(false);
  };

  // Mock file upload function - replace with actual API call
  const uploadFile = async (file) => {
    // Simulate file upload delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`/documents/employment/${Date.now()}_${file.name}`);
      }, 1000);
    });
  };

  // Employment History handlers
  const handleEditHistory = (record) => {
    setCurrentHistory({
      ...record,
      // Convert stored path to file object format for the form
      documents_path: record.documents_path || []
    });
    setShowHistoryForm(true);
  };

  const handleAddHistory = () => {
    setCurrentHistory({
      id: null,
      job_title: '',
      company: '',
      start_date: '',
      end_date: '',
      details: '',
      documents_path: []
    });
    setShowHistoryForm(true);
  };

  const handleDeleteHistory = (id) => {
    setEmploymentHistory(employmentHistory.filter(job => job.id !== id));
  };

  // Update this function in your Staff.js component
const handleSaveHistory = async (values) => {
  let documentPaths = [];
  
  // Handle file uploads if new files were added
  if (values.documents_path && values.documents_path.length > 0) {
    for (const file of values.documents_path) {
      if (file.originFileObj) {
        // New file upload
        const documentPath = await uploadFile(file.originFileObj);
        documentPaths.push({ 
          uid: `-${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.originFileObj.name,
          status: 'done',
          url: documentPath
        });
      } else if (file.url) {
        // Existing file
        documentPaths.push(file);
      }
    }
  }

  const newEntry = {
    ...values,
    documents_path: documentPaths
  };

  if (currentHistory?.id) {
    setEmploymentHistory(employmentHistory.map(job => 
      job.id === currentHistory.id ? newEntry : job
    ));
  } else {
    setEmploymentHistory([
      ...employmentHistory,
      {
        ...newEntry,
        id: Date.now().toString()
      }
    ]);
  }
  
  setShowHistoryForm(false);
};

  // Payment Details handlers
  const handleEditPayment = (record) => {
    setCurrentPayment(record);
    setShowPaymentForm(true);
  };

  const handleAddPayment = () => {
    setCurrentPayment({
      employee_id: '',
      payment_mode: '',
      bank_name: '',
      account_number: '',
      mobile_money_provider: '',
      wallet_number: '',
      is_verified: false,
      additional_info: ''
    });
    setShowPaymentForm(true);
  };

  const handleDeletePayment = (employeeId) => {
    setPaymentDetails(paymentDetails.filter(payment => payment.employee_id !== employeeId));
  };

  const handleSavePayment = (values) => {
    if (currentPayment?.employee_id) {
      setPaymentDetails(paymentDetails.map(payment => 
        payment.employee_id === currentPayment.employee_id ? values : payment
      ));
    } else {
      setPaymentDetails([...paymentDetails, values]);
    }
    setShowPaymentForm(false);
  };

  // Cancel handlers
  const handleCancelForm = () => {
    setShowContactForm(false);
    setCurrentContact(null);
  };

  const handleCancelHistoryForm = () => {
    setShowHistoryForm(false);
    setCurrentHistory(null);
  };

  const handleCancelPaymentForm = () => {
    setShowPaymentForm(false);
    setCurrentPayment(null);
  };

   // Next of Kin state
   const [nextOfKins, setNextOfKins] = useState([
    {
      id: '1',
      employee: { id: 'EMP001' },
      name: 'Mary Doe',
      relation: 'Spouse',
      phone: '+1234567891',
      address: '123 Main St, City',
      additionalDetails: 'Primary contact in emergencies'
    }
  ]);

  const [showNextOfKinForm, setShowNextOfKinForm] = useState(false);
  const [currentNextOfKin, setCurrentNextOfKin] = useState(null);

  // Next of Kin handlers
  const handleEditNextOfKin = (record) => {
    setCurrentNextOfKin(record);
    setShowNextOfKinForm(true);
  };

  const handleAddNextOfKin = () => {
    setCurrentNextOfKin({
      id: null,
      employee: { id: 'EMP001' },
      name: '',
      relation: '',
      phone: '',
      address: '',
      additionalDetails: ''
    });
    setShowNextOfKinForm(true);
  };

  const handleDeleteNextOfKin = (id) => {
    setNextOfKins(nextOfKins.filter(kin => kin.id !== id));
  };

  const handleSaveNextOfKin = (values) => {
    if (currentNextOfKin?.id) {
      setNextOfKins(nextOfKins.map(kin => 
        kin.id === currentNextOfKin.id ? { ...kin, ...values } : kin
      ));
    } else {
      setNextOfKins([
        ...nextOfKins,
        {
          ...values,
          id: Date.now().toString(),
        }
      ]);
    }
    setShowNextOfKinForm(false);
  };

  const handleCancelNextOfKinForm = () => {
    setShowNextOfKinForm(false);
    setCurrentNextOfKin(null);
  };

  // Salary Payment state
  const [salaryPayments, setSalaryPayments] = useState([
    {
      id: '1',
      employee_id: 'EMP001',
      rank: { id: '1', name: 'Senior Developer' },
      amount: 5000.00,
      currency: 'USD',
      payment_date: '2023-06-30',
      payment_method: 'Bank Transfer',
      transaction_id: 'TX123456',
      status: 'Success',
      approver: { id: 'ADM001', name: 'Admin User' }
    }
  ]);

  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(null);

  // Sample data for dropdowns
  const [ranks] = useState([
    { id: '1', name: 'Junior Developer' },
    { id: '2', name: 'Mid Developer' },
    { id: '3', name: 'Senior Developer' }
  ]);

  const [users] = useState([
    { id: 'ADM001', name: 'Admin User' },
    { id: 'HR001', name: 'HR Manager' }
  ]);

  // Salary Payment handlers
  const handleEditSalary = (record) => {
    setCurrentSalary(record);
    setShowSalaryForm(true);
  };

  const handleAddSalary = () => {
    setCurrentSalary({
      id: null,
      employee_id: '',
      rank_id: '',
      amount: '',
      currency: 'USD',
      payment_date: '',
      payment_method: '',
      transaction_id: '',
      status: 'Pending',
      approved_by: ''
    });
    setShowSalaryForm(true);
  };

  const handleDeleteSalary = (id) => {
    setSalaryPayments(salaryPayments.filter(payment => payment.id !== id));
  };

  const handleSaveSalary = (values) => {
    // Find rank and approver objects
    const rank = ranks.find(r => r.id === values.rank_id);
    const approver = users.find(u => u.id === values.approved_by);

    if (currentSalary?.id) {
      setSalaryPayments(salaryPayments.map(payment => 
        payment.id === currentSalary.id ? { 
          ...payment, 
          ...values,
          rank,
          approver
        } : payment
      ));
    } else {
      setSalaryPayments([
        ...salaryPayments,
        {
          ...values,
          id: Date.now().toString(),
          rank,
          approver
        }
      ]);
    }
    setShowSalaryForm(false);
  };

  const handleCancelSalaryForm = () => {
    setShowSalaryForm(false);
    setCurrentSalary(null);
  };

   // Add qualification form states
   const [showAcademicForm, setShowAcademicForm] = useState(false);
   const [showProfessionalForm, setShowProfessionalForm] = useState(false);
   const [qualifications, setQualifications] = useState({
     academic: [],
     professional: []
   });
 
   // Qualification handlers
   const handleAddAcademic = () => setShowAcademicForm(true);
   const handleAddProfessional = () => setShowProfessionalForm(true);
 
   const handleSaveQualification = (type, data) => {
     setQualifications(prev => ({
       ...prev,
       [type]: [...prev[type], data]
     }));
     type === 'academic' ? setShowAcademicForm(false) : setShowProfessionalForm(false);
   };

  return (
    <div className="dashboard-container">
      <MainHeader />
      <SecondaryHeader />
      
      <main className="dashboard-content">
         {/* Combined Search and Bio-Data Section */}
         <div className="combined-section">
          <div className="search-section">
            <SearchBar />
          </div>
          <div className="bio-section">
            <ExpandableSection title="Bio-Data" icon="user">
              <BioDataSection />
            </ExpandableSection>
          </div>
        </div>

        <div className="block-section">
          <ExpandableSection title="Emergency Contacts" icon="phone">
            {!showContactForm ? (
              <>
                <div className="action-buttons">
                  <button 
                    className="add-button" 
                    onClick={handleAddContact}
                  >
                    Add Emergency Contact
                  </button>
                </div>
                <EmergencyContactTable 
                  data={emergencyContacts}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              </>
            ) : (
              <EmergencyContactForm
                initialValues={currentContact}
                onFinish={handleSaveContact}
                onCancel={handleCancelForm}
              />
            )}
          </ExpandableSection>
        </div>

        <div className="block-section">
          <ExpandableSection title="Qualifications" icon="graduation-cap">
            <div className="qualifications-vertical">
              <div className="qualification-section-full">
                <ExpandableSection title="Academic" icon="book">
                  <QualificationsSection type="academic" />
                </ExpandableSection>
              </div>
              <div className="qualification-section-full">
                <ExpandableSection title="Professional" icon="briefcase">
                  <QualificationsSection type="professional" />
                </ExpandableSection>
              </div>
            </div>
          </ExpandableSection>
        </div>

        <div className="block-section">
          <ExpandableSection title="Employment Details" icon="building">
            {!showEmploymentDetailsForm ? (
              <>
               
                <EmploymentDetailsSection 
                  employmentDetails={employmentDetails}
                  onEdit={handleEditEmploymentDetails}
                />
              </>
            ) : (
              <EmploymentDetailsForm
                initialValues={employmentDetails}
                onFinish={handleSaveEmploymentDetails}
                onCancel={handleCancelEmploymentDetailsForm}
              />
            )}
          </ExpandableSection>
        </div>

        <div className="block-section">
          <ExpandableSection title="Employment History" icon="history">
            {!showHistoryForm ? (
              <>
                <div className="action-buttons">
                  <button 
                    className="add-button" 
                    onClick={handleAddHistory}
                  >
                    Add Employment Record
                  </button>
                </div>
                <EmploymentHistoryTable 
                  data={employmentHistory}
                  onEdit={handleEditHistory}
                  onDelete={handleDeleteHistory}
                />
              </>
            ) : (
              <EmploymentHistoryForm
                initialValues={currentHistory}
                onFinish={handleSaveHistory}
                onCancel={() => {
                  setShowHistoryForm(false);
                  setCurrentHistory(null);
                }}
              />
            )}
          </ExpandableSection>
        </div>

        {/* Payment Details Section */}
        <div className="block-section">
          <ExpandableSection title="Payment Details" icon="credit">
            {!showPaymentForm ? (
              <>
                <div className="action-buttons">
                  <button 
                    className="add-button" 
                    onClick={handleAddPayment}
                  >
                    Add Payment Details
                  </button>
                </div>
                <EmployeePaymentDetailTable 
                  data={paymentDetails}
                  onEdit={handleEditPayment}
                  onDelete={handleDeletePayment}
                />
              </>
            ) : (
              <EmployeePaymentDetailForm
                initialValues={currentPayment}
                onFinish={handleSavePayment}
                onCancel={handleCancelPaymentForm}
              />
            )}
          </ExpandableSection>
        </div>

        {/* Next of Kin Section */}
        <div className="block-section">
          <ExpandableSection title="Next of Kin" icon="team">
            {!showNextOfKinForm ? (
              <>
                <div className="action-buttons">
                  <button 
                    className="add-button" 
                    onClick={handleAddNextOfKin}
                  >
                    Add Next of Kin
                  </button>
                </div>
                <NextOfKinTable 
                  data={nextOfKins}
                  onEdit={handleEditNextOfKin}
                  onDelete={handleDeleteNextOfKin}
                />
              </>
            ) : (
              <NextOfKinForm
                initialValues={currentNextOfKin}
                onFinish={handleSaveNextOfKin}
                onCancel={handleCancelNextOfKinForm}
              />
            )}
          </ExpandableSection>
        </div>

         {/* Salary Payment Section */}
         <div className="block-section">
          <ExpandableSection title="Salary Payments" icon="money">
            {!showSalaryForm ? (
              <>
                <div className="action-buttons">
                  <button 
                    className="add-button" 
                    onClick={handleAddSalary}
                  >
                    Add Salary Payment
                  </button>
                </div>
                <SalaryPaymentTable 
                  data={salaryPayments}
                  onEdit={handleEditSalary}
                  onDelete={handleDeleteSalary}
                />
              </>
            ) : (
              <SalaryPaymentForm
                initialValues={currentSalary}
                onFinish={handleSaveSalary}
                onCancel={handleCancelSalaryForm}
                ranks={ranks}
                users={users}
              />
            )}
          </ExpandableSection>
        </div>
      </main>
    </div>
  );
};

export default Staff;