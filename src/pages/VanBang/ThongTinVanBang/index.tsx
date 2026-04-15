import { Button, Modal, Table, Popconfirm, Tooltip, Tag, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { getAll as getAllQuyetDinh } from '@/services/VanBang/quyetDinhTotNghiep';
import { getAll as getAllSoVanBang } from '@/services/VanBang/soVanBang';
import { getAll as getAllCauHinh } from '@/services/VanBang/cauHinhBieuMau';
import FormThongTinVanBang from './Form';

const { Option } = Select;

const ThongTinVanBang = () => {
  const { data, getData, setRow, isEdit, setVisible, setIsEdit, visible, xoa } =
    useModel('VanBang.thongTinVanBang');

  const [filterQuyetDinhId, setFilterQuyetDinhId] = useState<string>('');

  const quyetDinhList = getAllQuyetDinh();
  const soVanBangList = getAllSoVanBang();
  const cauHinhList = getAllCauHinh();

  useEffect(() => {
    getData();
  }, []);

  const findQuyetDinh = (id: string) => quyetDinhList.find((qd) => qd.id === id);
  const findSoVanBang = (id: string) => soVanBangList.find((s) => s.id === id);

  const defaultColumns: any[] = [
    {
      title: 'Số vào sổ',
      dataIndex: 'soVaoSo',
      key: 'soVaoSo',
      width: 100,
      align: 'center' as const,
    },
    {
      title: 'Số hiệu VB',
      dataIndex: 'soHieuVanBang',
      key: 'soHieuVanBang',
      width: 140,
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'maSinhVien',
      key: 'maSinhVien',
      width: 130,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh',
      width: 120,
      render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Quyết định',
      dataIndex: 'quyetDinhId',
      key: 'quyetDinhId',
      width: 160,
      render: (id: string) => {
        const qd = findQuyetDinh(id);
        return qd ? <Tag color="geekblue">{qd.soQD}</Tag> : id;
      },
    },
    {
      title: 'Sổ văn bằng',
      dataIndex: 'soVanBangId',
      key: 'soVanBangId',
      width: 160,
      render: (id: string) => {
        const so = findSoVanBang(id);
        return so ? <Tag color="cyan">{so.tenSo}</Tag> : id;
      },
    },
  ];

  const dynamicColumns: any[] = cauHinhList.map((truong) => ({
    title: truong.tenTruong,
    key: `truong_${truong.id}`,
    width: 130,
    render: (record: any) => {
      const val = record.truongBoSung?.[truong.id];
      if (!val) return '-';
      if (truong.kieu === 'Date') return moment(val).format('DD/MM/YYYY');
      return val;
    },
  }));

  const actionColumn: any = {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right' as const,
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
            title="Bạn có chắc chắn muốn xóa thông tin văn bằng này?"
            onConfirm={() => xoa(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Tooltip>
      </div>
    ),
  };

  const filteredData =
    filterQuyetDinhId
      ? data.filter((item) => item.quyetDinhId === filterQuyetDinhId)
      : data;

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
          <IdcardOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>Danh sách thông tin văn bằng</span>
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
          Thêm văn bằng
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8, fontWeight: 500 }}>Lọc theo quyết định:</span>
        <Select
          allowClear
          style={{ width: 320 }}
          placeholder="Tất cả quyết định"
          value={filterQuyetDinhId || undefined}
          onChange={(val) => {
            setFilterQuyetDinhId(val || '');
          }}
        >
          {quyetDinhList.map((qd) => (
            <Option key={qd.id} value={qd.id}>
              {qd.soQD} - {qd.trichYeu}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        dataSource={filteredData}
        columns={[...defaultColumns, ...dynamicColumns, actionColumn]}
        rowKey="id"
        bordered
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa thông tin văn bằng' : 'Thêm thông tin văn bằng mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={680}
      >
        <FormThongTinVanBang />
      </Modal>
    </div>
  );
};

export default ThongTinVanBang;
