import useInitLocalService from '@/hooks/useInitLocalService';
import useInitModel from '@/hooks/useInitModel';

const STORAGE_NS = 'vanbang.sovanbang';

export default () => {
	const localService = useInitLocalService(STORAGE_NS);
	const objInit = useInitModel<VanBang.ISoVanBang>(STORAGE_NS, 'condition', undefined, undefined, { tenSo: 1 }, [], localService);

	const moSoMoi = async (tenSo: string) => {
		const payload: Partial<VanBang.ISoVanBang> = {
			tenSo: tenSo?.trim?.() ?? '',
			soHienTai: 1,
			trangThai: 'ĐANG_MỞ',
		};
		return objInit.postModel(payload as any);
	};

	const tangSoHienTai = async (idSo: string, by = 1) => {
		const so = await objInit.getByIdModel(idSo, false);
		const soHienTai = (so?.soHienTai ?? 1) + by;
		return objInit.putModel(idSo, { soHienTai } as any, undefined, true, false, 'Cập nhật sổ');
	};

	return {
		...objInit,
		STORAGE_NS,
		moSoMoi,
		tangSoHienTai,
	};
};

