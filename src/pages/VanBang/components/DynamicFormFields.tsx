import MyDatePicker from '@/components/MyDatePicker';
import { Form, Input, InputNumber } from 'antd';

type Props = {
	configs: VanBang.ICauHinhTruong[];
};

const DynamicFormFields = ({ configs }: Props) => {
	return (
		<>
			{(configs ?? []).map((cfg) => {
				const name = ['truongDong', cfg.id] as any;
				if (cfg.kieuDuLieu === 'Number')
					return (
						<Form.Item key={cfg.id} name={name} label={cfg.tenTruong}>
							<InputNumber style={{ width: '100%' }} placeholder={cfg.tenTruong} />
						</Form.Item>
					);
				if (cfg.kieuDuLieu === 'Date')
					return (
						<Form.Item key={cfg.id} name={name} label={cfg.tenTruong}>
							<MyDatePicker />
						</Form.Item>
					);
				return (
					<Form.Item key={cfg.id} name={name} label={cfg.tenTruong}>
						<Input placeholder={cfg.tenTruong} />
					</Form.Item>
				);
			})}
		</>
	);
};

export default DynamicFormFields;

