import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Rate,
  Select,
  Table,
  Tag,
  Tooltip,
  message,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import * as DiemDenService from '@/services/DuLich/diemDen';
import type { IDiemDen } from '@/services/DuLich/diemDen';

const { Option } = Select;
const { TextArea } = Input;

const loaiOptions = [
  { value: 'bien', label: 'Bien' },
  { value: 'nui', label: 'Nui' },
  { value: 'thanhpho', label: 'Thanh pho' },
  { value: 'langque', label: 'Lang que' },
  { value: 'disantichsu', label: 'Di san & Lich su' },
];

const loaiColorMap: Record<string, string> = {
  bien: 'blue',
  nui: 'green',
  thanhpho: 'purple',
  langque: 'orange',
  disantichsu: 'gold',
};

const AdminDiemDen = () => {
  const [data, setData] = useState<IDiemDen[]>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [row, setRow] = useState<IDiemDen | undefined>();
  const [form] = Form.useForm();
  const imgRef = useRef<HTMLInputElement>(null);

  const getData = () => setData(DiemDenService.getAll());

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (visible && isEdit && row) {
      form.setFieldsValue({ ...row });
    } else if (visible && !isEdit) {
      form.resetFields();
    }
  }, [visible, isEdit, row]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (isEdit && row) {
        DiemDenService.update(row.id, values);
        message.success('Cap nhat thanh cong!');
      } else {
        DiemDenService.create({ ...values, soLuotChon: 0 });
        message.success('Them moi thanh cong!');
      }
      getData();
      setVisible(false);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      form.setFieldsValue({ hinhAnh: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const columns: any[] = [
    {
      title: 'STT',
      key: 'stt',
      width: 55,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Hinh anh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: 80,
      align: 'center' as const,
      render: (url: string) => (
        <img
          src={url}
          alt=""
          style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4 }}
          onError={(e: any) => { e.target.src = 'https://via.placeholder.com/56x40?text=?'; }}
        />
      ),
    },
    {
      title: 'Ten diem den',
      dataIndex: 'ten',
      key: 'ten',
      sorter: (a: IDiemDen, b: IDiemDen) => a.ten.localeCompare(b.ten),
    },
    { title: 'Dia chi', dataIndex: 'diaChi', key: 'diaChi', width: 130 },
    {
      title: 'Loai hinh',
      dataIndex: 'loai',
      key: 'loai',
      width: 130,
      filters: loaiOptions.map((o) => ({ text: o.label, value: o.value })),
      onFilter: (value: any, record: IDiemDen) => record.loai === value,
      render: (val: string) => {
        const opt = loaiOptions.find((o) => o.value === val);
        return <Tag color={loaiColorMap[val] || 'default'}>{opt?.label || val}</Tag>;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 140,
      sorter: (a: IDiemDen, b: IDiemDen) => a.rating - b.rating,
      render: (val: number) => <Rate disabled value={val} style={{ fontSize: 12 }} />,
    },
    {
      title: 'An uong',
      dataIndex: 'chiPhiAnUong',
      key: 'chiPhiAnUong',
      width: 110,
      align: 'right' as const,
      render: (v: number) => v?.toLocaleString('vi-VN'),
      sorter: (a: IDiemDen, b: IDiemDen) => a.chiPhiAnUong - b.chiPhiAnUong,
    },
    {
      title: 'Luu tru',
      dataIndex: 'chiPhiLuuTru',
      key: 'chiPhiLuuTru',
      width: 110,
      align: 'right' as const,
      render: (v: number) => v?.toLocaleString('vi-VN'),
    },
    {
      title: 'Di chuyen',
      dataIndex: 'chiPhiDiChuyen',
      key: 'chiPhiDiChuyen',
      width: 110,
      align: 'right' as const,
      render: (v: number) => v?.toLocaleString('vi-VN'),
    },
    {
      title: 'TG tham quan',
      dataIndex: 'thoiGianThamQuan',
      key: 'thoiGianThamQuan',
      width: 130,
      align: 'center' as const,
      render: (v: number) => `${v} gio`,
    },
    {
      title: 'Luot chon',
      dataIndex: 'soLuotChon',
      key: 'soLuotChon',
      width: 100,
      align: 'center' as const,
      sorter: (a: IDiemDen, b: IDiemDen) => (a.soLuotChon || 0) - (b.soLuotChon || 0),
      render: (v: number) => <Tag color="blue">{v || 0}</Tag>,
    },
    {
      title: 'Thao tac',
      key: 'action',
      fixed: 'right' as const,
      width: 110,
      align: 'center' as const,
      render: (record: IDiemDen) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          <Tooltip title="Chinh sua">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => { setRow(record); setIsEdit(true); setVisible(true); }}
            />
          </Tooltip>
          <Tooltip title="Xoa">
            <Popconfirm
              title="Ban co chac muon xoa diem den nay?"
              onConfirm={() => { DiemDenService.remove(record.id); getData(); message.success('Da xoa!'); }}
              okText="Co"
              cancelText="Khong"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SettingOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 700 }}>Quan ly diem den</span>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { setRow(undefined); setIsEdit(false); setVisible(true); }}
        >
          Them diem den
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        bordered
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        size="small"
      />

      <Modal
        title={isEdit ? 'Chinh sua diem den' : 'Them diem den moi'}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSubmit}
        okText={isEdit ? 'Cap nhat' : 'Them moi'}
        cancelText="Huy"
        width={680}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="ten" label="Ten diem den" rules={[{ required: true, message: 'Vui long nhap ten' }]}>
            <Input placeholder="VD: Vinh Ha Long" />
          </Form.Item>
          <Form.Item name="diaChi" label="Dia chi / Tinh thanh" rules={[{ required: true, message: 'Vui long nhap dia chi' }]}>
            <Input placeholder="VD: Quang Ninh" />
          </Form.Item>
          <Form.Item name="loai" label="Loai hinh" rules={[{ required: true, message: 'Vui long chon loai hinh' }]}>
            <Select placeholder="Chon loai hinh">
              {loaiOptions.map((o) => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="moTa" label="Mo ta">
            <TextArea rows={3} placeholder="Mo ta ngan ve diem den..." />
          </Form.Item>
          <Form.Item name="hinhAnh" label="URL hinh anh">
            <Input placeholder="https://... hoac tai len tu may tinh ben duoi" />
          </Form.Item>
          <Form.Item label="Tai len hinh anh tu may tinh">
            <input type="file" accept="image/*" ref={imgRef} onChange={handleImageUpload} style={{ display: 'none' }} />
            <Button icon={<UploadOutlined />} onClick={() => imgRef.current?.click()}>Chon anh</Button>
          </Form.Item>
          <Form.Item name="rating" label="Danh gia (sao)" rules={[{ required: true, message: 'Vui long chon rating' }]}>
            <Rate />
          </Form.Item>
          <Form.Item name="thoiGianThamQuan" label="Thoi gian tham quan (gio)" rules={[{ required: true }]}>
            <InputNumber min={1} max={24} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Chi phi uoc tinh (VND/nguoi/ngay)">
            <div style={{ display: 'flex', gap: 12 }}>
              <Form.Item name="chiPhiAnUong" label="An uong" style={{ flex: 1, marginBottom: 0 }}>
                <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placeholder="An uong" />
              </Form.Item>
              <Form.Item name="chiPhiLuuTru" label="Luu tru" style={{ flex: 1, marginBottom: 0 }}>
                <InputNumber min={0} step={100000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placeholder="Luu tru" />
              </Form.Item>
              <Form.Item name="chiPhiDiChuyen" label="Di chuyen" style={{ flex: 1, marginBottom: 0 }}>
                <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placeholder="Di chuyen" />
              </Form.Item>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDiemDen;
