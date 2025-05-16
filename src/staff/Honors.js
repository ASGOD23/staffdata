import React, { useState } from "react";
import { Button, Table, Modal, Form, Input, DatePicker, Space, Select, Upload, Typography, Descriptions } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from 'styled-components';


const { Dragger } = Upload;
const { Title } = Typography;

const BoldFormLabel = styled.div`
  font-weight: bold;
`;


const Honors = () => {
  const [form] = Form.useForm();
  const [honors, setHonors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingHonor, setEditingHonor] = useState(null);
  const [viewingHonor, setViewingHonor] = useState(null);
  const [fileList, setFileList] = useState([]);

  const awardingOrganizations = [
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Awarding Organization",
      dataIndex: "awardingOrg",
      key: "awardingOrg",
    },
    {
      title: "Date Received",
      dataIndex: "dateReceived",
      key: "dateReceived",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
            onClick={() => viewHonor(record)}
          />
          <Button
            type="text"
            icon={<DownloadOutlined style={{ color: '#1890ff' }} />}
            onClick={() => downloadHonor(record)}
            disabled={!record.documents || record.documents.length === 0}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#00D953' }} />}
            onClick={() => editHonor(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteHonor(record.id)}
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
    setEditingHonor(null);
    setFileList([]);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingHonor(null);
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
      dateReceived: values.dateReceived.format("YYYY-MM-DD"),
      documents: fileList.map(file => ({
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
        originalFile: file
      }))
    };
    
    if (editingHonor) {
      // If editing, preserve existing documents if no new ones are uploaded
      const existingDocuments = editingHonor.documents || [];
      const updatedDocuments = fileList.length > 0 ? formattedValues.documents : existingDocuments;
      
      setHonors(
        honors.map((honor) =>
          honor.id === editingHonor.id 
            ? { ...formattedValues, documents: updatedDocuments, id: honor.id } 
            : honor
        )
      );
    } else {
      setHonors([...honors, { ...formattedValues, id: Date.now() }]);
    }
    
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const viewHonor = (honor) => {
    setViewingHonor(honor);
    setIsViewModalVisible(true);
  };

  const downloadHonor = (honor) => {
    // If there are multiple documents, download them all
    if (honor.documents && honor.documents.length > 0) {
      honor.documents.forEach(document => {
        // Create a download link and trigger it
        const link = document.url;
        const a = document.createElement('a');
        a.href = link;
        a.download = document.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };
  
  const editHonor = (honor) => {
    setEditingHonor(honor);
    form.setFieldsValue({
      ...honor,
      dateReceived: honor.dateReceived ? moment(honor.dateReceived, "YYYY-MM-DD") : null,
    });
    
    // Set the fileList from existing documents if available
    if (honor.documents && honor.documents.length > 0) {
      setFileList([...honor.documents]);
    } else {
      setFileList([]);
    }
    
    setIsModalVisible(true);
  };
  
  const deleteHonor = (id) => {
    setHonors(honors.filter((honor) => honor.id !== id));
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
        Add Honor
      </Button>
      <Table columns={columns} dataSource={honors} rowKey="id" />
      
      {/* Add/Edit Form Modal */}
      <Modal
        title={editingHonor ? "Edit Honor" : "Add Honor"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label={<BoldFormLabel>Title</BoldFormLabel>}
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="awardingOrg"
            label={<BoldFormLabel>Awarding Organization</BoldFormLabel>}
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
              {awardingOrganizations.map(org => (
                <Select.Option key={org} value={org}>
                  {org}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dateReceived"
            label={<BoldFormLabel>Date Received</BoldFormLabel>}
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label={<BoldFormLabel>Description </BoldFormLabel>}>
            <Input.TextArea rows={4} />
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
      
      {/* View Honor Details Modal */}
      <Modal
        title="Honor Details"
        open={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={[
          <Button key="close" onClick={handleViewCancel}>
            Close
          </Button>
        ]}
        width={800}
      >
        {viewingHonor && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">{viewingHonor.title}</Descriptions.Item>
              <Descriptions.Item label="Awarding Organization">{viewingHonor.awardingOrg}</Descriptions.Item>
              <Descriptions.Item label="Date Received">{viewingHonor.dateReceived}</Descriptions.Item>
              <Descriptions.Item label="Description">{viewingHonor.description}</Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: 24 }}>
              <Title level={5}>Documents</Title>
              {viewingHonor.documents && viewingHonor.documents.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {viewingHonor.documents.map((doc, index) => (
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

export default Honors;