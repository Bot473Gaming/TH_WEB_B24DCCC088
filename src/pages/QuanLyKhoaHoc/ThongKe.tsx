import ColumnChart from '@/components/Chart/ColumnChart';
import DonutChart from '@/components/Chart/DonutChart';
import { ETrangThai, TRANG_THAI_LABEL } from '@/services/QuanLyKhoaHoc/constant';
import { Card, Col, Row } from 'antd';
import { useModel } from 'umi';
import { useEffect, useMemo, useState } from 'react';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';

const ThongKe = () => {
	const { getModel } = useModel('QuanLyKhoaHocModel');
	const [allData, setAllData] = useState<KhoaHoc.IRecord[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getModel({ condition: {}, page: 1, limit: 1000 });
			if (data) {
				setAllData(data as KhoaHoc.IRecord[]);
			}
		};
		fetchData();
	}, []);

	const donutData = useMemo(() => {
		const counts = {
			[ETrangThai.DANG_MO]: 0,
			[ETrangThai.DA_KET_THUC]: 0,
			[ETrangThai.TAM_DUNG]: 0,
		};

		allData.forEach((item) => {
			if (counts[item.trangThai] !== undefined) {
				counts[item.trangThai]++;
			}
		});

		const xAxis = Object.values(TRANG_THAI_LABEL);
		const yAxis = [[counts[ETrangThai.DANG_MO], counts[ETrangThai.DA_KET_THUC], counts[ETrangThai.TAM_DUNG]]];

		return { xAxis, yAxis };
	}, [allData]);

	const columnData = useMemo(() => {
		const xAxis = allData.map((item) => item.tenKhoaHoc);
		const yAxis = [allData.map((item) => item.soLuongHocVien)];

		return { xAxis, yAxis };
	}, [allData]);

	return (
		<div style={{ padding: '24px' }}>
			<Row gutter={[24, 24]}>
				<Col xs={24} md={12}>
					<Card title='Tỉ lệ trạng thái khóa học' bordered={false}>
						<DonutChart
							xAxis={donutData.xAxis}
							yAxis={donutData.yAxis}
							yLabel={['Số lượng']}
							showTotal
							height={350}
							formatY={(val) => `${val} khóa học`}
						/>
					</Card>
				</Col>
				<Col xs={24} md={12}>
					<Card title='Số lượng học viên theo khóa học' bordered={false}>
						<ColumnChart
							xAxis={columnData.xAxis}
							yAxis={columnData.yAxis}
							yLabel={['Số lượng học viên']}
							height={350}
							formatY={(val) => `${val} học viên`}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ThongKe;
