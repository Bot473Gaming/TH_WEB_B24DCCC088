import type { IColumn } from '@/components/Table/typing';
import { ReviewRecord } from '@/services/Review';
import { Button, Modal, Rate, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormReview from './Form';
import FormReply from './ReplyForm';

const ReviewList = () => {
	const { data, getDataReview, setRow, setVisible, visible, replyVisible, setReplyVisible, deleteReview } =
		useModel('review');
	const { data: staffData, getDataStaff } = useModel('staff');
	const { data: appointmentData, getDataAppointment } = useModel('appointment');
	const { role } = useModel('role');

	useEffect(() => {
		getDataReview();
		getDataStaff();
		getDataAppointment();
	}, []);

	const columns: IColumn<ReviewRecord>[] = [
		{
			title: 'Ngày/Giờ',
			dataIndex: 'appointmentId',
			key: 'date',
			render: (val) => {
				const app = appointmentData.find((a) => a.id === val);
				return app ? `${app.date} ${app.time}` : 'Không rõ';
			},
			width: 0,
		},
		{
			title: 'Khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
			width: 0,
		},
		{
			title: 'Nhân viên',
			dataIndex: 'staffId',
			key: 'staffId',
			render: (val) => staffData.find((s) => s.id === val)?.name || 'Không rõ',
			width: 0,
		},
		{
			title: 'Đánh giá',
			dataIndex: 'rating',
			key: 'rating',
			render: (val) => <Rate disabled defaultValue={val} />,
			width: 0,
		},
		{
			title: 'Bình luận',
			dataIndex: 'comment',
			key: 'comment',
			width: 0,
		},
		{
			title: 'Nhân viên phản hồi',
			dataIndex: 'staffReply',
			key: 'staffReply',
			render: (val) => (val ? <i>{val}</i> : <span style={{ color: '#ccc' }}>Chưa phản hồi</span>),
			width: 0,
		},
		{
			title: 'Thao tác',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
						<Button
							onClick={() => {
								setReplyVisible(true);
								setRow(record);
							}}
							disabled={!!record.staffReply}
						>
							Phản hồi
						</Button>
						<Button
							onClick={() => {
								deleteReview(record.id);
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

	const displayColumns = role === 'admin' ? columns : columns.filter(col => col.title !== 'Thao tác');

	return (
		<div>
			{role === 'user' && (
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setRow(undefined);
				}}
				style={{ marginBottom: 16 }}
			>
				Gửi đánh giá (Khách hàng)
			</Button>
			)}

			<Table dataSource={data} columns={displayColumns} rowKey='id' />

			<Modal
				destroyOnClose
				footer={false}
				title='Gửi đánh giá'
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormReview />
			</Modal>

			<Modal
				destroyOnClose
				footer={false}
				title='Phản hồi đánh giá'
				visible={replyVisible}
				onCancel={() => {
					setReplyVisible(false);
				}}
			>
				<FormReply />
			</Modal>
		</div>
	);
};

export default ReviewList;
