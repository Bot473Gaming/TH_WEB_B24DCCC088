import { ETrangThai } from './constant';

declare module KhoaHoc {
	export interface IRecord {
		_id: string;
		tenKhoaHoc: string; // Max 100 ký tự
		idGiangVien: string;
		soLuongHocVien: number;
		trangThai: ETrangThai;
		moTa: string; // HTML string
	}

	export interface IGiangVien {
		_id: string;
		hoTen: string;
	}
}
