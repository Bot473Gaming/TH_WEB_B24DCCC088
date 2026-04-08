import { SESSION_USER_KEY, STORAGE_TASKS_KEY } from './constant';

const safeParse = (raw: string | null): CongViecNhom.Task[] => {
	if (!raw) return [];
	try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v : [];
	} catch {
		return [];
	}
};

export const loadTasks = (): CongViecNhom.Task[] => {
	return safeParse(localStorage.getItem(STORAGE_TASKS_KEY));
};

export const saveTasks = (tasks: CongViecNhom.Task[]) => {
	localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks));
};

export const getSessionUser = (): string | null => {
	return sessionStorage.getItem(SESSION_USER_KEY);
};

export const setSessionUser = (username: string) => {
	sessionStorage.setItem(SESSION_USER_KEY, username.trim());
};

export const clearSessionUser = () => {
	sessionStorage.removeItem(SESSION_USER_KEY);
};

export const createTaskId = () => {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};
