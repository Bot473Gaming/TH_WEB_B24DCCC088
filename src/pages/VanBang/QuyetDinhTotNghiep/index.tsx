import { Button, Modal, Table, Popconfirm, Tooltip, Tag, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { getAll as getAllSoVanBang } from '@/services/VanBang/soVanBang';
import FormQuyetDinh from './Form';

const { Option } = Select;

const QuyetDinhTotNghiep = () => {
  const {
    data,
    getData,
    setRow,
    isEdit,
    setVisible,
    setIsEdit,
    visible,
    xoa,
    filterSoVanBangId,
    setFilterSoVanBangId,
  } = useModel('VanBang.quyetDinhTotNghiep');

  const soVanBangList = getAllSoVanBang();

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
      title: 'Số quyết định',
      dataIndex: 'soQD',
      key: 'soQD',
      width: 160,
    },
    {
      title: 'Ngày ban hành',
      dataIndex: 'ngayBanHanh',
      key: 'ngayBanHanh',
      width: 140,
      render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Trích yếu',
      dataIndex: 'trichYeu',
      key: 'trichYeu',
    },
    {
      title: 'Thuộc sổ',
      dataIndex: 'soVanBangId',
      key: 'soVanBangId',
      width: 200,
      render: (id: string) => {
        const so = soVanBangList.find((s) => s.id === id);
        return so ? <Tag color="geekblue">{so.tenSo}</Tag> : id;
      },
    },
    {
      title: 'Lượt tra cứu',
      dataIndex: 'soLuotTraCuu',
      key: 'soLuotTraCuu',
      width: 120,
      align: 'center' as const,
      render: (val: number) => (
        <Tag color="orange" icon={<EyeOutlined />}>
          {val}
        </Tag>
      ),
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
              title="Bạn có chắc chắn muốn xóa quyết định này?"
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
          <FileTextOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>Danh sách quyết định tốt nghiệp</span>
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
          Thêm quyết định
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8, fontWeight: 500 }}>Lọc theo sổ văn bằng:</span>
        <Select
          allowClear
          style={{ width: 280 }}
          placeholder="Tất cả sổ văn bằng"
          value={filterSoVanBangId || undefined}
          onChange={(val) => {
            setFilterSoVanBangId(val || '');
            getData(val || undefined);
          }}
        >
          {soVanBangList.map((s) => (
            <Option key={s.id} value={s.id}>
              {s.tenSo} ({s.nam})
            </Option>
          ))}
        </Select>
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
        title={isEdit ? 'Chỉnh sửa quyết định' : 'Thêm quyết định tốt nghiệp'}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={560}
      >
        <FormQuyetDinh />
      </Modal>
    </div>
  );
};

export default QuyetDinhTotNghiep;
