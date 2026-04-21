import { message } from 'antd';
import { useState } from 'react';
import { type TFilter } from '@/components/Table/typing';
import type { KhoaHoc } from '@/services/QuanLyKhoaHoc/typing';

const LOCAL_STORAGE_KEY = 'QUAN_LY_HOC_VIEN_DATA';

const QuanLyHocVienModel = <T extends KhoaHoc.IHocVien>() => {
	const [danhSach, setDanhSach] = useState<T[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [total, setTotal] = useState<number>(0);
	const [visibleForm, setVisibleForm] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const [isView, setIsView] = useState<boolean>(false);
	const [record, setRecord] = useState<T | undefined>(undefined);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [condition, setCondition] = useState<Partial<T>>({});
	const [filters, setFilters] = useState<TFilter<T>[]>([]);
	const [initFilter] = useState<TFilter<T>[]>([]);
	const [sort, setSort] = useState<any>(undefined);
	const [selectedIds, setSelectedIds] = useState<string[] | undefined>(undefined);

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
	 * Get Pageable Model
	 */
	const getModel = async (paramCondition?: Partial<T>, paramPage?: number, paramLimit?: number) => {
		setLoading(true);
		try {
			const curPage = paramPage || page;
			const curLimit = paramLimit || limit;
			const curCondition = paramCondition || condition;

			let data = getFromStorage();

			// Apply Search & Filters
			if (curCondition?.hoTen) {
				data = data.filter((item) =>
					item.hoTen.toLowerCase().includes(curCondition.hoTen!.toLowerCase()),
				);
			}

			if (curCondition?.idKhoaHoc) {
				data = data.filter((item) => item.idKhoaHoc === curCondition.idKhoaHoc);
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
	 * Get All Model (Without pagination)
	 */
	const getAllModel = async () => {
		setLoading(true);
		try {
			const data = getFromStorage();
			setDanhSach(data as T[]);
			return data;
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
			if (data.some((item) => item.maHocVien === payload.maHocVien)) {
				message.error('Mã học viên đã tồn tại!');
				return Promise.reject('Duplicate code');
			}

			const newRecord = { ...payload, _id: Date.now().toString() } as T;
			data.push(newRecord);
			saveToStorage(data);
			message.success('Thêm mới học viên thành công');
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
			const index = data.findIndex((item) => item._id === id);
			if (index !== -1) {
				data[index] = { ...data[index], ...payload, _id: id } as T;
				saveToStorage(data);
				message.success('Cập nhật học viên thành công');
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
			const newData = data.filter((item) => item._id !== id);
			saveToStorage(newData);
			message.success('Xóa học viên thành công');
			getModel();
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(true);
		setIsView(false);
		setVisibleForm(true);
	};

	const handleView = (rec?: T) => {
		if (rec) setRecord(rec);
		setEdit(false);
		setIsView(true);
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
		isView,
		setIsView,
		record,
		setRecord,
		page,
		setPage,
		limit,
		setLimit,
		condition,
		setCondition,
		filters,
		setFilters,
		initFilter,
		sort,
		setSort,
		selectedIds,
		setSelectedIds,
		getModel,
		getAllModel,
		postModel,
		putModel,
		deleteModel,
		handleEdit,
		handleView,
	};
};

export default QuanLyHocVienModel;
