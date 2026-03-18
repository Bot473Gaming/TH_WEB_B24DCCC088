import MyDatePicker from '@/components/MyDatePicker';
import { Button, Card, Col, Descriptions, Form, Input, InputNumber, Row, Space, Typography, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';

type TSearchValues = {
	soHieu?: string;
	soVaoSo?: number;
	msv?: string;
	hoTen?: string;
	ngaySinh?: string;
};

const countFilled = (v: TSearchValues) =>
	['soHieu', 'soVaoSo', 'msv', 'hoTen', 'ngaySinh'].reduce((acc, key) => {
		const val = (v as any)?.[key];
		if (val === undefined || val === null || val === '') return acc;
		return acc + 1;
	}, 0);

const TraCuuPage = () => {
	const [form] = Form.useForm<TSearchValues>();
	const vanBangModel = useModel('vanbang.vanbang' as any);
	const qdModel = useModel('vanbang.quyetdinh' as any);
	const cauHinhModel = useModel('vanbang.cauhinhtruong' as any);

	const { getAllModel: getAllVanBang } = vanBangModel;
	const { tangLuotTraCuu } = qdModel;
	const { getAllModel: getAllCauHinh } = cauHinhModel;

	const [configs, setConfigs] = useState<VanBang.ICauHinhTruong[]>([]);
	const [results, setResults] = useState<VanBang.IVanBang[]>([]);

	useEffect(() => {
		getAllCauHinh(false, { thuTu: 1 } as any)
			.then((rows: any) => setConfigs((rows ?? []).sort((a: any, b: any) => (a?.thuTu ?? 0) - (b?.thuTu ?? 0))))
			.catch(() => setConfigs([]));
	}, []);

	const configLabelById = useMemo(() => {
		const map = new Map<string, string>();
		(configs ?? []).forEach((c) => map.set(c.id, c.tenTruong));
		return map;
	}, [configs]);

	const onSearch = async () => {
		const values = (await form.validateFields()) as TSearchValues;
		if (countFilled(values) < 2) {
			message.error('Vui lòng nhập ít nhất 2 trường thông tin để tra cứu');
			return;
		}

		const all = (await getAllVanBang(false, { soVaoSo: -1 } as any)) as any[];
		const normalized = (all ?? []) as VanBang.IVanBang[];

		const needleHoTen = (values?.hoTen ?? '').trim().toLowerCase();
		const needleSoHieu = (values?.soHieu ?? '').trim().toLowerCase();
		const needleMsv = (values?.msv ?? '').trim().toLowerCase();
		const needleNgaySinh = values?.ngaySinh ?? undefined;

		const filtered = normalized.filter((vb) => {
			if (needleSoHieu && !(vb?.soHieu ?? '').toLowerCase().includes(needleSoHieu)) return false;
			if (values?.soVaoSo !== undefined && values?.soVaoSo !== null && vb?.soVaoSo !== Number(values.soVaoSo)) return false;
			if (needleMsv && !(vb?.msv ?? '').toLowerCase().includes(needleMsv)) return false;
			if (needleHoTen && !(vb?.hoTen ?? '').toLowerCase().includes(needleHoTen)) return false;
			if (needleNgaySinh && vb?.ngaySinh !== needleNgaySinh) return false;
			return true;
		});

		setResults(filtered);

		if (filtered?.length) {
			// tăng lượt tra cứu cho QĐ tương ứng (mỗi QĐ chỉ tăng 1 lần trong lần search này)
			const uniqQd = Array.from(new Set(filtered.map((x) => x.idQuyetDinh).filter(Boolean)));
			await Promise.allSettled(uniqQd.map((id) => tangLuotTraCuu(id, 1)));
		}
	};

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Card>
					<Typography.Title level={4} style={{ marginTop: 0 }}>
						Cổng tra cứu văn bằng
					</Typography.Title>

					<Form form={form} layout='vertical' onFinish={onSearch}>
						<Row gutter={[16, 0]}>
							<Col xs={24} md={8}>
								<Form.Item name='soHieu' label='Số hiệu'>
									<Input placeholder='Số hiệu' allowClear />
								</Form.Item>
							</Col>
							<Col xs={24} md={8}>
								<Form.Item name='soVaoSo' label='Số vào sổ'>
									<InputNumber style={{ width: '100%' }} placeholder='Số vào sổ' />
								</Form.Item>
							</Col>
							<Col xs={24} md={8}>
								<Form.Item name='msv' label='MSV'>
									<Input placeholder='Mã sinh viên' allowClear />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='hoTen' label='Họ tên'>
									<Input placeholder='Họ tên' allowClear />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='ngaySinh' label='Ngày sinh'>
									<MyDatePicker />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[12, 12]}>
							<Col xs={24} md={12}>
								<Button type='primary' htmlType='submit' block>
									Tra cứu
								</Button>
							</Col>
							<Col xs={24} md={12}>
								<Button
									block
									onClick={() => {
										form.resetFields();
										setResults([]);
									}}
								>
									Xóa bộ lọc
								</Button>
							</Col>
						</Row>
					</Form>
				</Card>
			</Col>

			<Col span={24}>
				{results?.length ? (
					<Row gutter={[16, 16]}>
						{results.map((vb) => (
							<Col span={24} key={vb.id}>
								<Card title={`Văn bằng: ${vb.soHieu ?? ''}`} bordered>
									<Descriptions column={1} size='small'>
										<Descriptions.Item label='Số vào sổ'>{vb.soVaoSo ?? ''}</Descriptions.Item>
										<Descriptions.Item label='MSV'>{vb.msv ?? ''}</Descriptions.Item>
										<Descriptions.Item label='Họ tên'>{vb.hoTen ?? ''}</Descriptions.Item>
										<Descriptions.Item label='Ngày sinh'>{vb.ngaySinh ?? ''}</Descriptions.Item>

										{Object.entries(vb.truongDong ?? {}).map(([key, val]) => (
											<Descriptions.Item key={key} label={configLabelById.get(key) ?? key}>
												{val ?? ''}
											</Descriptions.Item>
										))}
									</Descriptions>
								</Card>
							</Col>
						))}
					</Row>
				) : (
					<Card>
						<Typography.Text type='secondary'>Chưa có kết quả. Hãy nhập tối thiểu 2 trường và tra cứu.</Typography.Text>
					</Card>
				)}
			</Col>
		</Row>
	);
};

export default TraCuuPage;

