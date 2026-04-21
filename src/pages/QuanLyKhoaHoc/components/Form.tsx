import TinyEditor from '@/components/TinyEditor';
import { TRANG_THAI_LABEL } from '@/services/QuanLyKhoaHoc/constant';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';
import rules from '@/utils/rules';
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const FormKhoaHoc = () => {
	const [form] = Form.useForm();
	const { record, edit, visibleForm, setVisibleForm, postModel, putModel, loading } = useModel(
		'useQuanLyKhoaHocModel',
	);
	const { danhSach: danhSachGiangVien, getAllModel: getAllGiangVien } = useModel('useQuanLyGiangVienModel');

	useEffect(() => {
		if (visibleForm) {
			getAllGiangVien();
			if (edit && record) {
				form.setFieldsValue(record);
			} else {
				form.resetFields();
			}
		}
	}, [visibleForm, edit, record, form]);

	const onFinish = async (values: KhoaHoc.IRecord) => {
		try {
			if (edit && record?._id) {
				await putModel(record._id, values);
			} else {
				await postModel(values);
			}
			setVisibleForm(false);
		} catch (error) {
			if (error === 'Duplicate name') {
				form.setFields([
					{
						name: 'tenKhoaHoc',
						errors: ['Tên khóa học đã tồn tại'],
					},
				]);
			}
		}
	};

	const onCancel = () => {
		setVisibleForm(false);
	};

	return (
		<Card title={edit ? 'Chỉnh sửa khóa học' : 'Thêm mới khóa học'}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='tenKhoaHoc'
					label='Tên khóa học'
					rules={[...rules.required, ...rules.length(100)]}
				>
					<Input placeholder='Nhập tên khóa học' />
				</Form.Item>

				<Form.Item
					name='idGiangVien'
					label='Giảng viên'
					rules={[...rules.required]}
				>
					<Select placeholder='Chọn giảng viên'>
						{danhSachGiangVien.map((item) => (
							<Select.Option key={item._id} value={item._id}>
								{item.hoTen}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name='soLuongHocVien'
					label='Số lượng học viên'
					rules={[...rules.required]}
					initialValue={0}
				>
					<InputNumber min={0} style={{ width: '100%' }} placeholder='Nhập số lượng học viên' />
				</Form.Item>

				<Form.Item
					name='trangThai'
					label='Trạng thái'
					rules={[...rules.required]}
				>
					<Select placeholder='Chọn trạng thái'>
						{Object.entries(TRANG_THAI_LABEL).map(([value, label]) => (
							<Select.Option key={value} value={value}>
								{label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name='moTa' label='Mô tả'>
					<TinyEditor />
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

export default FormKhoaHoc;
