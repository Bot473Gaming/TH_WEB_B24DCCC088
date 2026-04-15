import { Button, Form, Input, InputNumber } from 'antd';
import { useModel } from 'umi';

const FormSoVanBang = () => {
  const { row, isEdit, setVisible, themMoi, capNhat, getData } = useModel('VanBang.soVanBang');
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
        label="Tên sổ văn bằng"
        name="tenSo"
        rules={[{ required: true, message: 'Vui lòng nhập tên sổ!' }]}
      >
        <Input placeholder="VD: Sổ văn bằng đại học năm 2024" />
      </Form.Item>

      <Form.Item
        label="Năm"
        name="nam"
        rules={[{ required: true, message: 'Vui lòng nhập năm!' }]}
      >
        <InputNumber
          min={2000}
          max={2100}
          style={{ width: '100%' }}
          placeholder="VD: 2024"
        />
      </Form.Item>

      <Form.Item
        label="Số hiệu văn bằng bắt đầu"
        name="soHieuBatDau"
        rules={[{ required: true, message: 'Vui lòng nhập số hiệu bắt đầu!' }]}
      >
        <Input placeholder="VD: VB2024-" />
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

export default FormSoVanBang;
