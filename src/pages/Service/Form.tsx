import { ServiceRecord } from '@/services/Service';
import { Button, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormService = () => {
	const [form] = Form.useForm();
	const { row, isEdit, setVisible, addService, editService } = useModel('service');

	useEffect(() => {
		if (isEdit && row) {
			form.setFieldsValue(row);
		}
	}, [isEdit, row]);

	const onFinish = async (values: ServiceRecord) => {
		if (isEdit && row) {
			await editService({ ...values, id: row.id });
		} else {
			await addService({ ...values, id: Date.now().toString() });
		}
		setVisible(false);
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<Form.Item
				name='name'
				label='Tên dịch vụ'
				rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
			>
				<Input placeholder='Nhập tên dịch vụ' />
			</Form.Item>
			<Form.Item
				name='price'
				label='Giá (VNĐ)'
				rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
			>
				<InputNumber min={0} style={{ width: '100%' }} placeholder='VD: 50' />
			</Form.Item>
			<Form.Item
				name='durationMinutes'
				label='Thời gian (Phút)'
				rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
			>
				<InputNumber min={5} step={5} style={{ width: '100%' }} placeholder='VD: 30' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					{isEdit ? 'Cập nhật' : 'Thêm'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormService;
