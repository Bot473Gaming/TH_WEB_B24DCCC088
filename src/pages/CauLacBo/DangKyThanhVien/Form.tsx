import { Button, Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { getAll as getAllCLB } from '@/services/CauLacBo/cauLacBo';
import type { ICauLacBo } from '@/services/CauLacBo/cauLacBo';

const { TextArea } = Input;
const { Option } = Select;

const FormDangKy = () => {
	const { row, isEdit, setVisible, themMoi, capNhat } = useModel('CauLacBo.dangKyThanhVien');
	const [form] = Form.useForm();
	const [clbList, setClbList] = useState<ICauLacBo[]>([]);

	useEffect(() => {
		setClbList(getAllCLB());
	}, []);

	const handleFinish = (values: any) => {
		if (isEdit && row) {
			capNhat(row.id, values);
		} else {
			themMoi(values);
		}
		setVisible(false);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleFinish}
			initialValues={row}
		>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
				<Form.Item
					label="Họ tên"
					name="hoTen"
					rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
				>
					<Input placeholder="Nhập họ tên" />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: 'Vui lòng nhập email!' },
						{ type: 'email', message: 'Email không hợp lệ!' },
					]}
				>
					<Input placeholder="Nhập email" />
				</Form.Item>

				<Form.Item
					label="Số điện thoại"
					name="sdt"
					rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
				>
					<Input placeholder="Nhập SĐT" />
				</Form.Item>

				<Form.Item
					label="Giới tính"
					name="gioiTinh"
					rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
				>
					<Radio.Group>
						<Radio value="Nam">Nam</Radio>
						<Radio value="Nu">Nữ</Radio>
						<Radio value="Khac">Khác</Radio>
					</Radio.Group>
				</Form.Item>
			</div>

			<Form.Item
				label="Địa chỉ"
				name="diaChi"
				rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
			>
				<Input placeholder="Nhập địa chỉ" />
			</Form.Item>

			<Form.Item
				label="Sở trường"
				name="soTruong"
				rules={[{ required: true, message: 'Vui lòng nhập sở trường!' }]}
			>
				<Input placeholder="Nhập sở trường (VD: Âm nhạc, Thể thao, ...)" />
			</Form.Item>

			<Form.Item
				label="Câu lạc bộ"
				name="cauLacBoId"
				rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ!' }]}
			>
				<Select placeholder="Chọn câu lạc bộ" showSearch optionFilterProp="children">
					{clbList.map((clb) => (
						<Option key={clb.id} value={clb.id}>
							{clb.tenCLB}
						</Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item
				label="Lý do đăng ký"
				name="lyDoDangKy"
				rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký!' }]}
			>
				<TextArea rows={3} placeholder="Nhập lý do đăng ký tham gia câu lạc bộ" />
			</Form.Item>

			<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
				<Button onClick={() => setVisible(false)}>Hủy</Button>
				<Button type="primary" htmlType="submit">
					{isEdit ? 'Lưu' : 'Thêm mới'}
				</Button>
			</div>
		</Form>
	);
};

export default FormDangKy;
