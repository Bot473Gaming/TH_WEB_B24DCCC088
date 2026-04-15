import { useState } from 'react';
import * as CLBService from '@/services/CauLacBo/cauLacBo';
import type { ICauLacBo } from '@/services/CauLacBo/cauLacBo';

export default () => {
	const [data, setData] = useState<ICauLacBo[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<ICauLacBo | undefined>();
	const [visibleMembers, setVisibleMembers] = useState<boolean>(false);
	const [selectedClbId, setSelectedClbId] = useState<string | undefined>();

	const getData = () => {
		setData(CLBService.getAll());
	};

	const themMoi = (values: Omit<ICauLacBo, 'id'>) => {
		CLBService.create(values);
		getData();
	};

	const capNhat = (id: string, values: Partial<ICauLacBo>) => {
		CLBService.update(id, values);
		getData();
	};

	const xoa = (id: string) => {
		CLBService.remove(id);
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
		visibleMembers,
		setVisibleMembers,
		selectedClbId,
		setSelectedClbId,
		getData,
		themMoi,
		capNhat,
		xoa,
	};
};
