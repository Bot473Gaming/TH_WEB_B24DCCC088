import { Modal, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import type { ILichSuThaotac } from '@/services/CauLacBo/dangKyThanhVien';

const { Text } = Typography;

const trangThaiColor: Record<string, string> = {
	Approved: 'green',
	Rejected: 'red',
	Created: 'blue',
	Updated: 'orange',
};

const trangThaiLabel: Record<string, string> = {
	Approved: 'Đã duyệt',
	Rejected: 'Từ chối',
	Created: 'Tạo mới',
	Updated: 'Cập nhật',
};

interface LichSuModalProps {
	visible: boolean;
	onClose: () => void;
	lichSuData: ILichSuThaotac[];
	hoTen?: string;
}

const LichSuModal = ({ visible, onClose, lichSuData, hoTen }: LichSuModalProps) => {
	const columns: any[] = [
		{
			title: 'Thời gian',
			dataIndex: 'thoiGian',
			key: 'thoiGian',
			width: 170,
			render: (val: string) => moment(val).format('HH:mm DD/MM/YYYY'),
		},
		{
			title: 'Hành động',
			dataIndex: 'hanhDong',
			key: 'hanhDong',
			width: 110,
			render: (val: string) => (
				<Tag color={trangThaiColor[val] || 'default'}>{trangThaiLabel[val] || val}</Tag>
			),
		},
		{
			title: 'Người thực hiện',
			dataIndex: 'nguoiThucHien',
			key: 'nguoiThucHien',
			width: 140,
		},
		{
			title: 'Lý do',
			dataIndex: 'lyDo',
			key: 'lyDo',
			render: (val: string) => val ? <Text type="danger">{val}</Text> : <Text type="secondary">–</Text>,
		},
	];

	return (
		<Modal
			title={`Lịch sử thao tác${hoTen ? ` – ${hoTen}` : ''}`}
			visible={visible}
			onCancel={onClose}
			footer={null}
			width={700}
			destroyOnClose
		>
			<Table
				dataSource={lichSuData}
				columns={columns}
				rowKey="id"
				bordered
				size="small"
				pagination={false}
			/>
		</Modal>
	);
};

export default LichSuModal;
