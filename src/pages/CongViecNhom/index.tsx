import type { IColumn } from '@/components/Table/typing';
import { getSessionUser } from '@/services/CongViecNhom';
import {
	CalendarOutlined,
	DeleteOutlined,
	EditOutlined,
	LogoutOutlined,
	PlusOutlined,
	SearchOutlined,
	TeamOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	Popconfirm,
	Row,
	Select,
	Space,
	Statistic,
	Table,
	Tabs,
	Tag,
	Typography,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import TaskCalendar from './components/TaskCalendar';
import TaskForm from './components/TaskForm';
import styles from './index.less';

const priLabel: Record<CongViecNhom.Task['mucDoUuTien'], { text: string; color: string }> = {
	low: { text: 'Thấp', color: 'default' },
	medium: { text: 'Trung bình', color: 'warning' },
	high: { text: 'Cao', color: 'error' },
};

const stLabel: Record<CongViecNhom.Task['trangThai'], { text: string; color: string }> = {
	pending: { text: 'Chưa làm', color: 'default' },
	progress: { text: 'Đang làm', color: 'processing' },
	done: { text: 'Đã xong', color: 'success' },
};

const CongViecNhomPage: React.FC = () => {
	const {
		tasks,
		currentUser,
		refreshTasks,
		logout,
		addTask,
		updateTask,
		removeTask,
	} = useModel('congviecnhom');
	const [form] = Form.useForm();
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<CongViecNhom.Task | null>(null);
	const [kw, setKw] = useState('');
	const [fltStatus, setFltStatus] = useState<string | undefined>();
	const [fltAssignee, setFltAssignee] = useState<string | undefined>();

	useEffect(() => {
		refreshTasks();
	}, [refreshTasks]);

	useEffect(() => {
		if (!getSessionUser()) {
			history.replace('/cong-viec-nhom/dang-nhap');
		}
	}, [currentUser]);

	const assigneeSuggestions = useMemo(() => {
		const s = new Set<string>();
		tasks.forEach((t) => {
			if (t.nguoiDuocGiao?.trim()) s.add(t.nguoiDuocGiao.trim());
		});
		return Array.from(s).sort();
	}, [tasks]);

	const filteredAll = useMemo(() => {
		let list = [...tasks];
		if (kw.trim()) {
			const q = kw.trim().toLowerCase();
			list = list.filter((t) => t.tenCongViec.toLowerCase().includes(q));
		}
		if (fltStatus) {
			list = list.filter((t) => t.trangThai === fltStatus);
		}
		if (fltAssignee) {
			list = list.filter((t) => t.nguoiDuocGiao === fltAssignee);
		}
		return list;
	}, [tasks, kw, fltStatus, fltAssignee]);

	const filteredMine = useMemo(() => {
		if (!currentUser) return [];
		let list = tasks.filter((t) => t.nguoiDuocGiao === currentUser);
		if (kw.trim()) {
			const q = kw.trim().toLowerCase();
			list = list.filter((t) => t.tenCongViec.toLowerCase().includes(q));
		}
		if (fltStatus) {
			list = list.filter((t) => t.trangThai === fltStatus);
		}
		return list;
	}, [tasks, currentUser, kw, fltStatus]);

	const totalAll = tasks.length;
	const doneAll = useMemo(() => tasks.filter((t) => t.trangThai === 'done').length, [tasks]);

	const openCreate = () => {
		setEditing(null);
		form.resetFields();
		setModalOpen(true);
	};

	const openEdit = (row: CongViecNhom.Task) => {
		setEditing(row);
		setModalOpen(true);
	};

	const submitModal = async () => {
		const v = await form.validateFields();
		const thoiHan = (v.thoiHan as moment.Moment)?.startOf('day').toISOString();
		const payload = {
			tenCongViec: v.tenCongViec as string,
			nguoiDuocGiao: String(v.nguoiDuocGiao).trim(),
			mucDoUuTien: v.mucDoUuTien as CongViecNhom.Task['mucDoUuTien'],
			trangThai: v.trangThai as CongViecNhom.Task['trangThai'],
			thoiHan,
		};
		if (editing) {
			updateTask(editing.id, payload);
		} else {
			addTask(payload);
		}
		setModalOpen(false);
		setEditing(null);
	};

	const columns: IColumn<CongViecNhom.Task>[] = [
		{
			title: 'Tên công việc',
			dataIndex: 'tenCongViec',
			key: 'tenCongViec',
			width: 220,
			ellipsis: true,
		},
		{
			title: 'Người được giao',
			dataIndex: 'nguoiDuocGiao',
			key: 'nguoiDuocGiao',
			width: 160,
		},
		{
			title: 'Ưu tiên',
			dataIndex: 'mucDoUuTien',
			key: 'mucDoUuTien',
			width: 120,
			render: (_, r) => {
				const p = priLabel[r.mucDoUuTien];
				return <Tag color={p.color}>{p.text}</Tag>;
			},
		},
		{
			title: 'Thời hạn',
			dataIndex: 'thoiHan',
			key: 'thoiHan',
			width: 120,
			render: (d: string) => (d ? moment(d).format('DD/MM/YYYY') : ''),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 130,
			render: (_, r) => {
				const s = stLabel[r.trangThai];
				return <Tag color={s.color}>{s.text}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 160,
			align: 'center',
			render: (_, r) => (
				<Space>
					<Button type='link' icon={<EditOutlined />} onClick={() => openEdit(r)}>
						Sửa
					</Button>
					<Popconfirm title='Xóa công việc này?' onConfirm={() => removeTask(r.id)}>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	const filterBar = (
		<Row gutter={[12, 12]} className={styles.filters}>
			<Col xs={24} sm={12} md={8}>
				<Input
					allowClear
					prefix={<SearchOutlined />}
					placeholder='Tìm theo tên công việc'
					value={kw}
					onChange={(e) => setKw(e.target.value)}
				/>
			</Col>
			<Col xs={24} sm={12} md={8}>
				<Select
					allowClear
					placeholder='Lọc trạng thái'
					style={{ width: '100%' }}
					value={fltStatus}
					onChange={(v) => setFltStatus(v)}
					options={[
						{ value: 'pending', label: 'Chưa làm' },
						{ value: 'progress', label: 'Đang làm' },
						{ value: 'done', label: 'Đã xong' },
					]}
				/>
			</Col>
			<Col xs={24} sm={12} md={8}>
				<Select
					allowClear
					showSearch
					placeholder='Lọc người được giao'
					style={{ width: '100%' }}
					value={fltAssignee}
					onChange={(v) => setFltAssignee(v)}
					options={assigneeSuggestions.map((a) => ({ value: a, label: a }))}
				/>
			</Col>
		</Row>
	);

	return (
		<div className={styles.page}>
			<Card className={styles.headerCard}>
				<Row justify='space-between' align='middle' gutter={[16, 16]}>
					<Col>
						<Space align='center'>
							<TeamOutlined className={styles.headIcon} />
							<div>
								<Typography.Title level={4} style={{ margin: 0 }}>
									Quản lý công việc nhóm
								</Typography.Title>
								<Typography.Text type='secondary'>
									Người dùng hiện tại: <strong>{currentUser}</strong>
								</Typography.Text>
							</div>
						</Space>
					</Col>
					<Col>
						<Button
							icon={<LogoutOutlined />}
							onClick={() => {
								logout();
								history.push('/cong-viec-nhom/dang-nhap');
							}}
						>
							Đăng xuất
						</Button>
					</Col>
				</Row>
			</Card>

			<Row gutter={16} className={styles.statsRow}>
				<Col xs={24} sm={12}>
					<Card bordered>
						<Statistic title='Tổng số công việc' value={totalAll} prefix={<UnorderedListOutlined />} />
					</Card>
				</Col>
				<Col xs={24} sm={12}>
					<Card bordered>
						<Statistic title='Đã hoàn thành' value={doneAll} prefix={<UserOutlined />} />
					</Card>
				</Col>
			</Row>

			<Card>
				<Space direction='vertical' style={{ width: '100%' }} size='large'>
					<Button type='primary' icon={<PlusOutlined />} onClick={openCreate}>
						Thêm công việc
					</Button>

					<Tabs defaultActiveKey='list'>
						<Tabs.TabPane
							tab={
								<span>
									<UnorderedListOutlined /> Danh sách
								</span>
							}
							key='list'
						>
							{filterBar}
							<Table
								rowKey='id'
								columns={columns}
								dataSource={filteredAll}
								pagination={{ pageSize: 10 }}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane
							tab={
								<span>
									<UserOutlined /> Công việc của tôi
								</span>
							}
							key='mine'
						>
							<Row gutter={[12, 12]} className={styles.filters}>
								<Col xs={24} sm={12} md={8}>
									<Input
										allowClear
										prefix={<SearchOutlined />}
										placeholder='Tìm theo tên công việc'
										value={kw}
										onChange={(e) => setKw(e.target.value)}
									/>
								</Col>
								<Col xs={24} sm={12} md={8}>
									<Select
										allowClear
										placeholder='Lọc trạng thái'
										style={{ width: '100%' }}
										value={fltStatus}
										onChange={(v) => setFltStatus(v)}
										options={[
											{ value: 'pending', label: 'Chưa làm' },
											{ value: 'progress', label: 'Đang làm' },
											{ value: 'done', label: 'Đã xong' },
										]}
									/>
								</Col>
							</Row>
							<Table
								rowKey='id'
								columns={columns}
								dataSource={filteredMine}
								pagination={{ pageSize: 10 }}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane
							tab={
								<span>
									<CalendarOutlined /> Lịch theo hạn
								</span>
							}
							key='cal'
						>
							<TaskCalendar tasks={tasks} />
						</Tabs.TabPane>
					</Tabs>
				</Space>
			</Card>

			<Modal
				title={editing ? 'Sửa công việc' : 'Thêm công việc'}
				visible={modalOpen}
				onOk={submitModal}
				onCancel={() => {
					setModalOpen(false);
					setEditing(null);
				}}
				width={520}
				destroyOnClose
			>
				<TaskForm form={form} editing={editing} assigneeOptions={assigneeSuggestions} />
			</Modal>
		</div>
	);
};

export default CongViecNhomPage;
