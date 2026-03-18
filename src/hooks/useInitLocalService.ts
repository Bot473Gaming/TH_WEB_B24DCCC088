import type { TFilter } from '@/components/Table/typing';
import { EOperatorType } from '@/components/Table/constant';

type TId = string | number;

type TSort<T> = { [k in keyof T]?: 1 | -1 };

type TListResponse<T> = { data: { data: T[] } };
type TPageResponse<T> = { data: { data: { result: T[]; total: number } } };
type TOneResponse<T> = { data: { data: T | null } };

const safeJsonParse = <T,>(value: string | null, fallback: T): T => {
	if (!value) return fallback;
	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
};

const normalizeRecord = <T extends Record<string, any>>(rec: T): T => {
	if (rec && rec.id && !rec._id) return { ...rec, _id: rec.id };
	if (rec && rec._id && !rec.id) return { ...rec, id: rec._id };
	return rec;
};

const getFieldValue = (obj: any, field: any) => {
	if (!obj) return undefined;
	if (Array.isArray(field)) return field.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
	if (typeof field === 'string' && field.includes('.'))
		return field.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
	return obj[field];
};

const applyCondition = <T extends Record<string, any>>(list: T[], condition?: Partial<T>) => {
	if (!condition) return list;
	const entries = Object.entries(condition).filter(([, v]) => v !== undefined && v !== null && v !== '');
	if (!entries.length) return list;
	return list.filter((item) =>
		entries.every(([k, v]) => {
			const cur = (item as any)?.[k];
			if (Array.isArray(v)) return v.includes(cur);
			return cur === v;
		}),
	);
};

const applyFilters = <T extends Record<string, any>>(list: T[], filters?: TFilter<T>[]) => {
	if (!filters?.length) return list;
	const activeFilters = filters.filter((f) => f?.active !== false);
	if (!activeFilters.length) return list;

	return list.filter((item) =>
		activeFilters.every((f) => {
			const val = getFieldValue(item, f.field as any);
			const values = (f.values ?? []).filter((v) => v !== undefined && v !== null);

			switch (f.operator) {
				case EOperatorType.CONTAIN: {
					const needle = (values?.[0] ?? '')?.toString()?.toLowerCase?.() ?? '';
					if (!needle) return true;
					return (val ?? '')?.toString?.()?.toLowerCase?.()?.includes?.(needle) ?? false;
				}
				case EOperatorType.INCLUDE: {
					if (!values.length) return true;
					return values.includes(val);
				}
				default: {
					if (!values.length) return true;
					return values.includes(val);
				}
			}
		}),
	);
};

const applySort = <T extends Record<string, any>>(list: T[], sort?: TSort<T>) => {
	if (!sort) return list;
	const entries = Object.entries(sort).filter(([, v]) => v === 1 || v === -1);
	if (!entries.length) return list;

	const [field, direction] = entries[0] as [string, 1 | -1];
	const dir = direction ?? 1;
	return [...list].sort((a: any, b: any) => {
		const va = getFieldValue(a, field);
		const vb = getFieldValue(b, field);
		if (va == null && vb == null) return 0;
		if (va == null) return -1 * dir;
		if (vb == null) return 1 * dir;
		if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
		return va.toString().localeCompare(vb.toString()) * dir;
	});
};

