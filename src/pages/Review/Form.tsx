import { ReviewRecord } from '@/services/Review';
import { Button, Form, Input, Rate, Select, message } from 'antd';
import { useModel } from 'umi';

const FormReview = () => {
	const [form] = Form.useForm();
	const { setVisible, addReview } = useModel('review');
	const { data: appointmentData } = useModel('appointment');
	const { data: staffData } = useModel('staff');

	const completedAppointments = appointmentData.filter((a) => a.status === 'Completed');

	const onFinish = async (values: any) => {
		const appointment = appointmentData.find((a) => a.id === values.appointmentId);
		if (!appointment) {
			message.error('Invalid appointment');
			return;
		}

		const formattedValues: ReviewRecord = {
			...values,
			id: Date.now().toString(),
			staffId: appointment.staffId,
			customerName: appointment.customerName,
		};

		await addReview(formattedValues);
		setVisible(false);
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item
				name='appointmentId'
				label='Lịch hẹn đã hoàn thành'
				rules={[{ required: true, message: 'Vui lòng chọn lịch hẹn' }]}
			>
				<Select placeholder="Chọn lịch hẹn đã hoàn thành">
					{completedAppointments.map((app) => (
						<Select.Option key={app.id} value={app.id}>
							{app.date} {app.time} - {app.customerName} ({staffData.find(s => s.id === app.staffId)?.name})
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item
				name='rating'
				label='Đánh giá'
				rules={[{ required: true, message: 'Vui lòng cung cấp đánh giá' }]}
			>
				<Rate />
			</Form.Item>

			<Form.Item
				name='comment'
				label='Bình luận'
				rules={[{ required: true, message: 'Vui lòng nhập bình luận' }]}
			>
				<Input.TextArea rows={4} placeholder='Chia sẻ trải nghiệm của bạn...' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					Gửi đánh giá
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormReview;
