import React, { useState } from "react";
import { Button, Table, Modal, Form, Input, DatePicker, Select, Space, Tag, Upload, message, Typography, Descriptions } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";  
import styled from 'styled-components';


const { Dragger } = Upload;
const { Title } = Typography;

// Add custom styled component for form labels
const BoldFormLabel = styled.div`
  font-weight: bold;
`;

const Certifications = () => {
  const [form] = Form.useForm();
  const [certifications, setCertifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [fileList, setFileList] = useState([]);

  const issuingOrganizations = [
    "Cisco (CCNA, CCNP, CCIE)",
    "Microsoft (Microsoft Certified: Azure, DevOps, Security)",
    "Amazon Web Services (AWS) (AWS Certified Solutions Architect, Developer)",
    "Google Cloud (Google Cloud Professional Certifications)",
    "CompTIA (A+, Network+, Security+, CySA+)",
    "Oracle (Oracle Certified Professional, Java Certifications)",
    "Red Hat (RHCSA, RHCE, OpenShift)",
    "IBM (IBM Data Science, AI Engineering)",
    "SAP (SAP Certified Associate, Developer)",
    "Salesforce (Salesforce Certified Administrator, Developer)",
    "Palo Alto Networks (PCNSA, PCNSE)",
    "ISACA (CISA, CISM, CRISC – Cybersecurity & IT Governance)",
    "(ISC)² (CISSP, CCSP – Cybersecurity)",
    "EC-Council (CEH, CISSP – Ethical Hacking & Security)",
    "Linux Foundation (LFCS, LFCE, Kubernetes Certifications)",
    "PMI (PMP, CAPM – Project Management in Tech)"
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Issuing Organization",
      dataIndex: "issuingOrg",
      key: "issuingOrg",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => date || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = '';
        const statusLower = status.toLowerCase();

        if (statusLower === 'active') {
            color = 'green';
        } else if (statusLower === 'expired') {
            color = 'red';
        }
        return (
            <Tag color={color} key={status}>
                {status}
            </Tag>
        );
      },
    },
    {
      title: "Documents",
      dataIndex: "documents",
      key: "documents",
      render: (documents) => (
        <span>{documents && documents.length > 0 ? `${documents.length} file(s)` : "No files"}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={() => viewCert(record)}
          />
          <Button
            type="text"
            icon={<DownloadOutlined style={{ color: '#1890ff' }} />}
            onClick={() => downloadCert(record)}
            disabled={!record.documents || record.documents.length === 0}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#00D953' }}/>}
            onClick={() => editCert(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCert(record.id)}
          />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
    setFileList([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCert(null);
    setFileList([]);
  };

  const uploadProps = {
    multiple: true,
    onRemove: (file) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList,
  };

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      issueDate: values.issueDate.format("YYYY-MM-DD"),
      expiryDate: values.expiryDate?.format("YYYY-MM-DD") || "",
      documents: fileList.map(file => ({
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
        originalFile: file
      }))
    };

    if (editingCert) {
      // If editing, preserve existing documents if no new ones are uploaded
      const existingDocuments = editingCert.documents || [];
      const updatedDocuments = fileList.length > 0 ? formattedValues.documents : existingDocuments;
      
      setCertifications(
        certifications.map((cert) =>
          cert.id === editingCert.id 
            ? { ...formattedValues, documents: updatedDocuments, id: cert.id } 
            : cert
        )
      );
    } else {
      setCertifications([...certifications, { ...formattedValues, id: Date.now() }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const viewCert = (cert) => {
    setSelectedCert(cert);
    setViewModalVisible(true);
  };

  const downloadCert = (cert) => {
    if (cert.documents && cert.documents.length > 0) {
      cert.documents.forEach(document => {
        // Create a download link and trigger it
        const link = document.url;
        const a = document.createElement('a');
        a.href = link;
        a.download = document.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } else {
      message.warning('No documents available for download');
    }
  };

  const editCert = (cert) => {
    setEditingCert(cert);
    form.setFieldsValue({
      ...cert,
      issueDate: cert.issueDate ? moment(cert.issueDate, "YYYY-MM-DD") : null,
      expiryDate: cert.expiryDate ? moment(cert.expiryDate, "YYYY-MM-DD") : null,
    });
    
    // Set the fileList from existing documents if available
    if (cert.documents && cert.documents.length > 0) {
      setFileList([...cert.documents]);
    } else {
      setFileList([]);
    }
    
    setIsModalVisible(true);
  };

  const deleteCert = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const SaveButton = styled.button`
  background-color: #222232;
  color:white;
  padding:9px 16px 7px 16px;
  border-radius:5px;
  border: none;
  outline: none;
  &:hover {
    background-color: #1890ff;
    color:white;
  }
  `;

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Certification
      </Button>
      <Table columns={columns} dataSource={certifications} rowKey="id" />

      {/* Add/Edit Certification Modal */}
      <Modal
        title={editingCert ? "Edit Certification" : "Add Certification"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label={<BoldFormLabel>Name</BoldFormLabel>}
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="issuingOrg"
            label={<BoldFormLabel>Issuing Organization</BoldFormLabel>}
            rules={[{ required: true, message: "Please select the organization" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Select an organization"
            >
              {issuingOrganizations.map(org => (
                <Select.Option key={org} value={org}>
                  {org}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="issueDate"
            label={<BoldFormLabel>Issue Date</BoldFormLabel>}
            rules={[{ required: true, message: "Please select the issue date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item 
            name="expiryDate" 
            label={<BoldFormLabel>Expiry Date</BoldFormLabel>}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item 
            name="status" 
            label={<BoldFormLabel>Status</BoldFormLabel>} 
            initialValue="Active"
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Expired">Expired</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item label={<BoldFormLabel>Upload Documents</BoldFormLabel>}>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for single or multiple file uploads. Certificates, badges, or any relevant documents.
              </p>
            </Dragger>
          </Form.Item>
          
          <Form.Item>
            <SaveButton type="primary" htmlType="submit">
              Save
            </SaveButton>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Certification Modal - Enhanced Style */}
      <Modal
        title="Certification Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedCert && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label={<strong>Name</strong>}>{selectedCert.name}</Descriptions.Item>
              <Descriptions.Item label={<strong>Issuing Organization</strong>}>{selectedCert.issuingOrg}</Descriptions.Item>
              <Descriptions.Item label={<strong>Issue Date</strong>}>{selectedCert.issueDate}</Descriptions.Item>
              <Descriptions.Item label={<strong>Expiry Date</strong>}>{selectedCert.expiryDate || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label={<strong>Status</strong>}>
                <Tag 
                  color={selectedCert.status.toLowerCase() === 'active' ? 'green' : 'red'}
                >
                  {selectedCert.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: 24 }}>
              <Title level={5}>Documents</Title>
              {selectedCert.documents && selectedCert.documents.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {selectedCert.documents.map((doc, index) => (
                    <div key={index} style={{ marginBottom: 16, border: '1px solid #f0f0f0', padding: 16, borderRadius: 4, width: '48%' }}>
                      <p>{doc.name}</p>
                      <Space>
                        <Button 
                          type="primary" 
                          size="small" 
                          icon={<DownloadOutlined />}
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = doc.url;
                            a.download = doc.name;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }}
                        >
                          Download
                        </Button>
                        {doc.url && (
                          <Button 
                            type="default" 
                            size="small"
                            onClick={() => window.open(doc.url, '_blank')}
                          >
                            Preview
                          </Button>
                        )}
                      </Space>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No documents attached</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Certifications;