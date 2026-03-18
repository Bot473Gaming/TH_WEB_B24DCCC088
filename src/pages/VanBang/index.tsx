import MyDatePicker from '@/components/MyDatePicker';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import rules from '@/utils/rules';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Space, Typography, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import DynamicFormFields from './components/DynamicFormFields';

const VanBangPage = () => {
	const [form] = Form.useForm();

	const vanBangModel = useModel('vanbang.vanbang' as any);
	const qdModel = useModel('vanbang.quyetdinh' as any);
	const soModel = useModel('vanbang.sovanbang' as any);
	const cauHinhModel = useModel('vanbang.cauhinhtruong' as any);

	const { page, limit, getModel: getVanBangPage, taoVanBang, formSubmiting } = vanBangModel;
	const { getAllModel: getAllQuyetDinh } = qdModel;
	const { getByIdModel: getSoById } = soModel;
	const { getAllModel: getAllCauHinh } = cauHinhModel;

	const [quyetDinhs, setQuyetDinhs] = useState<VanBang.IQuyetDinh[]>([]);
	const [configs, setConfigs] = useState<VanBang.ICauHinhTruong[]>([]);
	const [soVaoSo, setSoVaoSo] = useState<number | undefined>(undefined);

	useEffect(() => {
		getVanBangPage();
	}, []);

	useEffect(() => {
		getAllQuyetDinh(false, { ngayBanHanh: -1 } as any)
			.then((rows: any) => setQuyetDinhs(rows ?? []))
			.catch(() => setQuyetDinhs([]));
		getAllCauHinh(false, { thuTu: 1 } as any)
			.then((rows: any) => setConfigs((rows ?? []).sort((a: any, b: any) => (a?.thuTu ?? 0) - (b?.thuTu ?? 0))))
			.catch(() => setConfigs([]));
	}, []);

	const qdOptions = useMemo(
		() =>
			(quyetDinhs ?? []).map((qd) => ({
				value: qd.id,
				label: `${qd.soQD} - ${qd.trichYeu ?? ''}`,
			})),
		[quyetDinhs],
	);

	const columns: IColumn<VanBang.IVanBang>[] = [
		{ title: 'Số vào sổ', dataIndex: 'soVaoSo', width: 100, align: 'center', sortable: true },
		{ title: 'Số hiệu', dataIndex: 'soHieu', width: 160, filterType: 'string', sortable: true },
		{ title: 'MSV', dataIndex: 'msv', width: 140, filterType: 'string', sortable: true },
		{ title: 'Họ tên', dataIndex: 'hoTen', width: 220, filterType: 'string', sortable: true },
		{ title: 'Ngày sinh', dataIndex: 'ngaySinh', width: 140, align: 'center' },
		{
			title: 'Quyết định',
			dataIndex: 'idQuyetDinh',
			width: 180,
			align: 'center',
			render: (id: string) => (quyetDinhs ?? []).find((x) => x.id === id)?.soQD ?? id ?? '',
		},
	];

	const onChangeQuyetDinh = async (idQuyetDinh: string) => {
		try {
			const qd = (quyetDinhs ?? []).find((x) => x.id === idQuyetDinh);
			if (!qd?.idSoVanBang) {
				setSoVaoSo(undefined);
				form.setFieldsValue({ soVaoSo: undefined });
				return;
			}
			const so = await getSoById(qd.idSoVanBang, false);
			const nextSo = so?.soHienTai ?? 1;
			setSoVaoSo(nextSo);
			form.setFieldsValue({ soVaoSo: nextSo });
		} catch (e) {
			setSoVaoSo(undefined);
			form.setFieldsValue({ soVaoSo: undefined });
		}
	};

	const onFinish = async (values: any) => {
		const ngaySinh = new Intl.DateTimeFormat('vi-VN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		  }).format(new Date(values?.ngaySinh ?? ''));
		const payload: Omit<VanBang.IVanBang, 'id' | 'soVaoSo'> = {
			idQuyetDinh: values?.idQuyetDinh,
			soHieu: values?.soHieu,
			msv: values?.msv,
			hoTen: values?.hoTen,
			ngaySinh,
			truongDong: values?.truongDong ?? {},
		};

		await taoVanBang({ ...payload, soVaoSo: values?.soVaoSo ?? soVaoSo })
			.then(() => {
				message.success('Đã thêm văn bằng');
				form.resetFields();
				setSoVaoSo(undefined);
			})
			.catch((er: any) => message.error(er?.message ?? er ?? 'Không thể lưu văn bằng'));
	};

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Card title='Thêm mới thông tin văn bằng'>
					<Form form={form} layout='vertical' onFinish={onFinish}>
						<Row gutter={[16, 0]}>
							<Col xs={24} md={12}>
								<Form.Item name='idQuyetDinh' label='Quyết định tốt nghiệp' rules={[...rules.required]}>
									<Select
										placeholder='Chọn quyết định'
										options={qdOptions}
										showSearch
										onChange={onChangeQuyetDinh}
										filterOption={(input, option) =>
											(option?.label?.toString?.() ?? '').toLowerCase().includes(input.toLowerCase())
										}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='soVaoSo' label='Số vào sổ' rules={[...rules.required]}>
									<InputNumber style={{ width: '100%' }} disabled />
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item name='soHieu' label='Số hiệu văn bằng' rules={[...rules.required, ...rules.text, ...rules.length(100)]}>
									<Input placeholder='Số hiệu' />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='msv' label='Mã sinh viên' rules={[...rules.required, ...rules.text, ...rules.length(50)]}>
									<Input placeholder='MSV' />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='hoTen' label='Họ tên' rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
									<Input placeholder='Họ tên' />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='ngaySinh' label='Ngày sinh' rules={[...rules.required]}>
									<MyDatePicker />
								</Form.Item>
							</Col>
						</Row>

						{configs?.length ? (
							<>
								<Typography.Title level={5} style={{ marginTop: 8 }}>
									Thông tin phụ lục
								</Typography.Title>
								<Row gutter={[16, 0]}>
									<Col span={24}>
										<DynamicFormFields configs={configs} />
									</Col>
								</Row>
							</>
						) : null}

						<Space>
							<Button type='primary' htmlType='submit' loading={formSubmiting}>
								Lưu
							</Button>
							<Button
								onClick={() => {
									form.resetFields();
									setSoVaoSo(undefined);
								}}
							>
								Làm mới
							</Button>
						</Space>
					</Form>
				</Card>
			</Col>

			<Col span={24}>
				<TableBase
					columns={columns}
					dependencies={[page, limit]}
					modelName='vanbang.vanbang'
					title='Danh sách văn bằng'
					buttons={{ create: false, import: false, export: false }}
				/>
			</Col>
		</Row>
	);
};

export default VanBangPage;

