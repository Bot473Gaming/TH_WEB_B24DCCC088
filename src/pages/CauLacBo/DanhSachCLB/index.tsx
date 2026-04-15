import {
	Avatar,
	Button,
	Input,
	Modal,
	Popconfirm,
	Table,
	Tag,
	Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { getApprovedByCLB } from '@/services/CauLacBo/dangKyThanhVien';
import FormCauLacBo from './Form';

const { Search } = Input;

const DanhSachCLB = () => {
	const {
		data,
		getData,
		setRow,
		isEdit,
		setVisible,
		setIsEdit,
		visible,
		xoa,
		visibleMembers,
		setVisibleMembers,
		selectedClbId,
		setSelectedClbId,
	} = useModel('CauLacBo.cauLacBo');

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const filteredData = data.filter((item) => {
		const q = searchText.toLowerCase();
		return (
			item.tenCLB.toLowerCase().includes(q) ||
			item.chuNhiem.toLowerCase().includes(q)
		);
	});

	const membersOfCLB = selectedClbId ? getApprovedByCLB(selectedClbId) : [];
	const selectedCLB = data.find((c) => c.id === selectedClbId);

	const memberColumns: any[] = [
		{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', sorter: (a: any, b: any) => a.hoTen.localeCompare(b.hoTen) },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'SĐT', dataIndex: 'sdt', key: 'sdt', width: 130 },
		{ title: 'Giới tính', dataIndex: 'gioiTinh', key: 'gioiTinh', width: 100 },
	];

	const columns: any[] = [
		{
			title: 'Ảnh',
			dataIndex: 'anhDaiDien',
			key: 'anhDaiDien',
			width: 70,
			align: 'center' as const,
			render: (url: string) =>
				url ? (
					<Avatar src={url} size={40} />
				) : (
					<Avatar icon={<UserOutlined />} size={40} />
				),
		},
		{
			title: 'Tên câu lạc bộ',
			dataIndex: 'tenCLB',
			key: 'tenCLB',
			sorter: (a: any, b: any) => a.tenCLB.localeCompare(b.tenCLB),
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'ngayThanhLap',
			key: 'ngayThanhLap',
			width: 150,
			sorter: (a: any, b: any) => a.ngayThanhLap.localeCompare(b.ngayThanhLap),
			render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : ''),
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chuNhiem',
			key: 'chuNhiem',
			sorter: (a: any, b: any) => a.chuNhiem.localeCompare(b.chuNhiem),
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			key: 'moTa',
			width: 220,
			render: (html: string) => (
				<div
					style={{
						maxHeight: 60,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						maxWidth: 200,
					}}
					dangerouslySetInnerHTML={{ __html: html || '' }}
				/>
			),
		},
		{
			title: 'Hoạt động',
			dataIndex: 'hoatDong',
			key: 'hoatDong',
			width: 110,
			align: 'center' as const,
			filters: [
				{ text: 'Có', value: true },
				{ text: 'Không', value: false },
			],
			onFilter: (value: any, record: any) => record.hoatDong === value,
			render: (val: boolean) =>
				val ? (
					<Tag color="green">Có</Tag>
				) : (
					<Tag color="default">Không</Tag>
				),
		},
		{
			title: 'Thao tác',
			key: 'action',
			fixed: 'right' as const,
			width: 150,
			align: 'center' as const,
			render: (record: any) => (
				<div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
					<Tooltip title="Xem danh sách thành viên">
						<Button
							icon={<TeamOutlined />}
							size="small"
							onClick={() => {
								setSelectedClbId(record.id);
								setVisibleMembers(true);
							}}
						/>
					</Tooltip>
					<Tooltip title="Chỉnh sửa">
						<Button
							type="primary"
							icon={<EditOutlined />}
							size="small"
							onClick={() => {
								setRow(record);
								setIsEdit(true);
								setVisible(true);
							}}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<Popconfirm
							title="Bạn có chắc chắn muốn xóa câu lạc bộ này?"
							onConfirm={() => xoa(record.id)}
							okText="Có"
							cancelText="Không"
						>
							<Button type="primary" danger icon={<DeleteOutlined />} size="small" />
						</Popconfirm>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div style={{ padding: 24, background: '#fff' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 16,
				}}
			>
				<span style={{ fontSize: 18, fontWeight: 600 }}>Danh sách câu lạc bộ</span>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						setRow(undefined);
						setIsEdit(false);
						setVisible(true);
					}}
				>
					Thêm CLB
				</Button>
			</div>

			<div style={{ marginBottom: 16 }}>
				<Search
					placeholder="Tìm theo tên CLB hoặc chủ nhiệm..."
					allowClear
					style={{ width: 360 }}
					onSearch={(val) => setSearchText(val)}
					onChange={(e) => {
						if (!e.target.value) setSearchText('');
					}}
				/>
			</div>

			<Table
				dataSource={filteredData}
				columns={columns}
				rowKey="id"
				bordered
				scroll={{ x: 'max-content' }}
				pagination={{ pageSize: 10, showSizeChanger: true }}
			/>

			{/* Form thêm/sửa CLB */}
			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Chỉnh sửa câu lạc bộ' : 'Thêm câu lạc bộ mới'}
				visible={visible}
				onCancel={() => setVisible(false)}
				width={720}
			>
				<FormCauLacBo />
			</Modal>

			{/* Modal xem thành viên */}
			<Modal
				title={`Danh sách thành viên – ${selectedCLB?.tenCLB || ''}`}
				visible={visibleMembers}
				onCancel={() => setVisibleMembers(false)}
				footer={null}
				width={720}
				destroyOnClose
			>
				<Table
					dataSource={membersOfCLB}
					columns={memberColumns}
					rowKey="id"
					bordered
					pagination={{ pageSize: 8 }}
					size="small"
				/>
			</Modal>
		</div>
	);
};

export default DanhSachCLB;
