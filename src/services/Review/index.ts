export interface ReviewRecord {
	id: string;
	appointmentId: string;
	staffId: string;
	customerName: string;
	rating: number; // 1 to 5
	comment: string;
	staffReply?: string;
}

const STORAGE_KEY = 'review_data';

export const getReviewData = async (): Promise<{ data: ReviewRecord[] }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
			resolve({ data });
		}, 100);
	});
};

export const saveReviewData = async (data: ReviewRecord[]): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			resolve();
		}, 100);
	});
};
