const STORAGE_KEY = 'clb_caulacbo_data';

export interface ICauLacBo {
	id: string;
	tenCLB: string;
	ngayThanhLap: string;
	moTa: string;
	chuNhiem: string;
	hoatDong: boolean;
	anhDaiDien?: string;
}

export const getAll = (): ICauLacBo[] => {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getById = (id: string): ICauLacBo | undefined => {
	return getAll().find((item) => item.id === id);
};

export const create = (data: Omit<ICauLacBo, 'id'>): ICauLacBo => {
	const list = getAll();
	const newItem: ICauLacBo = {
		...data,
		id: Date.now().toString(),
	};
	list.unshift(newItem);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
	return newItem;
};

export const update = (id: string, data: Partial<ICauLacBo>): void => {
	const list = getAll();
	const index = list.findIndex((item) => item.id === id);
	if (index !== -1) {
		list[index] = { ...list[index], ...data };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
	}
};

export const remove = (id: string): void => {
	const list = getAll().filter((item) => item.id !== id);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
