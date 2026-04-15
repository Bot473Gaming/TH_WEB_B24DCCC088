const STORAGE_KEY = 'clb_dangky_data';
const HISTORY_KEY = 'clb_lichsu_data';

export type TrangThaiDangKy = 'Pending' | 'Approved' | 'Rejected';
export type GioiTinh = 'Nam' | 'Nu' | 'Khac';

export interface IDangKyThanhVien {
	id: string;
	hoTen: string;
	email: string;
	sdt: string;
	gioiTinh: GioiTinh;
	diaChi: string;
	soTruong: string;
	cauLacBoId: string;
	lyDoDangKy: string;
	trangThai: TrangThaiDangKy;
	ghiChu?: string;
	ngayDangKy: string;
}

export interface ILichSuThaotac {
	id: string;
	dangKyId: string;
	hanhDong: 'Approved' | 'Rejected' | 'Updated' | 'Created';
	lyDo?: string;
	thoiGian: string;
	nguoiThucHien: string;
}

// ---- DangKy CRUD ----

export const getAll = (): IDangKyThanhVien[] => {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getApproved = (): IDangKyThanhVien[] => {
	return getAll().filter((item) => item.trangThai === 'Approved');
};

export const getByCLB = (cauLacBoId: string): IDangKyThanhVien[] => {
	return getAll().filter((item) => item.cauLacBoId === cauLacBoId);
};

export const getApprovedByCLB = (cauLacBoId: string): IDangKyThanhVien[] => {
	return getAll().filter((item) => item.cauLacBoId === cauLacBoId && item.trangThai === 'Approved');
};

export const create = (data: Omit<IDangKyThanhVien, 'id' | 'trangThai' | 'ngayDangKy'>): IDangKyThanhVien => {
	const list = getAll();
	const newItem: IDangKyThanhVien = {
		...data,
		id: Date.now().toString(),
		trangThai: 'Pending',
		ngayDangKy: new Date().toISOString(),
	};
	list.unshift(newItem);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
	addLichSu({
		dangKyId: newItem.id,
		hanhDong: 'Created',
		thoiGian: newItem.ngayDangKy,
		nguoiThucHien: 'Admin',
	});
	return newItem;
};

export const update = (id: string, data: Partial<IDangKyThanhVien>): void => {
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

export const duyetDon = (id: string): void => {
	update(id, { trangThai: 'Approved', ghiChu: '' });
	addLichSu({
		dangKyId: id,
		hanhDong: 'Approved',
		thoiGian: new Date().toISOString(),
		nguoiThucHien: 'Admin',
	});
};

export const tuChoiDon = (id: string, lyDo: string): void => {
	update(id, { trangThai: 'Rejected', ghiChu: lyDo });
	addLichSu({
		dangKyId: id,
		hanhDong: 'Rejected',
		lyDo,
		thoiGian: new Date().toISOString(),
		nguoiThucHien: 'Admin',
	});
};

export const doiCLB = (ids: string[], cauLacBoId: string): void => {
	const list = getAll();
	ids.forEach((id) => {
		const index = list.findIndex((item) => item.id === id);
		if (index !== -1) {
			list[index] = { ...list[index], cauLacBoId };
		}
	});
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

// ---- Lịch sử thao tác ----

export const getAllLichSu = (): ILichSuThaotac[] => {
	return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
};

export const getLichSuByDangKy = (dangKyId: string): ILichSuThaotac[] => {
	return getAllLichSu().filter((item) => item.dangKyId === dangKyId);
};

export const addLichSu = (data: Omit<ILichSuThaotac, 'id'>): void => {
	const list = getAllLichSu();
	const newItem: ILichSuThaotac = {
		...data,
		id: Date.now().toString() + Math.random().toString(36).slice(2),
	};
	list.unshift(newItem);
	localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
};
