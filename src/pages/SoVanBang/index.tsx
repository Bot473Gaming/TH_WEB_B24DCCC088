import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';

const SoVanBangPage = () => {
	const { page, limit, setRecord, setEdit, setIsView, setVisibleForm } = useModel('vanbang.sovanbang' as any);

	const columns: IColumn<VanBang.ISoVanBang>[] = [
		{
			title: 'Tên sổ',
			dataIndex: 'tenSo',
			width: 260,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Số kế tiếp',
			dataIndex: 'soHienTai',
			align: 'center',
			width: 110,
			sortable: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			align: 'center',
			width: 110,
			filterType: 'select',
			filterData: ['ĐANG_MỞ', 'ĐÃ_CHỐT'],
			render: (val: VanBang.TTrangThaiSo) =>
				val === 'ĐANG_MỞ' ? <Tag color='green'>ĐANG MỞ</Tag> : <Tag color='default'>ĐÃ CHỐT</Tag>,
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='vanbang.sovanbang'
			title='Sổ văn bằng'
			Form={Form}
			buttons={{ create: false }}
			otherButtons={[
				<Button
					key='open'
					type='primary'
					icon={<PlusCircleOutlined />}
					onClick={() => {
						setRecord(undefined);
						setEdit(false);
						setIsView(false);
						setVisibleForm(true);
					}}
				>
					Mở sổ mới
				</Button>
			]}
		/>
	);
};

export default SoVanBangPage;

