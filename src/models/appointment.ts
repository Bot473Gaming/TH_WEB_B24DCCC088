import { AppointmentRecord, getAppointmentData, saveAppointmentData } from '@/services/Appointment';
import { getStaffData } from '@/services/Staff';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<AppointmentRecord[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<AppointmentRecord>();

	const getDataAppointment = async () => {
		const res = await getAppointmentData();
		setData(res?.data ?? []);
	};

	const addAppointment = async (appointment: AppointmentRecord) => {
		// Validate Staff Limit
		const staffRes = await getStaffData();
		const staffMember = staffRes.data.find((s) => s.id === appointment.staffId);
		
		if (staffMember) {
			const sameDayApps = data.filter(
				(a) => a.staffId === appointment.staffId && a.date === appointment.date && a.status !== 'Cancelled'
			);
			
			if (sameDayApps.length >= staffMember.dailyLimit) {
				message.error(`Nhân viên đã đạt đến giới hạn ${staffMember.dailyLimit} lịch hẹn trong ngày.`);
				return false;
			}
			
			// Validate conflict
			const conflict = sameDayApps.find((a) => a.time === appointment.time);
			if (conflict) {
				message.error(`Nhân viên đã có lịch hẹn vào lúc ${appointment.time}.`);
				return false;
			}
		}

		const newData = [...data, appointment];
		await saveAppointmentData(newData);
		setData(newData);
		message.success('Đặt lịch thành công');
		return true;
	};

	const editAppointment = async (appointment: AppointmentRecord) => {
		const newData = data.map((item) => (item.id === appointment.id ? appointment : item));
		await saveAppointmentData(newData);
		setData(newData);
		message.success('Cập nhật lịch thành công');
		return true;
	};

	const updateStatus = async (id: string, status: AppointmentRecord['status']) => {
		const newData = data.map((item) => (item.id === id ? { ...item, status } : item));
		await saveAppointmentData(newData);
		setData(newData);
		message.success(`Cập nhận trạng thái ${status}`);
	};

	const deleteAppointment = async (id: string) => {
		const newData = data.filter((item) => item.id !== id);
		await saveAppointmentData(newData);
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
		getDataAppointment,
		addAppointment,
		editAppointment,
		updateStatus,
		deleteAppointment,
	};
};
