import type { IColumn } from '@/components/Table/typing';
import { ServiceRecord } from '@/services/Service';
import { Button, Modal, Result, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormService from './Form';

const ServiceList = () => {
	const { data, getDataService, setRow, isEdit, setVisible, setIsEdit, visible, deleteService } = useModel('service');
	const { role } = useModel('role');

	useEffect(() => {
		getDataService();
	}, []);

	const columns: IColumn<ServiceRecord>[] = [
		{
			title: 'Tên dịch vụ',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giá (VNĐ)',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
		},
		{
			title: 'Thời gian (phút)',
			dataIndex: 'durationMinutes',
			key: 'durationMinutes',
			align: 'center',
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
								deleteService(record.id);
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
				Thêm Dịch vụ
			</Button>

			<Table dataSource={data} columns={columns} rowKey="id" />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Sửa Dịch vụ' : 'Thêm Dịch vụ'}
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormService />
			</Modal>
		</div>
	);
};

export default ServiceList;
