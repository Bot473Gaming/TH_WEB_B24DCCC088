import {
	Button,
	Input,
	Modal,
	Popconfirm,
	Select,
	Table,
	Tag,
	Tooltip,
	Form,
} from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	DeleteOutlined,
	EditOutlined,
	HistoryOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { getAll as getAllCLB } from '@/services/CauLacBo/cauLacBo';
import type { ICauLacBo } from '@/services/CauLacBo/cauLacBo';
import type { IDangKyThanhVien } from '@/services/CauLacBo/dangKyThanhVien';
import FormDangKy from './Form';
import LichSuModal from './LichSuModal';

const { Search } = Input;
const { Option } = Select;

const trangThaiColor: Record<string, string> = {
	Pending: 'orange',
	Approved: 'green',
	Rejected: 'red',
};

const trangThaiLabel: Record<string, string> = {
	Pending: 'Chờ duyệt',
	Approved: 'Đã duyệt',
	Rejected: 'Từ chối',
};

const gioiTinhLabel: Record<string, string> = {
	Nam: 'Nam',
	Nu: 'Nữ',
	Khac: 'Khác',
};

const DangKyThanhVien = () => {
	const {
		data,
		getData,
		setRow,
		isEdit,
		setVisible,
		setIsEdit,
		visible,
		xoa,
		selectedRows,
		setSelectedRows,
		visibleLichSu,
		setVisibleLichSu,
		lichSuData,
		getLichSu,
		duyetDon,
		bulkDuyet,
		bulkTuChoi,
		visibleReject,
		setVisibleReject,
		rejectTargetIds,
		setRejectTargetIds,
	} = useModel('CauLacBo.dangKyThanhVien');

	const [clbList, setClbList] = useState<ICauLacBo[]>([]);
	const [filterCLB, setFilterCLB] = useState<string | undefined>();
	const [filterTrangThai, setFilterTrangThai] = useState<string | undefined>();
	const [searchText, setSearchText] = useState('');
	const [rejectForm] = Form.useForm();
	const [lichSuHoTen, setLichSuHoTen] = useState<string>('');

	useEffect(() => {
		getData();
		setClbList(getAllCLB());
	}, []);

	const filteredData = data.filter((item) => {
		const q = searchText.toLowerCase();
		const matchSearch =
			!searchText ||
			item.hoTen.toLowerCase().includes(q) ||
			item.email.toLowerCase().includes(q) ||
			item.sdt.includes(q);
		const matchCLB = !filterCLB || item.cauLacBoId === filterCLB;
		const matchTT = !filterTrangThai || item.trangThai === filterTrangThai;
		return matchSearch && matchCLB && matchTT;
	});

	const selectedRowKeys = selectedRows.map((r) => r.id);

	const rowSelection = {
		selectedRowKeys,
		onChange: (_: any, rows: IDangKyThanhVien[]) => setSelectedRows(rows),
	};

	const openRejectForIds = (ids: string[]) => {
		setRejectTargetIds(ids);
		rejectForm.resetFields();
		setVisibleReject(true);
	};

	const handleBulkReject = () => {
		rejectForm.validateFields().then((values) => {
			bulkTuChoi(rejectTargetIds, values.lyDo);
			setVisibleReject(false);
		});
	};

	const getCLBName = (id: string) => clbList.find((c) => c.id === id)?.tenCLB || id;

	const columns: any[] = [
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			key: 'hoTen',
			sorter: (a: any, b: any) => a.hoTen.localeCompare(b.hoTen),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'sdt',
			key: 'sdt',
			width: 120,
		},
		{
			title: 'Giới tính',
			dataIndex: 'gioiTinh',
			key: 'gioiTinh',
			width: 90,
			filters: [
				{ text: 'Nam', value: 'Nam' },
				{ text: 'Nữ', value: 'Nu' },
				{ text: 'Khác', value: 'Khac' },
			],
			onFilter: (value: any, record: any) => record.gioiTinh === value,
			render: (val: string) => gioiTinhLabel[val] || val,
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'cauLacBoId',
			key: 'cauLacBoId',
			sorter: (a: any, b: any) => getCLBName(a.cauLacBoId).localeCompare(getCLBName(b.cauLacBoId)),
			render: (id: string) => <Tag color="geekblue">{getCLBName(id)}</Tag>,
		},
		{
			title: 'Ngày đăng ký',
			dataIndex: 'ngayDangKy',
			key: 'ngayDangKy',
			width: 130,
			sorter: (a: any, b: any) => a.ngayDangKy.localeCompare(b.ngayDangKy),
			render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : ''),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 110,
			filters: [
				{ text: 'Chờ duyệt', value: 'Pending' },
				{ text: 'Đã duyệt', value: 'Approved' },
				{ text: 'Từ chối', value: 'Rejected' },
			],
			onFilter: (value: any, record: any) => record.trangThai === value,
			render: (val: string) => <Tag color={trangThaiColor[val]}>{trangThaiLabel[val]}</Tag>,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghiChu',
			key: 'ghiChu',
			width: 160,
			render: (val: string) => val || '–',
		},
		{
			title: 'Thao tác',
			key: 'action',
			fixed: 'right' as const,
			width: 188,
			align: 'center' as const,
			render: (record: IDangKyThanhVien) => (
				<div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
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
							title="Bạn có chắc chắn muốn xóa đơn đăng ký này?"
							onConfirm={() => xoa(record.id)}
							okText="Có"
							cancelText="Không"
						>
							<Button type="primary" danger icon={<DeleteOutlined />} size="small" />
						</Popconfirm>
					</Tooltip>
					<Tooltip title="Duyệt">
						<Popconfirm
							title="Xác nhận duyệt đơn đăng ký này?"
							onConfirm={() => duyetDon(record.id)}
							okText="Có"
							cancelText="Không"
							disabled={record.trangThai === 'Approved'}
						>
							<Button
								icon={<CheckCircleOutlined />}
								size="small"
								style={{ color: '#52c41a', borderColor: '#52c41a' }}
								disabled={record.trangThai === 'Approved'}
							/>
						</Popconfirm>
					</Tooltip>
					<Tooltip title="Từ chối">
						<Button
							icon={<CloseCircleOutlined />}
							size="small"
							danger
							disabled={record.trangThai === 'Rejected'}
							onClick={() => openRejectForIds([record.id])}
						/>
					</Tooltip>
					<Tooltip title="Lịch sử thao tác">
						<Button
							icon={<HistoryOutlined />}
							size="small"
							onClick={() => {
								getLichSu(record.id);
								setLichSuHoTen(record.hoTen);
								setVisibleLichSu(true);
							}}
						/>
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
				<span style={{ fontSize: 18, fontWeight: 600 }}>Quản lý đơn đăng ký thành viên</span>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => {
						setRow(undefined);
						setIsEdit(false);
						setVisible(true);
					}}
				>
					Thêm đơn đăng ký
				</Button>
			</div>

			{/* Filter bar */}
			<div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
				<Search
					placeholder="Tìm họ tên, email, SĐT..."
					allowClear
					style={{ width: 280 }}
					onSearch={(val) => setSearchText(val)}
					onChange={(e) => { if (!e.target.value) setSearchText(''); }}
				/>
				<Select
					allowClear
					placeholder="Lọc theo CLB"
					style={{ width: 220 }}
					value={filterCLB}
					onChange={(val) => setFilterCLB(val)}
				>
					{clbList.map((clb) => (
						<Option key={clb.id} value={clb.id}>{clb.tenCLB}</Option>
					))}
				</Select>
				<Select
					allowClear
					placeholder="Lọc theo trạng thái"
					style={{ width: 160 }}
					value={filterTrangThai}
					onChange={(val) => setFilterTrangThai(val)}
				>
					<Option value="Pending">Chờ duyệt</Option>
					<Option value="Approved">Đã duyệt</Option>
					<Option value="Rejected">Từ chối</Option>
				</Select>
			</div>

			{/* Bulk actions */}
			{selectedRows.length > 0 && (
				<div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
					<span>Đã chọn {selectedRows.length} đơn:</span>
					<Button
						type="primary"
						icon={<CheckCircleOutlined />}
						onClick={() => bulkDuyet(selectedRows.map((r) => r.id))}
					>
						Duyệt {selectedRows.length} đơn đã chọn
					</Button>
					<Button
						danger
						icon={<CloseCircleOutlined />}
						onClick={() => openRejectForIds(selectedRows.map((r) => r.id))}
					>
						Từ chối {selectedRows.length} đơn đã chọn
					</Button>
				</div>
			)}

			<Table
				rowSelection={rowSelection}
				dataSource={filteredData}
				columns={columns}
				rowKey="id"
				bordered
				scroll={{ x: 'max-content' }}
				pagination={{ pageSize: 10, showSizeChanger: true }}
			/>

			{/* Form thêm/sửa */}
			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Chỉnh sửa đơn đăng ký' : 'Thêm đơn đăng ký mới'}
				visible={visible}
				onCancel={() => setVisible(false)}
				width={700}
			>
				<FormDangKy />
			</Modal>

			{/* Modal từ chối (đơn lẻ hoặc bulk) */}
			<Modal
				title={`Từ chối ${rejectTargetIds.length > 1 ? `${rejectTargetIds.length} đơn đã chọn` : 'đơn đăng ký'}`}
				visible={visibleReject}
				onCancel={() => setVisibleReject(false)}
				onOk={handleBulkReject}
				okText="Xác nhận từ chối"
				okButtonProps={{ danger: true }}
				cancelText="Hủy"
				destroyOnClose
			>
				<Form form={rejectForm} layout="vertical">
					<Form.Item
						label="Lý do từ chối"
						name="lyDo"
						rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối!' }]}
					>
						<Input.TextArea rows={4} placeholder="Nhập lý do từ chối..." />
					</Form.Item>
				</Form>
			</Modal>

			{/* Lịch sử thao tác */}
			<LichSuModal
				visible={visibleLichSu}
				onClose={() => setVisibleLichSu(false)}
				lichSuData={lichSuData}
				hoTen={lichSuHoTen}
			/>
		</div>
	);
};

export default DangKyThanhVien;
