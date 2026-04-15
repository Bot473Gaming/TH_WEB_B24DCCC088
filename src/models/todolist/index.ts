import { useEffect, useState } from 'react';
import { getTodoList, saveTodoList } from '@/services/TodoList';

// Định nghĩa kiểu Todo
export interface Todo {
	id: number;
	title: string;
}

// Model quản lý todo list
export default () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [input, setInput] = useState<string>('');

	// Load từ localStorage
	useEffect(() => {
		setTodos(getTodoList());
	}, []);

	// Lưu vào localStorage
	useEffect(() => {
		saveTodoList(todos);
	}, [todos]);

	// Thêm hoặc cập nhật todo
	const handleAddOrEdit = () => {
		if (!input.trim()) return;

		if (editingId !== null) {
			setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, title: input } : todo)));
			setEditingId(null);
		} else {
			setTodos([...todos, { id: Date.now(), title: input }]);
		}

		setInput('');
	};

	// Sửa todo
	const handleEdit = (todo: Todo) => {
		setInput(todo.title);
		setEditingId(todo.id);
	};

	// Xóa todo
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return {
		todos,
		input,
		editingId,
		setInput,
		handleAddOrEdit,
		handleEdit,
		handleDelete,
	};
};
