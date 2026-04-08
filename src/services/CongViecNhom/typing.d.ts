declare module CongViecNhom {
	export interface Task {
		id: string;
		tenCongViec: string;
		nguoiDuocGiao: string;
		mucDoUuTien: 'low' | 'medium' | 'high';
		thoiHan: string;
		trangThai: 'pending' | 'progress' | 'done';
	}
}
