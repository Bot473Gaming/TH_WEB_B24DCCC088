import { useState } from 'react';

export default () => {
	const [role, setRoleState] = useState<'admin' | 'user'>(
		(localStorage.getItem('app_role') as 'admin' | 'user') || 'admin'
	);

	const setRole = (newRole: 'admin' | 'user') => {
		setRoleState(newRole);
		localStorage.setItem('app_role', newRole);
		window.location.reload(); // Reload to refresh menu
	};

	return {
		role,
		setRole,
	};
};
