import { AppointmentRecord } from '@/services/Appointment';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormAppointment = () => {
	const [form] = Form.useForm();
	const { row, isEdit, setVisible, addAppointment, editAppointment } = useModel('appointment');
	const { data: staffData } = useModel('staff');
	const { data: serviceData } = useModel('service');

	useEffect(() => {
		if (isEdit && row) {
			form.setFieldsValue({
				...row,
				date: moment(row.date, 'YYYY-MM-DD'),
				time: moment(row.time, 'HH:mm'),
			});
		}
	}, [isEdit, row, form]);

	const onFinish = async (values: any) => {
		const formattedValues: AppointmentRecord = {
			...values,
			date: values.date.format('YYYY-MM-DD'),
			time: values.time.format('HH:mm'),
			status: isEdit && row ? row.status : 'Pending',
		};

		if (isEdit && row) {
			const success = await editAppointment({ ...formattedValues, id: row.id, status: row.status });
			if (success) setVisible(false);
		} else {
			const success = await addAppointment({ ...formattedValues, id: Date.now().toString() });
			if (success) setVisible(false);
		}
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish} initialValues={{ status: 'Pending' }}>
			<Form.Item
				name='customerName'
				label='Tên khách hàng'
				rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
			>
				<Input placeholder='Nhập tên khách hàng' />
			</Form.Item>
			
			<Form.Item
				name='staffId'
				label='Nhân viên'
				rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
			>
				<Select placeholder="Chọn nhân viên">
					{staffData.map((staff) => (
						<Select.Option key={staff.id} value={staff.id}>{staff.name} ({staff.role})</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item
				name='serviceId'
				label='Dịch vụ'
				rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
			>
				<Select placeholder="Chọn dịch vụ">
					{serviceData.map((service) => (
						<Select.Option key={service.id} value={service.id}>{service.name} ({service.price} VNĐ)</Select.Option>
					))}
				</Select>
			</Form.Item>

			<div style={{ display: 'flex', gap: 16 }}>
				<Form.Item
					name='date'
					label='Ngày'
					style={{ flex: 1 }}
					rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
				>
					<DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
				</Form.Item>

				<Form.Item
					name='time'
					label='Giờ'
					style={{ flex: 1 }}
					rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
				>
					<TimePicker style={{ width: '100%' }} format="HH:mm" />
				</Form.Item>
			</div>

			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					{isEdit ? 'Cập nhật' : 'Đặt lịch'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormAppointment;
