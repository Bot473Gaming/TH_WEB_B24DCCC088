import type { FormInstance } from 'antd/es/form';
import { AutoComplete, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';

type Props = {
	form: FormInstance;
	editing: CongViecNhom.Task | null;
	assigneeOptions: string[];
};

const priorityOpts = [
	{ value: 'low', label: 'Thấp' },
	{ value: 'medium', label: 'Trung bình' },
	{ value: 'high', label: 'Cao' },
];

const statusOpts = [
	{ value: 'pending', label: 'Chưa làm' },
	{ value: 'progress', label: 'Đang làm' },
	{ value: 'done', label: 'Đã xong' },
];

const TaskForm: React.FC<Props> = ({ form, editing, assigneeOptions }) => {
	useEffect(() => {
		if (editing) {
			form.setFieldsValue({
				...editing,
				thoiHan: editing.thoiHan ? moment(editing.thoiHan) : undefined,
			});
		} else {
			form.resetFields();
			form.setFieldsValue({
				mucDoUuTien: 'medium',
				trangThai: 'pending',
			});
		}
	}, [editing, form]);

	return (
		<Form form={form} layout='vertical'>
			<Form.Item
				name='tenCongViec'
				label='Tên công việc'
				rules={[{ required: true, message: 'Bắt buộc' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='nguoiDuocGiao'
				label='Người được giao'
				rules={[{ required: true, message: 'Bắt buộc' }]}
			>
				<AutoComplete
					allowClear
					placeholder='Nhập hoặc chọn gợi ý'
					options={assigneeOptions.map((x) => ({ value: x }))}
					filterOption={(input, option) =>
						String(option?.value ?? '')
							.toLowerCase()
							.includes(input.toLowerCase())
					}
				>
					<Input />
				</AutoComplete>
			</Form.Item>
			<Form.Item name='mucDoUuTien' label='Mức độ ưu tiên' rules={[{ required: true }]}>
				<Select options={priorityOpts} />
			</Form.Item>
			<Form.Item name='thoiHan' label='Thời hạn hoàn thành' rules={[{ required: true }]}>
				<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
			</Form.Item>
			<Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true }]}>
				<Select options={statusOpts} />
			</Form.Item>
		</Form>
	);
};

export default TaskForm;
