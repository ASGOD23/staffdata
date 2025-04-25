import React from 'react';
import { Table, Button, Typography, Descriptions, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import './NextOfKin.css';

const { Title } = Typography;

const NextOfKinTable = ({ data, onEdit, onDelete }) => {
    const [selectedRecord, setSelectedRecord] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: ['employee', 'id'],
            key: 'employee_id',
            render: (id) => (
                <span>
                    <UserOutlined style={{ marginRight: 8 }} />
                    {id || 'N/A'}
                </span>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Relation',
            dataIndex: 'relation',
            key: 'relation',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) => address || 'Not specified',
        },
        {
            title: 'Details',
            key: 'details',
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<InfoCircleOutlined />}
                    onClick={() => handleViewDetails(record)}
                    className="details-button"
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className="actions">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                        className="edit-button"
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(record.id)}
                        className="delete-button"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="custom-table-container">
            <Title level={4} style={{ marginBottom: 16 }}>Next Of Kin</Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="id" 
                className="custom-table"
            />

            <Modal
                title="Next of Kin Details"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Close
                    </Button>
                ]}
                centered
            >
                {selectedRecord && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Employee ID">
                            {selectedRecord.employee?.id || 'N/A'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Full Name">
                            {selectedRecord.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Relationship">
                            {selectedRecord.relation}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number">
                            {selectedRecord.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {selectedRecord.address || 'Not specified'}
                        </Descriptions.Item>
                        <Descriptions.Item label="details">
                            {selectedRecord.additionalDetails || 'None provided'}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default NextOfKinTable;