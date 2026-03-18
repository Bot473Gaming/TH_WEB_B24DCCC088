import MyDatePicker from '@/components/MyDatePicker';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';

const FormQuyetDinh = (props: any) => {
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel('vanbang.quyetdinh' as any);
	const { getAllModel: getAllSo } = useModel('vanbang.sovanbang' as any);
	const [soDangMo, setSoDangMo] = useState<VanBang.ISoVanBang[]>([]);
	const title = props?.title ?? 'Quyết định tốt nghiệp';

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?.id) form.setFieldsValue(record);
	}, [record?.id, visibleForm]);

	useEffect(() => {
		getAllSo(false, { tenSo: 1 } as any, { trangThai: 'ĐANG_MỞ' } as any)
			.then((rows: any) => setSoDangMo(rows ?? []))
			.catch(() => setSoDangMo([]));
	}, [visibleForm]);

	const options = useMemo(
		() =>
			(soDangMo ?? []).map((s) => ({
				value: s.id,
				label: `${s.tenSo} (số kế tiếp: ${s.soHienTai ?? 1})`,
			})),
		[soDangMo],
	);

	const onFinish = async (values: Partial<VanBang.IQuyetDinh>) => {
		const payload: Partial<VanBang.IQuyetDinh> = {
			...values,
			luotTraCuu: record?.luotTraCuu ?? 0,
		};

		if (edit) {
			putModel(record?.id ?? '', payload as any)
				.then()
				.catch((er: any) => console.log(er));
		} else {
			postModel({ ...payload, luotTraCuu: 0 } as any)
				.then(() => form.resetFields())
				.catch((er: any) => console.log(er));
		}
	};

	return (
		<Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase?.()}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Form.Item name='soQD' label='Số quyết định' rules={[...rules.required, ...rules.text, ...rules.length(50)]}>
					<Input placeholder='VD: 123/QĐ-ĐH' />
				</Form.Item>

				<Form.Item name='ngayBanHanh' label='Ngày ban hành' rules={[...rules.required]}>
					<MyDatePicker />
				</Form.Item>

				<Form.Item name='trichYeu' label='Trích yếu' rules={[...rules.required, ...rules.text, ...rules.length(500)]}>
					<Input.TextArea placeholder='Nội dung trích yếu' rows={3} />
				</Form.Item>

				<Form.Item name='idSoVanBang' label='Sổ văn bằng' rules={[...rules.required]}>
					<Select
						placeholder='Chọn sổ đang mở'
						options={options}
						showSearch
						filterOption={(input, option) =>
							(option?.label?.toString?.() ?? '').toLowerCase().includes(input.toLowerCase())
						}
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

export default FormQuyetDinh;

