import { Button, Modal, Table, Popconfirm, Tooltip, Tag } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined, BookOutlined } from '@ant-design/icons';
import FormSoVanBang from './Form';

const SoVanBang = () => {
  const { data, getData, setRow, isEdit, setVisible, setIsEdit, visible, xoa } =
    useModel('VanBang.soVanBang');

  useEffect(() => {
    getData();
  }, []);

  const columns: any[] = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center' as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sổ văn bằng',
      dataIndex: 'tenSo',
      key: 'tenSo',
    },
    {
      title: 'Năm',
      dataIndex: 'nam',
      key: 'nam',
      width: 100,
      align: 'center' as const,
    },
    {
      title: 'Số hiệu bắt đầu',
      dataIndex: 'soHieuBatDau',
      key: 'soHieuBatDau',
      width: 160,
    },
    {
      title: 'Số lượng văn bằng',
      dataIndex: 'soVaoSoHienTai',
      key: 'soVaoSoHienTai',
      width: 160,
      align: 'center' as const,
      render: (val: number) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 130,
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
              title="Bạn có chắc chắn muốn xóa sổ văn bằng này?"
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>Danh sách sổ văn bằng</span>
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
          Thêm sổ mới
        </Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="id" bordered pagination={{ pageSize: 10 }} />

      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa sổ văn bằng' : 'Thêm sổ văn bằng mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={500}
      >
        <FormSoVanBang />
      </Modal>
    </div>
  );
};

export default SoVanBang;
