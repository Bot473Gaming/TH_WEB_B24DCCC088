import type { IColumn } from '@/components/Table/typing';
import { StaffRecord } from '@/services/Staff';
import { Button, Modal, Result, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormStaff from './Form';

const Staff = () => {
	const { data, getDataStaff, setRow, isEdit, setVisible, setIsEdit, visible, deleteStaff } = useModel('staff');
	const { role } = useModel('role');

	useEffect(() => {
		getDataStaff();
	}, []);

	const columns: IColumn<StaffRecord>[] = [
		{
			title: 'Tên nhân viên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Vai trò',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Giới hạn ngày',
			dataIndex: 'dailyLimit',
			key: 'dailyLimit',
		},
		{
			title: 'Ngày làm việc',
			dataIndex: 'workingDays',
			key: 'workingDays',
			width: 250,
			render: (days: string[]) => days?.join(', ') || '',
		},
		{
			title: 'Giờ làm việc',
			key: 'time',
			width: 150,
			render: (_: any, record: StaffRecord) => `${record.startTime || ''} - ${record.endTime || ''}`,
		},
		{
			title: 'Thao tác',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
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
							style={{ marginLeft: 10 }}
							onClick={() => {
								deleteStaff(record.id);
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

	if (role === 'user') {
		return (
			<Result
				status="403"
				title="403"
				subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
			/>
		);
	}

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
					setRow(undefined);
				}}
				style={{ marginBottom: 16 }}
			>
				Thêm Nhân viên
			</Button>

			<Table dataSource={data} columns={columns} rowKey="id" />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Sửa Nhân viên' : 'Thêm Nhân viên'}
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormStaff />
			</Modal>
		</div>
	);
};

export default Staff;
