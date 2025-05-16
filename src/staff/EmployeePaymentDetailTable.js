import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Tag } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './EmployeePaymentDetail.css';

const { Title } = Typography;

const EmployeePaymentDetailTable = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        form.setFieldsValue({
            additional_info: record.additional_info || ''
        });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                // Here you would typically update the record in your backend
                const updatedRecord = {
                    ...selectedRecord,
                    additional_info: values.additional_info
                };
                console.log('Updated record:', updatedRecord);
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
            key: 'employee_id',
            render: (id) => <Tag color="blue">{id}</Tag>,
        },
        {
            title: 'Payment Mode',
            dataIndex: 'payment_mode',
            key: 'payment_mode',
            render: (mode) => <Tag color={mode === 'Bank Transfer' ? 'geekblue' : 'green'}>{mode}</Tag>,
        },
        {
            title: 'Bank Name',
            dataIndex: 'bank_name',
            key: 'bank_name',
            render: (text, record) => 
                record.payment_mode === 'Bank Transfer' ? text : 'N/A',
        },
        {
            title: 'Account Number',
            dataIndex: 'account_number',
            key: 'account_number',
            render: (text, record) => 
                record.payment_mode === 'Bank Transfer' ? text : 'N/A',
        },
        {
            title: 'Mobile Money Provider',
            dataIndex: 'mobile_money_provider',
            key: 'mobile_money_provider',
            render: (text, record) => 
                record.payment_mode === 'Mobile Money' ? text : 'N/A',
        },
        {
            title: 'Wallet Number',
            dataIndex: 'wallet_number',
            key: 'wallet_number',
            render: (text, record) => 
                record.payment_mode === 'Mobile Money' ? text : 'N/A',
        },
        {
            title: 'Verified',
            dataIndex: 'is_verified',
            key: 'is_verified',
            render: (value) => (
                <Tag color={value ? 'green' : 'volcano'}>
                    {value ? 'Verified' : 'Not Verified'}
                </Tag>
            ),
        },
        {
            title: 'Additional Info',
            key: 'additional_info',
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<InfoCircleOutlined />}
                    onClick={() => handleViewDetails(record)}
                    className="info-button"
                />
            ),
        },
    ];

    return (
        <div className="payment-detail-container">
            <Title level={4} className="table-title">Employee Payment Details</Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="employee_id" 
                className="custom-table"
                bordered
            />

            <Modal
                title={`Payment Details - Employee ID: ${selectedRecord?.employee_id}`}
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
                okText="Save"
                cancelText="Cancel"
                width={700}
            >
                <div className="payment-details-content">
                    <div className="basic-info">
                        <p><strong>Payment Mode:</strong> {selectedRecord?.payment_mode}</p>
                        {selectedRecord?.payment_mode === 'Bank Transfer' ? (
                            <>
                                <p><strong>Bank Name:</strong> {selectedRecord?.bank_name}</p>
                                <p><strong>Account Number:</strong> {selectedRecord?.account_number}</p>
                            </>
                        ) : (
                            <>
                                <p><strong>Mobile Money Provider:</strong> {selectedRecord?.mobile_money_provider}</p>
                                <p><strong>Wallet Number:</strong> {selectedRecord?.wallet_number}</p>
                            </>
                        )}
                        <p><strong>Verification Status:</strong> 
                            <Tag color={selectedRecord?.is_verified ? 'green' : 'volcano'} style={{ marginLeft: 8 }}>
                                {selectedRecord?.is_verified ? 'Verified' : 'Not Verified'}
                            </Tag>
                        </p>
                    </div>

                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="additional_info"
                            label="Additional Information"
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Enter any additional payment details..."
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default EmployeePaymentDetailTable;