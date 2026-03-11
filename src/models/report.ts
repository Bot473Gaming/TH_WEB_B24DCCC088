import { getReportData, ReportStats } from '@/services/Report';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
	const [stats, setStats] = useState<ReportStats | null>(null);
	
	const { data: appointmentData } = useModel('appointment');
	const { data: staffData } = useModel('staff');
	const { data: serviceData } = useModel('service');

	const generateReport = async () => {
		const result = await getReportData(appointmentData, staffData, serviceData);
		setStats(result);
	};

	return {
		stats,
		generateReport,
	};
};
