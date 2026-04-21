import { ETrangThai } from '@/services/QuanLyKhoaHoc/constant';
import rules from '@/utils/rules';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const FormHocVien = () => {
	const [form] = Form.useForm();
	const { record, edit, visibleForm, setVisibleForm, postModel, putModel, loading } = useModel(
		'QuanLyHocVienModel',
	);
	const { danhSach: danhSachKhoaHoc, getAllModel: getAllKhoaHoc } = useModel('QuanLyKhoaHocModel');

	useEffect(() => {
		if (visibleForm) {
			getAllKhoaHoc();
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
		<Card title={edit ? 'Chỉnh sửa học viên' : 'Thêm mới học viên'}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='maHocVien'
					label='Mã học viên'
					rules={[...rules.required]}
				>
					<Input placeholder='Nhập mã học viên' disabled={edit} />
				</Form.Item>

				<Form.Item
					name='hoTen'
					label='Họ tên'
					rules={[...rules.required]}
				>
					<Input placeholder='Nhập họ tên học viên' />
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

				<Form.Item
					name='idKhoaHoc'
					label='Khóa học đăng ký'
					rules={[...rules.required]}
				>
					<Select placeholder='Chọn khóa học'>
						{danhSachKhoaHoc
							.filter((item) => item.trangThai === ETrangThai.DANG_MO)
							.map((item) => (
								<Select.Option key={item._id} value={item._id}>
									{item.tenKhoaHoc}
								</Select.Option>
							))}
					</Select>
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

export default FormHocVien;
