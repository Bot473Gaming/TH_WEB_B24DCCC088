import { Button, Modal, Select, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { SwapOutlined } from '@ant-design/icons';
import { getAll as getAllCLB } from '@/services/CauLacBo/cauLacBo';
import { getApprovedByCLB } from '@/services/CauLacBo/dangKyThanhVien';
import type { ICauLacBo } from '@/services/CauLacBo/cauLacBo';
import type { IDangKyThanhVien } from '@/services/CauLacBo/dangKyThanhVien';

const { Option } = Select;

const ThanhVienCLB = () => {
	const { doiCLBThanhVien } = useModel('CauLacBo.dangKyThanhVien');

	const [clbList, setClbList] = useState<ICauLacBo[]>([]);
	const [selectedClbId, setSelectedClbId] = useState<string | undefined>();
	const [members, setMembers] = useState<IDangKyThanhVien[]>([]);
	const [selectedRows, setSelectedRows] = useState<IDangKyThanhVien[]>([]);
	const [visibleDoiCLB, setVisibleDoiCLB] = useState(false);
	const [targetClbId, setTargetClbId] = useState<string | undefined>();

	useEffect(() => {
		const list = getAllCLB();
		setClbList(list);
	}, []);

	useEffect(() => {
		if (selectedClbId) {
			setMembers(getApprovedByCLB(selectedClbId));
			setSelectedRows([]);
		} else {
			setMembers([]);
		}
	}, [selectedClbId]);

	const refreshMembers = () => {
		if (selectedClbId) {
			setMembers(getApprovedByCLB(selectedClbId));
		}
	};

	const handleDoiCLB = () => {
		if (!targetClbId) return;
		doiCLBThanhVien(
			selectedRows.map((r) => r.id),
			targetClbId,
		);
		setVisibleDoiCLB(false);
		setSelectedRows([]);
		setTargetClbId(undefined);
		refreshMembers();
	};

	const rowSelection = {
		selectedRowKeys: selectedRows.map((r) => r.id),
		onChange: (_: any, rows: IDangKyThanhVien[]) => setSelectedRows(rows),
	};

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
			width: 130,
		},
		{
			title: 'Giới tính',
			dataIndex: 'gioiTinh',
			key: 'gioiTinh',
			width: 90,
			render: (val: string) => ({ Nam: 'Nam', Nu: 'Nữ', Khac: 'Khác' }[val] || val),
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'diaChi',
			key: 'diaChi',
		},
		{
			title: 'Sở trường',
			dataIndex: 'soTruong',
			key: 'soTruong',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 110,
			render: () => <Tag color="green">Đã duyệt</Tag>,
		},
	];

	const availableClbs = clbList.filter((c) => c.id !== selectedClbId);

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
				<span style={{ fontSize: 18, fontWeight: 600 }}>Quản lý thành viên câu lạc bộ</span>
			</div>

			<div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
				<span style={{ fontWeight: 500 }}>Chọn câu lạc bộ:</span>
				<Select
					allowClear
					placeholder="Chọn câu lạc bộ để xem thành viên"
					style={{ width: 300 }}
					value={selectedClbId}
					onChange={(val) => setSelectedClbId(val)}
					showSearch
					optionFilterProp="children"
				>
					{clbList.map((clb) => (
						<Option key={clb.id} value={clb.id}>
							{clb.tenCLB}
						</Option>
					))}
				</Select>
				<span style={{ color: '#888' }}>
					{selectedClbId ? `${members.length} thành viên` : ''}
				</span>
			</div>

			{selectedRows.length > 0 && (
				<div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
					<span>Đã chọn {selectedRows.length} thành viên:</span>
					<Tooltip title="Chuyển sang CLB khác">
						<Button
							icon={<SwapOutlined />}
							type="primary"
							onClick={() => {
								setTargetClbId(undefined);
								setVisibleDoiCLB(true);
							}}
						>
							Chuyển {selectedRows.length} thành viên sang CLB khác
						</Button>
					</Tooltip>
				</div>
			)}

			<Table
				rowSelection={rowSelection}
				dataSource={members}
				columns={columns}
				rowKey="id"
				bordered
				scroll={{ x: 'max-content' }}
				pagination={{ pageSize: 10, showSizeChanger: true }}
				locale={{ emptyText: selectedClbId ? 'Câu lạc bộ này chưa có thành viên được duyệt' : 'Vui lòng chọn câu lạc bộ' }}
			/>

			<Modal
				title={`Chuyển ${selectedRows.length} thành viên sang CLB khác`}
				visible={visibleDoiCLB}
				onCancel={() => setVisibleDoiCLB(false)}
				onOk={handleDoiCLB}
				okText="Xác nhận chuyển"
				cancelText="Hủy"
				okButtonProps={{ disabled: !targetClbId }}
				destroyOnClose
			>
				<div style={{ marginBottom: 12 }}>
					<p>Đang chuyển <strong>{selectedRows.length}</strong> thành viên từ CLB <strong>{clbList.find((c) => c.id === selectedClbId)?.tenCLB || ''}</strong> sang:</p>
				</div>
				<Select
					placeholder="Chọn câu lạc bộ đích"
					style={{ width: '100%' }}
					value={targetClbId}
					onChange={(val) => setTargetClbId(val)}
					showSearch
					optionFilterProp="children"
				>
					{availableClbs.map((clb) => (
						<Option key={clb.id} value={clb.id}>
							{clb.tenCLB}
						</Option>
					))}
				</Select>
			</Modal>
		</div>
	);
};

export default ThanhVienCLB;
