import { message } from 'antd';
import { useState } from 'react';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';

const LOCAL_STORAGE_KEY = 'QUAN_LY_KHOA_HOC_DATA';

const useQuanLyKhoaHocModel = <T extends KhoaHoc.IRecord>() => {
	const [danhSach, setDanhSach] = useState<T[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [total, setTotal] = useState<number>(0);
	const [visibleForm, setVisibleForm] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const [record, setRecord] = useState<T | undefined>(undefined);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [condition, setCondition] = useState<Partial<T>>({});

	/**
	 * Helper to read from localStorage
	 */
	const getFromStorage = (): T[] => {
		const data = localStorage.getItem(LOCAL_STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	};

	/**
	 * Helper to save to localStorage
	 */
	const saveToStorage = (data: T[]) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
	};

	/**
	 * Get Pageable Model (Simulated)
	 * @param paramCondition Filter condition
	 * @param paramPage Current page
	 * @param paramLimit Records per page
	 */
	const getModel = async (paramCondition?: Partial<T>, paramPage?: number, paramLimit?: number) => {
		setLoading(true);
		try {
			const curPage = paramPage || page;
			const curLimit = paramLimit || limit;
			const curCondition = paramCondition || condition;

			let data = getFromStorage();

			// Search by tenKhoaHoc
			if (curCondition?.tenKhoaHoc) {
				data = data.filter((item) =>
					item.tenKhoaHoc.toLowerCase().includes(curCondition.tenKhoaHoc!.toLowerCase()),
				);
			}

			// Filter by idGiangVien
			if (curCondition?.idGiangVien) {
				data = data.filter((item) => item.idGiangVien === curCondition.idGiangVien);
			}

			// Filter by trangThai
			if (curCondition?.trangThai) {
				data = data.filter((item) => item.trangThai === curCondition.trangThai);
			}

			setTotal(data.length);

			// Pagination
			const pagedData = data.slice((curPage - 1) * curLimit, curPage * curLimit);
			setDanhSach(pagedData as T[]);

			return pagedData;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Create new record
	 */
	const postModel = async (payload: Partial<T>) => {
		setLoading(true);
		try {
			const data = getFromStorage();
			// Check duplicate name (validating tenKhoaHoc)
			if (data.some((item) => item.tenKhoaHoc === payload.tenKhoaHoc)) {
				message.error('Tên khóa học đã tồn tại!');
				return Promise.reject('Duplicate name');
			}

			const newRecord = { ...payload, _id: Date.now().toString() } as T;
			data.push(newRecord);
			saveToStorage(data);
			message.success('Thêm mới thành công');
			setVisibleForm(false);
			getModel();
			return newRecord;
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Update existing record
	 */
	const putModel = async (id: string, payload: Partial<T>) => {
		setLoading(true);
		try {
			const data = getFromStorage();
			// Check duplicate name except current record
			if (data.some((item) => item.tenKhoaHoc === payload.tenKhoaHoc && item._id !== id)) {
				message.error('Tên khóa học đã tồn tại!');
				return Promise.reject('Duplicate name');
			}

			const index = data.findIndex((item) => item._id === id);
			if (index !== -1) {
				data[index] = { ...data[index], ...payload, _id: id } as T;
				saveToStorage(data);
				message.success('Cập nhật thành công');
				setVisibleForm(false);
				getModel();
				return data[index];
			}
			return Promise.reject('Record not found');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Delete record
	 */
	const deleteModel = async (id: string) => {
		setLoading(true);
		try {
			const data = getFromStorage();
			const recordToDelete = data.find((item) => item._id === id);
			// Delete condition (check soLuongHocVien === 0)
			if (recordToDelete && recordToDelete.soLuongHocVien > 0) {
				message.error('Không thể xóa khóa học đã có học viên!');
				return Promise.reject('Course has students');
			}

			const newData = data.filter((item) => item._id !== id);
			saveToStorage(newData);
			message.success('Xóa thành công');

			const maxPage = Math.ceil((total - 1) / limit) || 1;
			let newPage = page;
			if (newPage > maxPage) {
				newPage = maxPage;
				setPage(newPage);
			}

			getModel(undefined, newPage);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(true);
		setVisibleForm(true);
	};

	const handleView = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(false);
		setVisibleForm(true);
	};

	return {
		danhSach,
		loading,
		total,
		visibleForm,
		setVisibleForm,
		edit,
		setEdit,
		record,
		setRecord,
		page,
		setPage,
		limit,
		setLimit,
		condition,
		setCondition,
		getModel,
		postModel,
		putModel,
		deleteModel,
		handleEdit,
		handleView,
	};
};

export default useQuanLyKhoaHocModel;
