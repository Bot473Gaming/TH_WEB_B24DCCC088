import type { Todo } from '@/models/todolist';

const STORAGE_KEY = 'todo_list';

// Lấy todo từ localStorage
export const getTodoList = (): Todo[] => {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
};

// Lưu todo vào localStorage
export const saveTodoList = (todos: Todo[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
