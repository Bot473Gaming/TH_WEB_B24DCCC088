import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

const DangNhapCongViecNhom: React.FC = () => {
	const { login } = useModel('congviecnhom');

	return (
		<div className={styles.wrap}>
			<Card className={styles.card} title='Đăng nhập quản lý công việc nhóm'>
				<Form
					layout='vertical'
					onFinish={(v: { username: string }) => {
						login(v.username);
						history.push('/cong-viec-nhom');
					}}
				>
					<Form.Item
						name='username'
						label='Tên người dùng'
						rules={[{ required: true, message: 'Nhập tên người dùng' }]}
					>
						<Input prefix={<UserOutlined />} placeholder='Tên hiển thị trong nhóm' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default DangNhapCongViecNhom;
