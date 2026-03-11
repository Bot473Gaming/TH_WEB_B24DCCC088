export interface ReportStats {
	appointmentsByDate: Record<string, number>;
	revenueByStaff: Record<string, number>;
	revenueByService: Record<string, number>;
}

export const getReportData = async (
	appointments: any[],
	staffList: any[],
	serviceList: any[]
): Promise<ReportStats> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const stats: ReportStats = {
				appointmentsByDate: {},
				revenueByStaff: {},
				revenueByService: {},
			};

			// Initialize
			staffList.forEach((s) => (stats.revenueByStaff[s.id] = 0));
			serviceList.forEach((s) => (stats.revenueByService[s.id] = 0));

			appointments.forEach((app) => {
				// Count appointments by date
				if (!stats.appointmentsByDate[app.date]) {
					stats.appointmentsByDate[app.date] = 0;
				}
				stats.appointmentsByDate[app.date] += 1;

				// Calculate Revenue only for Completed appointments
				if (app.status === 'Completed') {
					const service = serviceList.find((s) => s.id === app.serviceId);
					if (service) {
						if (stats.revenueByStaff[app.staffId] !== undefined) {
							stats.revenueByStaff[app.staffId] += service.price;
						}
						if (stats.revenueByService[app.serviceId] !== undefined) {
							stats.revenueByService[app.serviceId] += service.price;
						}
					}
				}
			});

			resolve(stats);
		}, 100);
	});
};
