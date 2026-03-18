import useInitLocalService from '@/hooks/useInitLocalService';
import useInitModel from '@/hooks/useInitModel';

const STORAGE_NS = 'vanbang.quyetdinh';

export default () => {
	const localService = useInitLocalService(STORAGE_NS);
	const objInit = useInitModel<VanBang.IQuyetDinh>(STORAGE_NS, 'condition', undefined, undefined, { ngayBanHanh: -1 }, [], localService);

	const tangLuotTraCuu = async (idQuyetDinh: string, by = 1) => {
		if (!idQuyetDinh) return Promise.reject('idQuyetDinh is required');
		const qd = await objInit.getByIdModel(idQuyetDinh, false);
		const luotTraCuu = (qd?.luotTraCuu ?? 0) + by;
		return objInit.putModel(idQuyetDinh, { luotTraCuu } as any, undefined, true, false, 'Cập nhật lượt tra cứu');
	};

	return {
		...objInit,
		STORAGE_NS,
		tangLuotTraCuu,
	};
};