const ensureId = (id?: TId) => (id ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`) as string;

const useInitLocalService = (url: string) => {
	const storageKey = `localdb.${url}`;

	const readAll = <T extends Record<string, any>>(): T[] => {
		const raw = safeJsonParse<any[]>(localStorage.getItem(storageKey), []);
		return (raw ?? []).map((r) => normalizeRecord(r));
	};

	const writeAll = (rows: any[]) => {
		localStorage.setItem(storageKey, JSON.stringify(rows ?? []));
	};

	const getService = async <T extends Record<string, any>>(
		payload: { page?: number; limit?: number; condition?: any; cond?: any; sort?: any; filters?: any; select?: string },
		path?: string,
		_isAbsolutePath?: boolean,
	): Promise<TPageResponse<T> | TOneResponse<T>> => {
		const p = path ?? 'page';
		const page = payload?.page ?? 1;
		const limit = payload?.limit ?? 10;
		const condition = payload?.condition ?? payload?.cond;
		const filters = payload?.filters as TFilter<T>[] | undefined;
		const sort = payload?.sort as TSort<T> | undefined;

		let rows = readAll<T>();
		rows = applyCondition(rows, condition);
		rows = applyFilters(rows, filters);
		rows = applySort(rows, sort);

		if (p === 'one') {
			return { data: { data: rows?.[0] ?? null } };
		}

		const total = rows.length;
		const start = (page - 1) * limit;
		const result = limit ? rows.slice(start, start + limit) : rows;
		return { data: { data: { result, total } } };
	};

	const getAllService = async <T extends Record<string, any>>(
		payload?: { condition?: any; sort?: any; filters?: any },
		path?: string,
	): Promise<TListResponse<T>> => {
		const p = path ?? 'many';
		if (p !== 'many') {
		}

		let rows = readAll<T>();
		rows = applyCondition(rows, payload?.condition);
		rows = applyFilters(rows, payload?.filters);
		rows = applySort(rows, payload?.sort);
		return { data: { data: rows } };
	};

	const getByIdService = async <T extends Record<string, any>>(id: TId): Promise<TOneResponse<T>> => {
		const rows = readAll<T>();
		const found = rows.find((r: any) => r?.id === id || r?._id === id) ?? null;
		return { data: { data: found } };
	};

	const postService = async <T extends Record<string, any>>(payload: any): Promise<TOneResponse<T>> => {
		const rows = readAll<T>();
		const newId = ensureId(payload?.id ?? payload?._id);
		const record = normalizeRecord({ ...payload, id: newId, _id: newId });
		writeAll([...rows, record]);
		return { data: { data: record } };
	};

	const putService = async <T extends Record<string, any>>(id: TId, payload: any): Promise<TOneResponse<T>> => {
		const rows = readAll<T>();
		const finalId = id ?? payload?.id ?? payload?._id;
		const next = rows.map((r: any) => {
			const rid = r?.id ?? r?._id;
			if (rid !== finalId) return r;
			return normalizeRecord({ ...r, ...payload, id: rid, _id: rid });
		});
		writeAll(next);
		const updated = next.find((r: any) => (r?.id ?? r?._id) === finalId) ?? null;
		return { data: { data: updated } };
	};

	const putManyService = async <T extends Record<string, any>>(ids: TId[], update: any): Promise<TListResponse<T>> => {
		const rows = readAll<T>();
		const idSet = new Set((ids ?? []).map((x) => x?.toString?.() ?? String(x)));
		const next = rows.map((r: any) => {
			const rid = (r?.id ?? r?._id)?.toString?.() ?? '';
			if (!idSet.has(rid)) return r;
			return normalizeRecord({ ...r, ...update, id: r?.id ?? r?._id, _id: r?._id ?? r?.id });
		});
		writeAll(next);
		return { data: { data: next.filter((r: any) => idSet.has((r?.id ?? r?._id)?.toString?.() ?? '')) } };
	};

	const deleteService = async (id: TId) => {
		const rows = readAll<any>();
		const next = rows.filter((r: any) => (r?.id ?? r?._id) !== id);
		writeAll(next);
		return { data: { data: true } };
	};

	const deleteManyService = async (ids: TId[]) => {
		const rows = readAll<any>();
		const idSet = new Set((ids ?? []).map((x) => x?.toString?.() ?? String(x)));
		const next = rows.filter((r: any) => !idSet.has(((r?.id ?? r?._id) as any)?.toString?.() ?? ''));
		writeAll(next);
		return { data: { data: true } };
	};

	// các hàm import/export definition không dùng trong module này
	const getImportHeaders = async () => ({ data: { data: [] } });
	const getImportTemplate = async () => ({ data: null });
	const postValidateImport = async () => ({ data: { data: [] } });
	const postExecuteImport = async () => ({ data: { data: [] } });
	const getExportFields = async () => ({ data: { data: [] } });
	const postExport = async () => ({ data: null });

	return {
		getService,
		getAllService,
		getByIdService,
		postService,
		putService,
		putManyService,
		deleteService,
		deleteManyService,
		getImportHeaders,
		getImportTemplate,
		postValidateImport,
		postExecuteImport,
		getExportFields,
		postExport,
	};
};

export default useInitLocalService;

