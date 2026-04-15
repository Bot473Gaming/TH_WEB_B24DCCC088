import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';

const { Option } = Select;

const FormCauHinh = () => {
  const { row, isEdit, setVisible, themMoi, capNhat, getData } = useModel('VanBang.cauHinhBieuMau');
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (isEdit && row) {
      capNhat(row.id, values);
    } else {
      themMoi(values);
    }
    setVisible(false);
    getData();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={row}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên trường thông tin"
        name="tenTruong"
        rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
      >
        <Input placeholder="VD: Dân tộc, Điểm trung bình, Ngày nhập học..." />
      </Form.Item>

      <Form.Item
        label="Kiểu dữ liệu"
        name="kieu"
        rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu!' }]}
      >
        <Select placeholder="Chọn kiểu dữ liệu">
          <Option value="String">String (Văn bản)</Option>
          <Option value="Number">Number (Số)</Option>
          <Option value="Date">Date (Ngày tháng)</Option>
        </Select>
      </Form.Item>

      <Form.Item name="batBuoc" label="Bắt buộc nhập" initialValue={false}>
        <Select>
          <Option value={true}>Có</Option>
          <Option value={false}>Không</Option>
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

export default FormCauHinh;
