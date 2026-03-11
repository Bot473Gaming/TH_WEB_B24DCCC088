import { Card, Col, Result, Row, Statistic } from 'antd';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useModel } from 'umi';

const ReportDashboard = () => {
	const { stats, generateReport } = useModel('report');
	const { data: staffData } = useModel('staff');
	const { data: serviceData } = useModel('service');
	const { role } = useModel('role');

	useEffect(() => {
		generateReport();
	}, [staffData, serviceData]);

	if (!stats) return <div>Đang tải...</div>;

	if (role === 'user') {
		return (
			<Result
				status="403"
				title="403"
				subTitle="Xin lỗi, bạn không có quyền xem thống kê."
			/>
		);
	}

	// Total Appointments & Revenue
	let totalApps = 0;
	Object.values(stats.appointmentsByDate).forEach((val) => (totalApps += val));

	let totalRevenue = 0;
	Object.values(stats.revenueByService).forEach((val) => (totalRevenue += val));

	// Appointments by Date Chart Setup
	const dates = Object.keys(stats.appointmentsByDate).sort();
	const appCounts = dates.map((d) => stats.appointmentsByDate[d]);

	const dateChartOptions = {
		chart: { type: 'area', toolbar: { show: false } },
		xaxis: { categories: dates, title: { text: 'Ngày' } },
		yaxis: { title: { text: 'Lịch hẹn' } },
		dataLabels: { enabled: false },
		stroke: { curve: 'smooth' },
		title: { text: 'Lịch hẹn theo Ngày' },
	} as const;

	const dateChartSeries = [{ name: 'Lịch hẹn', data: appCounts }];

	// Revenue by Staff Chart Setup
	const staffNames = Object.keys(stats.revenueByStaff).map(
		(id) => staffData.find((s) => s.id === id)?.name || 'Không rõ'
	);
	const staffRevenues = Object.values(stats.revenueByStaff);

	const staffChartOptions = {
		chart: { type: 'bar', toolbar: { show: false } },
		xaxis: { categories: staffNames },
		yaxis: { title: { text: 'Doanh thu (VNĐ)' } },
		title: { text: 'Doanh thu theo Nhân viên' },
	} as const;

	const staffChartSeries = [{ name: 'Doanh thu', data: staffRevenues }];

	// Revenue by Service Chart Setup
	const serviceNames = Object.keys(stats.revenueByService).map(
		(id) => serviceData.find((s) => s.id === id)?.name || 'Không rõ'
	);
	const serviceRevenues = Object.values(stats.revenueByService);

	const serviceChartOptions = {
		chart: { type: 'donut' },
		labels: serviceNames,
		title: { text: 'Doanh thu theo Dịch vụ' },
	} as const;

	const serviceChartSeries = serviceRevenues;

	return (
		<div>
			<Row gutter={16} style={{ marginBottom: 24 }}>
				<Col span={12}>
					<Card>
						<Statistic title='Tổng số Lịch hẹn' value={totalApps} />
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Statistic title='Tổng Doanh thu (VNĐ)' value={totalRevenue} precision={2} />
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Card>
						<ReactApexChart options={dateChartOptions} series={dateChartSeries} type='area' height={300} />
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<ReactApexChart options={staffChartOptions} series={staffChartSeries} type='bar' height={300} />
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<ReactApexChart options={serviceChartOptions} series={serviceChartSeries} type='donut' height={300} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ReportDashboard;
