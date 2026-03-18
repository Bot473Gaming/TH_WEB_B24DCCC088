declare module VanBang {
	export type TTrangThaiSo = 'ĐANG_MỞ' | 'ĐÃ_CHỐT';
	export type TKieuDuLieu = 'String' | 'Number' | 'Date';

	export interface ISoVanBang {
		id: string;
		tenSo: string;
		soHienTai: number;
		trangThai: TTrangThaiSo;
	}

	export interface IQuyetDinh {
		id: string;
		soQD: string;
		ngayBanHanh: string;
		trichYeu: string;
		idSoVanBang: string;
		luotTraCuu: number;
	}

	export interface ICauHinhTruong {
		id: string;
		tenTruong: string;
		kieuDuLieu: TKieuDuLieu;
		thuTu: number;
	}

	export interface IVanBang {
		id: string;
		idQuyetDinh: string;
		soVaoSo: number;
		soHieu: string;
		msv: string;
		hoTen: string;
		ngaySinh: string;
		truongDong: Record<string, any>;
	}
}

