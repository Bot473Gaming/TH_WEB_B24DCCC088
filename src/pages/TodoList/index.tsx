import React from 'react';
import { useModel } from 'umi';
import type { Todo } from '@/models/todolist';

const TodoList: React.FC = () => {
	// Lấy state và các hàm xử lý từ model todolist
	const { todos, input, editingId, setInput, handleAddOrEdit, handleEdit, handleDelete } = useModel('todolist.index');

	return (
		<div
			style={{
				padding: 20,
				maxWidth: 500,
				margin: '0 auto',
				background: '#fff',
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
			}}
		>
			<h2 style={{ textAlign: 'center' }}>Todo List</h2>

			{/* Ô nhập công việc */}
			<div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Nhập công việc...'
					style={{
						flex: 1,
						padding: '8px 10px',
						borderRadius: 4,
						border: '1px solid #ccc',
					}}
				/>

				{/* Nút thêm / cập nhật */}
				<button
					onClick={handleAddOrEdit}
					style={{
						padding: '8px 14px',
						borderRadius: 4,
						border: 'none',
						cursor: 'pointer',
						background: '#1890ff',
						color: '#fff',
					}}
				>
					{editingId !== null ? 'Cập nhật' : 'Thêm'}
				</button>
			</div>

			{/* Danh sách todo */}
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{todos.map((todo: Todo) => (
					<li
						key={todo.id}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: 10,
							marginBottom: 10,
							borderRadius: 6,
							background: '#f5f5f5',
						}}
					>
						<span>{todo.title}</span>

						<div style={{ display: 'flex', gap: 8 }}>
							<button
								onClick={() => handleEdit(todo)}
								style={{
									padding: '6px 10px',
									borderRadius: 4,
									border: 'none',
									cursor: 'pointer',
									background: '#faad14',
									color: '#fff',
								}}
							>
								Sửa
							</button>

							<button
								onClick={() => handleDelete(todo.id)}
								style={{
									padding: '6px 10px',
									borderRadius: 4,
									border: 'none',
									cursor: 'pointer',
									background: '#f5222d',
									color: '#fff',
								}}
							>
								Xóa
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
