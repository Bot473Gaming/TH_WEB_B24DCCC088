import { StaffRecord } from '@/services/Staff';
import { Button, Form, Input, InputNumber, Select, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormStaff = () => {
	const [form] = Form.useForm();
	const { row, isEdit, setVisible, addStaff, editStaff } = useModel('staff');

	useEffect(() => {
		if (isEdit && row) {
			form.setFieldsValue({
				...row,
				startTime: row.startTime ? moment(row.startTime, 'HH:mm') : undefined,
				endTime: row.endTime ? moment(row.endTime, 'HH:mm') : undefined,
			});
		}
	}, [isEdit, row, form]);

	const onFinish = async (values: any) => {
		const formattedValues = {
			...values,
			startTime: values.startTime ? values.startTime.format('HH:mm') : '',
			endTime: values.endTime ? values.endTime.format('HH:mm') : '',
		};

		if (isEdit && row) {
			await editStaff({ ...formattedValues, id: row.id } as StaffRecord);
		} else {
			await addStaff({ ...formattedValues, id: Date.now().toString() } as StaffRecord);
		}
		setVisible(false);
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item
				name='name'
				label='Tên nhân viên'
				rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
			>
				<Input placeholder='Nhập tên nhân viên' />
			</Form.Item>
			<Form.Item
				name='role'
				label='Vai trò/Vị trí'
				rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
			>
				<Input placeholder='VD: Thợ cắt tóc' />
			</Form.Item>
			<Form.Item
				name='dailyLimit'
				label='Giới hạn lịch hẹn/ngày'
				rules={[{ required: true, message: 'Vui lòng nhập giới hạn' }]}
			>
				<InputNumber min={1} max={50} style={{ width: '100%' }} placeholder='e.g. 10' />
			</Form.Item>
			<Form.Item
				name='workingDays'
				label='Thứ làm việc trong tuần'
				rules={[{ required: true, message: 'Vui lòng chọn ngày làm việc' }]}
			>
				<Select
					mode="multiple"
					placeholder="Chọn ngày làm việc"
					options={[
						{ label: 'Thứ 2', value: 'Thứ 2' },
						{ label: 'Thứ 3', value: 'Thứ 3' },
						{ label: 'Thứ 4', value: 'Thứ 4' },
						{ label: 'Thứ 5', value: 'Thứ 5' },
						{ label: 'Thứ 6', value: 'Thứ 6' },
						{ label: 'Thứ 7', value: 'Thứ 7' },
						{ label: 'Chủ nhật', value: 'Chủ nhật' },
					]}
				/>
			</Form.Item>
			<Form.Item
				name='startTime'
				label='Giờ bắt đầu làm'
				rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
			>
				<TimePicker format="HH:mm" style={{ width: '100%' }} placeholder="Chọn giờ" />
			</Form.Item>
			<Form.Item
				name='endTime'
				label='Giờ kết thúc làm'
				rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}
			>
				<TimePicker format="HH:mm" style={{ width: '100%' }} placeholder="Chọn giờ" />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					{isEdit ? 'Cập nhật' : 'Thêm'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormStaff;
