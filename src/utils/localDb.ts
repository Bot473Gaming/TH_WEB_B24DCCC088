type TId = string | number;

const safeJsonParse = <T,>(value: string | null, fallback: T): T => {
	if (!value) return fallback;
	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
};

export const localDbKey = (ns: string) => `localdb.${ns}`;

export const localDbRead = <T,>(ns: string, fallback: T): T => {
	return safeJsonParse<T>(localStorage.getItem(localDbKey(ns)), fallback);
};

export const localDbWrite = (ns: string, data: any) => {
	localStorage.setItem(localDbKey(ns), JSON.stringify(data ?? null));
};

export const normalizeIdRecord = <T extends Record<string, any>>(rec: T): T => {
	if (rec && rec.id && !rec._id) return { ...rec, _id: rec.id };
	if (rec && rec._id && !rec.id) return { ...rec, id: rec._id };
	return rec;
};

export const findById = <T extends Record<string, any>>(rows: T[], id: TId) => {
	return (rows ?? []).find((r: any) => (r?.id ?? r?._id) === id) as T | undefined;
};

