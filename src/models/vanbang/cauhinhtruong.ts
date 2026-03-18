import useInitLocalService from '@/hooks/useInitLocalService';
import useInitModel from '@/hooks/useInitModel';
import { localDbRead, localDbWrite, normalizeIdRecord } from '@/utils/localDb';

const STORAGE_NS = 'vanbang.cauhinhtruong';

const toSnakeCaseId = (input: string) =>
	(input ?? '')
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');

export default () => {
	const localService = useInitLocalService(STORAGE_NS);
	const objInit = useInitModel<VanBang.ICauHinhTruong>(STORAGE_NS, 'condition', undefined, undefined, { thuTu: 1 }, [], localService);

	const postCauHinh = async (payload: Pick<VanBang.ICauHinhTruong, 'tenTruong' | 'kieuDuLieu'>) => {
		const tenTruong = payload?.tenTruong?.trim?.() ?? '';
		const id = toSnakeCaseId(tenTruong);
		const rows = (localDbRead<any[]>(STORAGE_NS, []) ?? []).map((r) => normalizeIdRecord(r));
		const maxThuTu = rows.reduce((acc, r: any) => Math.max(acc, Number(r?.thuTu ?? 0)), 0);

		return objInit.postModel({
			id,
			tenTruong,
			kieuDuLieu: payload?.kieuDuLieu,
			thuTu: maxThuTu + 1,
		} as any);
	};

	const reorder = async (record: VanBang.ICauHinhTruong, newIndex: number) => {
		const rows = (localDbRead<any[]>(STORAGE_NS, []) ?? []).map((r) => normalizeIdRecord(r));
		const fromIndex = rows.findIndex((r: any) => (r?.id ?? r?._id) === (record?.id ?? (record as any)?._id));
		if (fromIndex < 0) return;

		const next = [...rows];
		const [moved] = next.splice(fromIndex, 1);
		next.splice(newIndex, 0, moved);
		const normalized = next.map((r: any, idx: number) => ({ ...r, thuTu: idx + 1 }));
		localDbWrite(STORAGE_NS, normalized);
		objInit.setDanhSach(normalized as any);
		return normalized;
	};

	return {
		...objInit,
		STORAGE_NS,
		postCauHinh,
		reorder,
	};
};

