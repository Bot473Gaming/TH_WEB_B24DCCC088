import type { IColumn } from '@/components/Table/typing';
import { AppointmentRecord } from '@/services/Appointment';
import { Badge, Button, Modal, Select, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormAppointment from './Form';

const AppointmentList = () => {
	const { data, getDataAppointment, setRow, isEdit, setVisible, setIsEdit, visible, updateStatus, deleteAppointment } =
		useModel('appointment');
	const { data: staffData, getDataStaff } = useModel('staff');
	const { data: serviceData, getDataService } = useModel('service');
	const { role } = useModel('role');

	const [statusFilter, setStatusFilter] = useState<string>('All');

	useEffect(() => {
		getDataAppointment();
		getDataStaff();
		getDataService();
	}, []);

	const filteredData = statusFilter === 'All' ? data : data.filter((item) => item.status === statusFilter);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Pending':
				return 'orange';
			case 'Confirmed':
				return 'blue';
			case 'Completed':
				return 'green';
			case 'Cancelled':
				return 'red';
			default:
				return 'default';
		}
	};

	const columns: IColumn<AppointmentRecord>[] = [
		{
			title: 'Ngày & Giờ',
			dataIndex: 'date',
			key: 'date',
			render: (_text, record) => `${record.date} ${record.time}`,
		},
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Nhân viên',
			dataIndex: 'staffId',
			key: 'staffId',
			render: (val) => staffData.find((s) => s.id === val)?.name || 'Không rõ',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'serviceId',
			key: 'serviceId',
			render: (val) => serviceData.find((s) => s.id === val)?.name || 'Không rõ',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (val) => <Tag color={getStatusColor(val)}>{val}</Tag>,
		},
		{
			title: 'Thao tác',
			width: 280,
			align: 'center',
			render: (record) => {
				return (
					<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
						<Select
							value={record.status}
							style={{ width: 110 }}
							onChange={(val) => updateStatus(record.id, val)}
							options={[
								{ value: 'Pending', label: 'Chờ duyệt' },
								{ value: 'Confirmed', label: 'Xác nhận' },
								{ value: 'Completed', label: 'Hoàn thành' },
								{ value: 'Cancelled', label: 'Hủy' },
							]}
						/>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Sửa
						</Button>
						<Button
							onClick={() => {
								deleteAppointment(record.id);
							}}
							type='primary'
							danger
						>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	const displayColumns = role === 'admin' ? columns : columns.filter(col => col.title !== 'Thao tác');

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
				<Button
					type='primary'
					onClick={() => {
						setVisible(true);
						setIsEdit(false);
						setRow(undefined);
					}}
				>
					Đặt lịch hẹn
				</Button>

				<Select
					value={statusFilter}
					style={{ width: 150 }}
					onChange={setStatusFilter}
					options={[
						{ value: 'All', label: 'Tất cả trạng thái' },
						{ value: 'Pending', label: 'Chờ duyệt' },
						{ value: 'Confirmed', label: 'Xác nhận' },
						{ value: 'Completed', label: 'Hoàn thành' },
						{ value: 'Cancelled', label: 'Hủy' },
					]}
				/>
			</div>

			<Table dataSource={filteredData} columns={displayColumns} rowKey='id' />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Sửa lịch hẹn' : 'Đặt lịch hẹn'}
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormAppointment />
			</Modal>
		</div>
	);
};

export default AppointmentList;
