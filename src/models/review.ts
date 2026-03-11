import { getReviewData, ReviewRecord, saveReviewData } from '@/services/Review';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<ReviewRecord[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [replyVisible, setReplyVisible] = useState<boolean>(false);
	const [row, setRow] = useState<ReviewRecord>();

	const getDataReview = async () => {
		const res = await getReviewData();
		setData(res?.data ?? []);
	};

	const addReview = async (review: ReviewRecord) => {
		const newData = [...data, review];
		await saveReviewData(newData);
		setData(newData);
		message.success('Review submitted successfully!');
	};

	const replyReview = async (id: string, reply: string) => {
		const newData = data.map((item) => (item.id === id ? { ...item, staffReply: reply } : item));
		await saveReviewData(newData);
		setData(newData);
		message.success('Reply submitted successfully!');
	};

	const deleteReview = async (id: string) => {
		const newData = data.filter((item) => item.id !== id);
		await saveReviewData(newData);
		setData(newData);
	};

	return {
		data,
		visible,
		setVisible,
		replyVisible,
		setReplyVisible,
		row,
		setRow,
		setData,
		getDataReview,
		addReview,
		replyReview,
		deleteReview,
	};
};
