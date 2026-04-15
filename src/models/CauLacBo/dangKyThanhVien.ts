import { useState } from 'react';
import * as DKService from '@/services/CauLacBo/dangKyThanhVien';
import type { IDangKyThanhVien, ILichSuThaotac } from '@/services/CauLacBo/dangKyThanhVien';

export default () => {
	const [data, setData] = useState<IDangKyThanhVien[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<IDangKyThanhVien | undefined>();
	const [selectedRows, setSelectedRows] = useState<IDangKyThanhVien[]>([]);
	const [visibleLichSu, setVisibleLichSu] = useState<boolean>(false);
	const [lichSuData, setLichSuData] = useState<ILichSuThaotac[]>([]);
	const [visibleReject, setVisibleReject] = useState<boolean>(false);
	const [rejectTargetIds, setRejectTargetIds] = useState<string[]>([]);

	const getData = () => {
		setData(DKService.getAll());
	};

	const themMoi = (values: Omit<IDangKyThanhVien, 'id' | 'trangThai' | 'ngayDangKy'>) => {
		DKService.create(values);
		getData();
	};

	const capNhat = (id: string, values: Partial<IDangKyThanhVien>) => {
		DKService.update(id, values);
		getData();
	};

	const xoa = (id: string) => {
		DKService.remove(id);
		getData();
	};

	const duyetDon = (id: string) => {
		DKService.duyetDon(id);
		getData();
	};

	const tuChoiDon = (id: string, lyDo: string) => {
		DKService.tuChoiDon(id, lyDo);
		getData();
	};

	const bulkDuyet = (ids: string[]) => {
		ids.forEach((id) => DKService.duyetDon(id));
		setSelectedRows([]);
		getData();
	};

	const bulkTuChoi = (ids: string[], lyDo: string) => {
		ids.forEach((id) => DKService.tuChoiDon(id, lyDo));
		setSelectedRows([]);
		getData();
	};

	const getLichSu = (dangKyId: string) => {
		const hs = DKService.getLichSuByDangKy(dangKyId);
		setLichSuData(hs);
	};

	const doiCLBThanhVien = (ids: string[], cauLacBoId: string) => {
		DKService.doiCLB(ids, cauLacBoId);
		getData();
	};

	return {
		data,
		visible,
		setVisible,
		isEdit,
		setIsEdit,
		row,
		setRow,
		selectedRows,
		setSelectedRows,
		visibleLichSu,
		setVisibleLichSu,
		lichSuData,
		visibleReject,
		setVisibleReject,
		rejectTargetIds,
		setRejectTargetIds,
		getData,
		themMoi,
		capNhat,
		xoa,
		duyetDon,
		tuChoiDon,
		bulkDuyet,
		bulkTuChoi,
		getLichSu,
		doiCLBThanhVien,
	};
};
