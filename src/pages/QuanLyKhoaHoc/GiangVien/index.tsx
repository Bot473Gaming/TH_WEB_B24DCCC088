import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import FormGiangVien from './components/Form';
import { IGiangVien } from '@/models/useQuanLyGiangVienModel';

const QuanLyGiangVienPage = () => {
	const { deleteModel, handleEdit } = useModel('useQuanLyGiangVienModel');

	const columns: IColumn<IGiangVien>[] = [
		{
			title: 'Mã GV',
			dataIndex: 'maGiangVien',
			width: 120,
			filterType: 'string',
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			width: 200,
			filterType: 'string',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 200,
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'soDienThoai',
			width: 150,
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (record: IGiangVien) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id)}
							title='Bạn có chắc chắn muốn xóa giảng viên này?'
							placement='topLeft'
						>
							<Button
								danger
								type='link'
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			modelName='useQuanLyGiangVienModel'
			title='Quản lý giảng viên'
			Form={FormGiangVien}
			columns={columns}
			addStt={true}
		/>
	);
};

export default QuanLyGiangVienPage;
