import type { KhoaHoc } from './typing';

export enum ETrangThai {
	DANG_MO = 'DANG_MO',
	DA_KET_THUC = 'DA_KET_THUC',
	TAM_DUNG = 'TAM_DUNG',
}

export const TRANG_THAI_LABEL = {
	[ETrangThai.DANG_MO]: 'Đang mở',
	[ETrangThai.DA_KET_THUC]: 'Đã kết thúc',
	[ETrangThai.TAM_DUNG]: 'Tạm dừng',
};

export const DANH_SACH_GIANG_VIEN: KhoaHoc.IGiangVien[] = [
	{ _id: '1', hoTen: 'Nguyễn Văn A' },
	{ _id: '2', hoTen: 'Trần Thị B' },
	{ _id: '3', hoTen: 'Lê Văn C' },
];
