import { getStaffData, saveStaffData, StaffRecord } from '@/services/Staff';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<StaffRecord[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<StaffRecord>();

	const getDataStaff = async () => {
		const res = await getStaffData();
		setData(res?.data ?? []);
	};

	const addStaff = async (staff: StaffRecord) => {
		const newData = [...data, staff];
		await saveStaffData(newData);
		setData(newData);
	};

	const editStaff = async (staff: StaffRecord) => {
		const newData = data.map((item) => (item.id === staff.id ? staff : item));
		await saveStaffData(newData);
		setData(newData);
	};

	const deleteStaff = async (id: string) => {
		const newData = data.filter((item) => item.id !== id);
		await saveStaffData(newData);
		setData(newData);
	};

	return {
		data,
		visible,
		setVisible,
		row,
		setRow,
		isEdit,
		setIsEdit,
		setData,
		getDataStaff,
		addStaff,
		editStaff,
		deleteStaff,
	};
};
