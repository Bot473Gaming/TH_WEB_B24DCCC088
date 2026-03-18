import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormCauHinhTruong = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, putModel, formSubmiting, visibleForm, postCauHinh } = useModel(
		'vanbang.cauhinhtruong' as any,
	);
	const title = props?.title ?? 'Cấu hình biểu mẫu';

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?.id) form.setFieldsValue(record);
	}, [record?.id, visibleForm]);

	const onFinish = async (values: any) => {
		if (edit) {
			putModel(record?.id ?? '', values)
				.then()
				.catch((er: any) => console.log(er));
		} else {
			postCauHinh(values)
				.then(() => form.resetFields())
				.catch((er: any) => console.log(er));
		}
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase?.()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='tenTruong' label='Tên trường' rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
					<Input placeholder='VD: Nơi sinh, Dân tộc' disabled={edit} />
				</Form.Item>

				<Form.Item name='kieuDuLieu' label='Kiểu dữ liệu' rules={[...rules.required]}>
					<Select
						options={[
							{ value: 'String', label: 'String' },
							{ value: 'Number', label: 'Number' },
							{ value: 'Date', label: 'Date' },
						]}
					/>
				</Form.Item>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit ? 'Thêm mới' : 'Lưu lại'}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormCauHinhTruong;

