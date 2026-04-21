import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import FormHocVien from './components/Form';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';

const QuanLyHocVienPage = () => {
	const { deleteModel, handleEdit } = useModel('useQuanLyHocVienModel');
	const { danhSach: danhSachKhoaHoc, getAllModel: getAllKhoaHoc } = useModel('useQuanLyKhoaHocModel');

	React.useEffect(() => {
		getAllKhoaHoc();
	}, []);

	const columns: IColumn<KhoaHoc.IHocVien>[] = [
		{
			title: 'Mã HV',
			dataIndex: 'maHocVien',
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
			title: 'Khóa học',
			dataIndex: 'idKhoaHoc',
			width: 200,
			filterType: 'select',
			options: danhSachKhoaHoc.map((item) => ({
				value: item._id,
				label: item.tenKhoaHoc,
			})),
			render: (id: string) => {
				const khoaHoc = danhSachKhoaHoc.find((item) => item._id === id);
				return khoaHoc ? khoaHoc.tenKhoaHoc : 'Chưa xác định';
			},
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (record: KhoaHoc.IHocVien) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id)}
							title='Bạn có chắc chắn muốn xóa học viên này?'
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
			modelName='useQuanLyHocVienModel'
			title='Quản lý học viên'
			Form={FormHocVien}
			columns={columns}
			addStt={true}
		/>
	);
};

export default QuanLyHocVienPage;
