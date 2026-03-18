import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormSoVanBang = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, formSubmiting, visibleForm, moSoMoi } = useModel('vanbang.sovanbang' as any);
	const title = props?.title ?? 'Sổ văn bằng';

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?.id) form.setFieldsValue(record);
	}, [record?.id, visibleForm]);

	const onFinish = async (values: { tenSo: string }) => {
		await moSoMoi(values?.tenSo ?? '')
			.then(() => form.resetFields())
			.catch((er: any) => console.log(er));
	};

	return (
		<Card title={`Mở sổ mới (${title?.toLowerCase?.() ?? ''})`}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='tenSo' label='Tên sổ' rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
					<Input placeholder='VD: Sổ 2024, Sổ đợt 1' />
				</Form.Item>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						Tạo sổ
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormSoVanBang;

