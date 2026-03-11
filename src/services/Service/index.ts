export interface ServiceRecord {
	id: string;
	name: string;
	price: number;
	durationMinutes: number;
}

const STORAGE_KEY = 'service_data';

export const getServiceData = async (): Promise<{ data: ServiceRecord[] }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
			resolve({ data });
		}, 100);
	});
};

export const saveServiceData = async (data: ServiceRecord[]): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			resolve();
		}, 100);
	});
};
