import { Button, Modal, Table, Popconfirm, Tooltip, Tag } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import FormCauHinh from './Form';

const CauHinhBieuMau = () => {
  const { data, getData, setRow, isEdit, setVisible, setIsEdit, visible, xoa } =
    useModel('VanBang.cauHinhBieuMau');

  useEffect(() => {
    getData();
  }, []);

  const kieuColor: Record<string, string> = {
    String: 'blue',
    Number: 'green',
    Date: 'purple',
  };

  const columns: any[] = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên trường',
      dataIndex: 'tenTruong',
      key: 'tenTruong',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'kieu',
      key: 'kieu',
      width: 160,
      align: 'center' as const,
      render: (kieu: string) => <Tag color={kieuColor[kieu] || 'default'}>{kieu}</Tag>,
    },
    {
      title: 'Bắt buộc',
      dataIndex: 'batBuoc',
      key: 'batBuoc',
      width: 100,
      align: 'center' as const,
      render: (val: boolean) =>
        val ? <Tag color="red">Có</Tag> : <Tag color="default">Không</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 110,
      align: 'center' as const,
      render: (record: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setVisible(true);
                setRow(record);
                setIsEdit(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa trường này sẽ ảnh hưởng đến cấu hình biểu mẫu. Bạn có chắc chắn?"
              onConfirm={() => xoa(record.id)}
              okText="Có"
              cancelText="Không"
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SettingOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>Cấu hình biểu mẫu phụ lục văn bằng</span>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
            setRow(undefined);
            setIsEdit(false);
          }}
        >
          Thêm trường thông tin
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa trường thông tin' : 'Thêm trường thông tin mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={480}
      >
        <FormCauHinh />
      </Modal>
    </div>
  );
};

export default CauHinhBieuMau;
