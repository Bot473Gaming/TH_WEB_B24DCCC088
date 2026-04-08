import {
	clearSessionUser,
	createTaskId,
	getSessionUser,
	loadTasks,
	saveTasks,
	setSessionUser,
} from '@/services/CongViecNhom';
import { useCallback, useState } from 'react';

export default () => {
	const [tasks, setTasksState] = useState<CongViecNhom.Task[]>([]);
	const [currentUser, setCurrentUserState] = useState<string | null>(() => getSessionUser());

	const refreshTasks = useCallback(() => {
		setTasksState(loadTasks());
	}, []);

	const refreshUser = useCallback(() => {
		setCurrentUserState(getSessionUser());
	}, []);

	const persistTasks = useCallback((next: CongViecNhom.Task[]) => {
		saveTasks(next);
		setTasksState(next);
	}, []);

	const login = useCallback(
		(username: string) => {
			setSessionUser(username);
			setCurrentUserState(getSessionUser());
		},
		[setCurrentUserState],
	);

	const logout = useCallback(() => {
		clearSessionUser();
		setCurrentUserState(null);
	}, []);

	const addTask = useCallback(
		(payload: Omit<CongViecNhom.Task, 'id'>) => {
			const next: CongViecNhom.Task[] = [
				...loadTasks(),
				{ ...payload, id: createTaskId() },
			];
			persistTasks(next);
		},
		[persistTasks],
	);

	const updateTask = useCallback(
		(id: string, payload: Partial<Omit<CongViecNhom.Task, 'id'>>) => {
			const next = loadTasks().map((t) =>
				t.id === id ? { ...t, ...payload } : t,
			);
			persistTasks(next);
		},
		[persistTasks],
	);

	const removeTask = useCallback(
		(id: string) => {
			const next = loadTasks().filter((t) => t.id !== id);
			persistTasks(next);
		},
		[persistTasks],
	);

	return {
		tasks,
		currentUser,
		refreshTasks,
		refreshUser,
		login,
		logout,
		addTask,
		updateTask,
		removeTask,
	};
};
