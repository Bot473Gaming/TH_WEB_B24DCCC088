import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { DANH_SACH_GIANG_VIEN, ETrangThai, TRANG_THAI_LABEL } from '@/services/QuanLyKhoaHoc/constant';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tag, Tooltip } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import FormKhoaHoc from './components/Form';

const QuanLyKhoaHocPage = () => {
	const { deleteModel, handleEdit } = useModel('QuanLyKhoaHocModel');
	const { danhSach: danhSachGiangVien, getAllModel: getAllGiangVien } = useModel('QuanLyGiangVienModel');

	React.useEffect(() => {
		getAllGiangVien();
	}, []);

	const columns: IColumn<KhoaHoc.IRecord>[] = [
		{
			title: 'Tên khóa học',
			dataIndex: 'tenKhoaHoc',
			width: 200,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Giảng viên',
			dataIndex: 'idGiangVien',
			width: 150,
			filterType: 'select',
			filterData: danhSachGiangVien.map((item) => ({
				value: item._id,
				label: item.hoTen,
			})),
			render: (id: string) => {
				const giangVien = danhSachGiangVien.find((item) => item._id === id);
				return giangVien ? giangVien.hoTen : 'Chưa xác định';
			},
		},
		{
			title: 'Số lượng học viên',
			dataIndex: 'soLuongHocVien',
			width: 150,
			align: 'center',
			sortable: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 150,
			align: 'center',
			filterType: 'select',
			filterData: Object.entries(TRANG_THAI_LABEL).map(([value, label]) => ({
				value,
				label,
			})),
			render: (trangThai: ETrangThai) => {
				let color = 'default';
				switch (trangThai) {
					case ETrangThai.DANG_MO:
						color = 'blue';
						break;
					case ETrangThai.DA_KET_THUC:
						color = 'red';
						break;
					case ETrangThai.TAM_DUNG:
						color = 'orange';
						break;
					default:
						color = 'default';
				}
				return <Tag color={color}>{TRANG_THAI_LABEL[trangThai] || 'Chưa xác định'}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (record: KhoaHoc.IRecord) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id)}
							title='Bạn có chắc chắn muốn xóa khóa học này?'
							placement='topLeft'
							disabled={record.soLuongHocVien > 0}
						>
							<Button danger type='link' icon={<DeleteOutlined />} disabled={record.soLuongHocVien > 0} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			modelName='QuanLyKhoaHocModel'
			title='Quản lý khóa học'
			Form={FormKhoaHoc}
			columns={columns}
			addStt={true}
		/>
	);
};

export default QuanLyKhoaHocPage;
