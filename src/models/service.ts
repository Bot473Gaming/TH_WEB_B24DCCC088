import { getServiceData, saveServiceData, ServiceRecord } from '@/services/Service';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<ServiceRecord[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<ServiceRecord>();

	const getDataService = async () => {
		const res = await getServiceData();
		setData(res?.data ?? []);
	};

	const addService = async (service: ServiceRecord) => {
		const newData = [...data, service];
		await saveServiceData(newData);
		setData(newData);
	};

	const editService = async (service: ServiceRecord) => {
		const newData = data.map((item) => (item.id === service.id ? service : item));
		await saveServiceData(newData);
		setData(newData);
	};

	const deleteService = async (id: string) => {
		const newData = data.filter((item) => item.id !== id);
		await saveServiceData(newData);
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
		getDataService,
		addService,
		editService,
		deleteService,
	};
};
