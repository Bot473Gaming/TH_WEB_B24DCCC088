import rules from '@/utils/rules';
import { Button, Card, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const FormGiangVien = () => {
	const [form] = Form.useForm();
	const { record, edit, visibleForm, setVisibleForm, postModel, putModel, loading } = useModel(
		'useQuanLyGiangVienModel',
	);

	useEffect(() => {
		if (visibleForm) {
			if (edit && record) {
				form.setFieldsValue(record);
			} else {
				form.resetFields();
			}
		}
	}, [visibleForm, edit, record, form]);

	const onFinish = async (values: any) => {
		if (edit && record?._id) {
			await putModel(record._id, values);
		} else {
			await postModel(values);
		}
	};

	const onCancel = () => {
		setVisibleForm(false);
	};

	return (
		<Card title={edit ? 'Chỉnh sửa giảng viên' : 'Thêm mới giảng viên'}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='maGiangVien'
					label='Mã giảng viên'
					rules={[...rules.required]}
				>
					<Input placeholder='Nhập mã giảng viên' disabled={edit} />
				</Form.Item>

				<Form.Item
					name='hoTen'
					label='Họ tên'
					rules={[...rules.required]}
				>
					<Input placeholder='Nhập họ tên giảng viên' />
				</Form.Item>

				<Form.Item
					name='email'
					label='Email'
					rules={[...rules.required, ...rules.email]}
				>
					<Input placeholder='Nhập email' />
				</Form.Item>

				<Form.Item
					name='soDienThoai'
					label='Số điện thoại'
				>
					<Input placeholder='Nhập số điện thoại' />
				</Form.Item>

				<div className='form-footer'>
					<Button key='submit' type='primary' loading={loading} htmlType='submit'>
						Lưu
					</Button>
					<Button key='back' onClick={onCancel} style={{ marginLeft: 8 }}>
						Hủy
					</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormGiangVien;
