export interface AppointmentRecord {
	id: string;
	customerName: string;
	staffId: string;
	serviceId: string;
	date: string; // YYYY-MM-DD
	time: string; // HH:mm
	status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

const STORAGE_KEY = 'appointment_data';

export const getAppointmentData = async (): Promise<{ data: AppointmentRecord[] }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
			resolve({ data });
		}, 100);
	});
};

export const saveAppointmentData = async (data: AppointmentRecord[]): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			resolve();
		}, 100);
	});
};
