import { Button, Card, Col, Divider, Row, Select, Statistic, Table } from 'antd';
import { useMemo, useState } from 'react';
import {
	BarChartOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	DownloadOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getAll as getAllCLB } from '@/services/CauLacBo/cauLacBo';
import { getAll as getAllDangKy, getApprovedByCLB } from '@/services/CauLacBo/dangKyThanhVien';
import ColumnChart from '@/components/Chart/ColumnChart';

const { Option } = Select;

const ThongKe = () => {
	const [selectedClbId, setSelectedClbId] = useState<string | undefined>();

	const clbList = useMemo(() => getAllCLB(), []);
	const dangKyList = useMemo(() => getAllDangKy(), []);

	const tongSoCLB = clbList.length;
	const tongPending = dangKyList.filter((d) => d.trangThai === 'Pending').length;
	const tongApproved = dangKyList.filter((d) => d.trangThai === 'Approved').length;
	const tongRejected = dangKyList.filter((d) => d.trangThai === 'Rejected').length;

	// ColumnChart data
	const chartData = useMemo(() => {
		const xAxis: string[] = [];
		const pendingArr: number[] = [];
		const approvedArr: number[] = [];
		const rejectedArr: number[] = [];

		clbList.forEach((clb) => {
			const list = dangKyList.filter((d) => d.cauLacBoId === clb.id);
			xAxis.push(clb.tenCLB);
			pendingArr.push(list.filter((d) => d.trangThai === 'Pending').length);
			approvedArr.push(list.filter((d) => d.trangThai === 'Approved').length);
			rejectedArr.push(list.filter((d) => d.trangThai === 'Rejected').length);
		});

		return { xAxis, pendingArr, approvedArr, rejectedArr };
	}, [clbList, dangKyList]);

	// Export XLSX
	const handleExport = () => {
		const clbToExport = selectedClbId ? clbList.filter((c) => c.id === selectedClbId) : clbList;

		const wb = XLSX.utils.book_new();

		clbToExport.forEach((clb) => {
			const members = getApprovedByCLB(clb.id);
			const rows = members.map((m, idx) => ({
				STT: idx + 1,
				'Họ tên': m.hoTen,
				Email: m.email,
				'Số điện thoại': m.sdt,
				'Giới tính': m.gioiTinh === 'Nam' ? 'Nam' : m.gioiTinh === 'Nu' ? 'Nữ' : 'Khác',
				'Địa chỉ': m.diaChi,
				'Sở trường': m.soTruong,
				'Câu lạc bộ': clb.tenCLB,
				'Trạng thái': 'Đã duyệt',
			}));
			const ws = XLSX.utils.json_to_sheet(rows);
			const sheetName = clb.tenCLB.slice(0, 31); // Excel sheet max 31 chars
			XLSX.utils.book_append_sheet(wb, ws, sheetName);
		});

		XLSX.writeFile(wb, `danh-sach-thanh-vien-${new Date().toISOString().slice(0, 10)}.xlsx`);
	};

	const memberTableColumns: any[] = [
		{ title: 'STT', key: 'stt', width: 60, render: (_: any, __: any, i: number) => i + 1, align: 'center' as const },
		{ title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', sorter: (a: any, b: any) => a.hoTen.localeCompare(b.hoTen) },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'SĐT', dataIndex: 'sdt', key: 'sdt', width: 130 },
		{ title: 'Sở trường', dataIndex: 'soTruong', key: 'soTruong' },
	];

	const previewMembers = selectedClbId ? getApprovedByCLB(selectedClbId) : [];

	return (
		<div style={{ padding: 24, background: '#fff' }}>
			<div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
				Báo cáo &amp; Thống kê
			</div>

			{/* Statistic cards */}
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={12} sm={6}>
					<Card bordered>
						<Statistic
							title="Tổng số CLB"
							value={tongSoCLB}
							prefix={<TeamOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card bordered>
						<Statistic
							title="Đơn chờ duyệt"
							value={tongPending}
							prefix={<ClockCircleOutlined />}
							valueStyle={{ color: '#fa8c16' }}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card bordered>
						<Statistic
							title="Đơn đã duyệt"
							value={tongApproved}
							prefix={<CheckCircleOutlined />}
							valueStyle={{ color: '#52c41a' }}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card bordered>
						<Statistic
							title="Đơn từ chối"
							value={tongRejected}
							prefix={<CloseCircleOutlined />}
							valueStyle={{ color: '#ff4d4f' }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Column Chart */}
			<Divider orientation="left">
				<BarChartOutlined style={{ marginRight: 6 }} />
				Số đơn đăng ký theo từng CLB
			</Divider>
			{clbList.length > 0 ? (
				<ColumnChart
					title="Số đơn đăng ký theo trạng thái"
					xAxis={chartData.xAxis}
					yAxis={[chartData.pendingArr, chartData.approvedArr, chartData.rejectedArr]}
					yLabel={['Chờ duyệt', 'Đã duyệt', 'Từ chối']}
					colors={['#fa8c16', '#52c41a', '#ff4d4f']}
					formatY={(val: number) => String(val)}
					height={350}
				/>
			) : (
				<p style={{ color: '#999', textAlign: 'center' }}>Chưa có dữ liệu CLB</p>
			)}

			{/* Export XLSX */}
			<Divider orientation="left">
				<DownloadOutlined style={{ marginRight: 6 }} />
				Xuất danh sách thành viên (Approved) ra XLSX
			</Divider>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
				<Select
					allowClear
					placeholder="Chọn CLB để xuất (bỏ qua = xuất tất cả)"
					style={{ width: 320 }}
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
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					onClick={handleExport}
				>
					Xuất XLSX{selectedClbId ? '' : ' (tất cả CLB)'}
				</Button>
			</div>

			{selectedClbId && (
				<>
					<p style={{ marginBottom: 8, color: '#555' }}>
						Xem trước: <strong>{previewMembers.length}</strong> thành viên được duyệt
					</p>
					<Table
						dataSource={previewMembers}
						columns={memberTableColumns}
						rowKey="id"
						bordered
						size="small"
						pagination={{ pageSize: 8 }}
					/>
				</>
			)}
		</div>
	);
};

export default ThongKe;
