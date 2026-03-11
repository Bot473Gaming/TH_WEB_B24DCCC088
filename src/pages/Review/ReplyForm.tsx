import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const FormReply = () => {
	const [form] = Form.useForm();
	const { row, setReplyVisible, replyReview } = useModel('review');

	const onFinish = async (values: { reply: string }) => {
		if (row) {
			await replyReview(row.id, values.reply);
			setReplyVisible(false);
		}
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			<div style={{ marginBottom: 16 }}>
				<strong>Bình luận của khách hàng:</strong>
				<p>{row?.comment}</p>
			</div>

			<Form.Item
				name='reply'
				label='Phản hồi của bạn'
				rules={[{ required: true, message: 'Vui lòng nhập phản hồi' }]}
			>
				<Input.TextArea rows={4} placeholder='Nhập phản hồi của bạn ở đây...' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					Gửi phản hồi
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormReply;
