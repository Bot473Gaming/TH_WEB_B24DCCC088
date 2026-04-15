import { Button, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { getAll as getAllSoVanBang } from '@/services/VanBang/soVanBang';

const { Option } = Select;

const FormQuyetDinh = () => {
  const { row, isEdit, setVisible, themMoi, capNhat, getData, filterSoVanBangId } =
    useModel('VanBang.quyetDinhTotNghiep');
  const [form] = Form.useForm();
  const soVanBangList = getAllSoVanBang();

  const onFinish = (values: any) => {
    const data = {
      ...values,
      ngayBanHanh: values.ngayBanHanh ? values.ngayBanHanh.format('YYYY-MM-DD') : '',
    };
    if (isEdit && row) {
      capNhat(row.id, data);
    } else {
      themMoi(data);
    }
    setVisible(false);
    getData(filterSoVanBangId || undefined);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        row
          ? {
              ...row,
              ngayBanHanh: row.ngayBanHanh ? moment(row.ngayBanHanh) : undefined,
            }
          : undefined
      }
      onFinish={onFinish}
    >
      <Form.Item
        label="Số quyết định"
        name="soQD"
        rules={[{ required: true, message: 'Vui lòng nhập số quyết định!' }]}
      >
        <Input placeholder="VD: 01/QĐ-ĐHXYZ" />
      </Form.Item>

      <Form.Item
        label="Ngày ban hành"
        name="ngayBanHanh"
        rules={[{ required: true, message: 'Vui lòng chọn ngày ban hành!' }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Trích yếu"
        name="trichYeu"
        rules={[{ required: true, message: 'Vui lòng nhập trích yếu!' }]}
      >
        <Input.TextArea rows={3} placeholder="Nội dung trích yếu quyết định..." />
      </Form.Item>

      <Form.Item
        label="Thuộc sổ văn bằng"
        name="soVanBangId"
        rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng!' }]}
      >
        <Select placeholder="Chọn sổ văn bằng">
          {soVanBangList.map((s) => (
            <Option key={s.id} value={s.id}>
              {s.tenSo} ({s.nam})
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button onClick={() => setVisible(false)}>Hủy</Button>
        <Button htmlType="submit" type="primary">
          {isEdit ? 'Lưu' : 'Thêm mới'}
        </Button>
      </div>
    </Form>
  );
};

export default FormQuyetDinh;
