import { Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	const { role, setRole } = useModel('role');


	return (
		<div className={styles.right}>
			<Select
				value={role}
				onChange={(val) => setRole(val)}
				style={{ width: 120, marginRight: 16 }}
				options={[
					{ value: 'admin', label: 'Admin (Quản trị)' },
					{ value: 'user', label: 'User (Khách)' },
				]}
			/>
			{/* <ModuleSwitch /> */}

			{/* <NoticeIconView /> */}

			{/* <Tooltip title='Giới thiệu chung' placement='bottom'>
				<a onClick={() => history.push('/gioi-thieu')}>
					<InfoCircleOutlined />
				</a>
			</Tooltip> */}

			{initialState?.currentUser && <AvatarDropdown menu />}
		</div>
	);
};

export default GlobalHeaderRight;
