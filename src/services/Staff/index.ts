export interface StaffRecord {
	id: string;
	name: string;
	role: string;
	dailyLimit: number;
	startTime: string; // e.g., '09:00'
	endTime: string;   // e.g., '17:00'
	workingDays: string[]; // e.g., ['Monday', 'Tuesday']
}

const STORAGE_KEY = 'staff_data';

export const getStaffData = async (): Promise<{ data: StaffRecord[] }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
			resolve({ data });
		}, 100);
	});
};

export const saveStaffData = async (data: StaffRecord[]): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			resolve();
		}, 100);
	});
};
