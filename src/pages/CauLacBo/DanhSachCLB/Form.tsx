import { Button, DatePicker, Form, Input, Switch } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import TinyEditor from '@/components/TinyEditor';
import UploadFile from '@/components/Upload/UploadFile';

const FormCauLacBo = () => {
	const { row, isEdit, setVisible, themMoi, capNhat } = useModel('CauLacBo.cauLacBo');
	const [form] = Form.useForm();

	const handleFinish = (values: any) => {
		const anhDaiDien =
			typeof values.anhDaiDien === 'string'
				? values.anhDaiDien
				: values.anhDaiDien?.fileList?.[0]?.url ||
				  values.anhDaiDien?.fileList?.[0]?.thumbUrl ||
				  row?.anhDaiDien ||
				  '';

		const payload = {
			...values,
			ngayThanhLap: values.ngayThanhLap ? values.ngayThanhLap.format('YYYY-MM-DD') : '',
			anhDaiDien,
			hoatDong: values.hoatDong ?? true,
		};

		if (isEdit && row) {
			capNhat(row.id, payload);
		} else {
			themMoi(payload);
		}
		setVisible(false);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleFinish}
			initialValues={{
				...row,
				ngayThanhLap: row?.ngayThanhLap ? moment(row.ngayThanhLap) : undefined,
				hoatDong: row ? row.hoatDong : true,
			}}
		>
			<Form.Item label="Ảnh đại diện" name="anhDaiDien">
				<UploadFile isAvatar value={row?.anhDaiDien} buttonDescription="Tải ảnh lên" />
			</Form.Item>

			<Form.Item
				label="Tên câu lạc bộ"
				name="tenCLB"
				rules={[{ required: true, message: 'Vui lòng nhập tên CLB!' }]}
			>
				<Input placeholder="Nhập tên câu lạc bộ" />
			</Form.Item>

			<Form.Item
				label="Ngày thành lập"
				name="ngayThanhLap"
				rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập!' }]}
			>
				<DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label="Chủ nhiệm CLB"
				name="chuNhiem"
				rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm!' }]}
			>
				<Input placeholder="Nhập tên chủ nhiệm" />
			</Form.Item>

			<Form.Item label="Hoạt động" name="hoatDong" valuePropName="checked">
				<Switch checkedChildren="Có" unCheckedChildren="Không" />
			</Form.Item>

			<Form.Item label="Mô tả" name="moTa">
				<TinyEditor height={300} hideMenubar miniToolbar />
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

export default FormCauLacBo;
