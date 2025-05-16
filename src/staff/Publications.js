import React, { useState } from "react";
import { Button, Table, Modal, Form, Input, DatePicker, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from 'styled-components';

const BoldFormLabel = styled.div`
  font-weight: bold;
`;
const Publications = () => {
  const [form] = Form.useForm();
  const [publications, setPublications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPub, setEditingPub] = useState(null);
  
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Publication Date",
      dataIndex: "publicationDate",
      key: "publicationDate",
    },
    {
      title: "Link",
      key: "link",
      render: (_, record) => (
        record.link ? (
          <a href={record.link} target="_blank" rel="noreferrer">
            <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }}  />}
            onClick={() => viewPub(record)}
          />
          </a>
        ) : (
          "-"
        )
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#00D953' }}/>}
            onClick={() => editPub(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deletePub(record.id)}
          />
        </Space>
      ),
    },
  ];
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingPub(null);
  };
  
  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      publicationDate: values.publicationDate.format("YYYY-MM-DD"),
    };
    
    if (editingPub) {
      setPublications(
        publications.map((pub) =>
          pub.id === editingPub.id ? { ...formattedValues, id: pub.id } : pub
        )
      );
    } else {
      setPublications([...publications, { ...formattedValues, id: Date.now() }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const viewPub = (pub) => {
    // Implement view functionality
    console.log("Viewing publication:", pub);
    // Could open a detailed view modal or navigate to a details page
  };
  
  const editPub = (pub) => {
    setEditingPub(pub);
    form.setFieldsValue({
      ...pub,
      publicationDate: pub.publicationDate ? moment(pub.publicationDate, "YYYY-MM-DD") : null,
    });
    setIsModalVisible(true);
  };
  
  const deletePub = (id) => {
    setPublications(publications.filter((pub) => pub.id !== id));
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
        Add Publication
      </Button>
      <Table columns={columns} dataSource={publications} rowKey="id" />
      
      <Modal
        title={editingPub ? "Edit Publication" : "Add Publication"}
        open={isModalVisible} 
        onCancel={handleCancel}
        footer={null}
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
            name="publisher"
            label={<BoldFormLabel>Publisher</BoldFormLabel>}
            rules={[{ required: true, message: "Please enter the publisher" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="publicationDate"
            label={<BoldFormLabel>Publication Date</BoldFormLabel>}
            rules={[{ required: true, message: "Please select the date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="link" label={<BoldFormLabel>"Link (URL)"</BoldFormLabel>}>
            <Input type="url" />
          </Form.Item>
          <Form.Item>
            <SaveButton type="primary" htmlType="submit">
              Save
            </SaveButton>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Publications;