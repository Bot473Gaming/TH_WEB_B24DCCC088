import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { useModel } from 'umi';
import Form from './components/Form';

const QuyetDinhPage = () => {
	const { page, limit } = useModel('vanbang.quyetdinh' as any);

	const columns: IColumn<VanBang.IQuyetDinh>[] = [
		{
			title: 'Số QĐ',
			dataIndex: 'soQD',
			width: 140,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Ngày ban hành',
			dataIndex: 'ngayBanHanh',
			align: 'center',
			width: 150,
			sortable: true,
		},
		{
			title: 'Trích yếu',
			dataIndex: 'trichYeu',
			width: 360,
			filterType: 'string',
		},
		{
			title: 'Tổng lượt tra cứu',
			dataIndex: 'luotTraCuu',
			align: 'center',
			width: 130,
			sortable: true,
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='vanbang.quyetdinh'
			title='Quyết định tốt nghiệp'
			Form={Form}
			buttons={{ import: false, export: false }}
		/>
	);
};

export default QuyetDinhPage;

