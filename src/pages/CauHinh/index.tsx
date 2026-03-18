import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import { useModel } from 'umi';
import Form from './components/Form';

const CauHinhBieuMauPage = () => {
	const { page, limit, reorder } = useModel('vanbang.cauhinhtruong' as any);

	const columns: IColumn<VanBang.ICauHinhTruong>[] = [
		{
			title: 'Tên trường',
			dataIndex: 'tenTruong',
			width: 260,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Kiểu dữ liệu',
			dataIndex: 'kieuDuLieu',
			align: 'center',
			width: 120,
			filterType: 'select',
			filterData: ['String', 'Number', 'Date'],
			sortable: true,
		},
		{
			title: 'Thứ tự',
			dataIndex: 'thuTu',
			align: 'center',
			width: 80,
			sortable: true,
		},
		{
			title: 'Mã (id)',
			dataIndex: 'id',
			width: 180,
			filterType: 'string',
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='vanbang.cauhinhtruong'
			title='Cấu hình biểu mẫu'
			Form={Form}
			buttons={{ import: false, export: false }}
			rowSortable
			onSortEnd={(record: VanBang.ICauHinhTruong, newIndex: number) => reorder(record, newIndex)}
		/>
	);
};

export default CauHinhBieuMauPage;

