import useInitLocalService from '@/hooks/useInitLocalService';
import useInitModel from '@/hooks/useInitModel';
import { findById, localDbRead, localDbWrite, normalizeIdRecord } from '@/utils/localDb';

const NS_VANBANG = 'vanbang.vanbang';
const NS_QD = 'vanbang.quyetdinh';
const NS_SO = 'vanbang.sovanbang';

export default () => {
	const localService = useInitLocalService(NS_VANBANG);
	const objInit = useInitModel<VanBang.IVanBang>(NS_VANBANG, 'condition', undefined, undefined, { soVaoSo: -1 }, [], localService);

	const taoVanBang = async (
		payload: Omit<VanBang.IVanBang, 'id' | 'soVaoSo'> & { soVaoSo?: number },
	): Promise<VanBang.IVanBang> => {
		const qds = (localDbRead<any[]>(NS_QD, []) ?? []).map((r) => normalizeIdRecord(r));
		const sos = (localDbRead<any[]>(NS_SO, []) ?? []).map((r) => normalizeIdRecord(r));

		const qd = findById(qds, payload?.idQuyetDinh) as any;
		if (!qd?.id) return Promise.reject('Quyết định không hợp lệ');

		const so = findById(sos, qd?.idSoVanBang) as any;
		if (!so?.id) return Promise.reject('Sổ văn bằng không hợp lệ');
		if (so?.trangThai !== 'ĐANG_MỞ') return Promise.reject('Sổ văn bằng đã chốt');

		const soVaoSo = payload?.soVaoSo ?? (so?.soHienTai ?? 1);

		const created = await objInit.postModel({
			...payload,
			soVaoSo,
			truongDong: payload?.truongDong ?? {},
		} as any);

		// tăng số hiện tại của sổ
		const updatedSos = sos.map((s: any) => {
			if ((s?.id ?? s?._id) !== (so?.id ?? so?._id)) return s;
			return { ...s, soHienTai: (s?.soHienTai ?? 1) + 1 };
		});
		localDbWrite(NS_SO, updatedSos);

		return created as any;
	};

	return {
		...objInit,
		NS_VANBANG,
		taoVanBang,
	};
};

