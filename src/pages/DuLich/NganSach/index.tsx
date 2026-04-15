import {
  Alert,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  InputNumber,
  Row,
  Select,
  Statistic,
  Table,
  Progress,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  DollarOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import * as NganSachService from '@/services/DuLich/nganSach';
import * as LichTrinhService from '@/services/DuLich/lichTrinh';
import * as DiemDenService from '@/services/DuLich/diemDen';
import type { INganSach } from '@/services/DuLich/nganSach';
import type { ILichTrinh } from '@/services/DuLich/lichTrinh';

const { Option } = Select;

const formatMoney = (val: number) => val.toLocaleString('vi-VN') + ' d';

const HANG_MUC_COLORS: Record<string, string> = {
  anUong: '#52c41a',
  luuTru: '#1890ff',
  diChuyen: '#fa8c16',
  khac: '#722ed1',
};

const NganSach = () => {
  const [lichTrinhList, setLichTrinhList] = useState<ILichTrinh[]>([]);
  const [selectedLtId, setSelectedLtId] = useState<string | undefined>();
  const [nganSach, setNganSach] = useState<INganSach | undefined>();
  const [form] = Form.useForm();

  useEffect(() => {
    setLichTrinhList(LichTrinhService.getAll());
  }, []);

  useEffect(() => {
    if (!selectedLtId) {
      setNganSach(undefined);
      form.resetFields();
      return;
    }
    const ns = NganSachService.getByLichTrinhId(selectedLtId);
    setNganSach(ns);
    const lt = lichTrinhList.find((l: ILichTrinh) => l.id === selectedLtId);
    if (ns) {
      form.setFieldsValue({
        anUong: ns.anUong,
        luuTru: ns.luuTru,
        diChuyen: ns.diChuyen,
        khac: ns.khac,
        nganSachToiBa: ns.nganSachToiBa,
      });
    } else if (lt) {
      const allDd = DiemDenService.getAll();
      let anUong = 0, luuTru = 0, diChuyen = 0;
      lt.diemDens.forEach((ddn) => {
        const dd = allDd.find((d) => d.id === ddn.diemDenId);
        if (dd) {
          anUong += dd.chiPhiAnUong;
          luuTru += dd.chiPhiLuuTru;
          diChuyen += dd.chiPhiDiChuyen;
        }
      });
      form.setFieldsValue({
        anUong,
        luuTru,
        diChuyen,
        khac: 0,
        nganSachToiBa: lt.nganSachToiBa || 0,
      });
    }
  }, [selectedLtId]);

  const handleLuu = () => {
    if (!selectedLtId) return;
    const values = form.getFieldsValue();
    const lt = lichTrinhList.find((l: ILichTrinh) => l.id === selectedLtId);
    const saved = NganSachService.luu({
      lichTrinhId: selectedLtId,
      anUong: values.anUong || 0,
      luuTru: values.luuTru || 0,
      diChuyen: values.diChuyen || 0,
      khac: values.khac || 0,
      nganSachToiBa: values.nganSachToiBa || lt?.nganSachToiBa || 0,
    });
    setNganSach(saved);
  };

  const getTongChiTieu = (ns: INganSach): number =>
    (ns.anUong || 0) + (ns.luuTru || 0) + (ns.diChuyen || 0) + (ns.khac || 0);

  const vuotNganSach =
    nganSach &&
    nganSach.nganSachToiBa > 0 &&
    getTongChiTieu(nganSach) > nganSach.nganSachToiBa;

  const hangMucData = nganSach
    ? [
        { key: 'anUong', tenHangMuc: 'An uong', soTien: nganSach.anUong || 0 },
        { key: 'luuTru', tenHangMuc: 'Luu tru', soTien: nganSach.luuTru || 0 },
        { key: 'diChuyen', tenHangMuc: 'Di chuyen', soTien: nganSach.diChuyen || 0 },
        { key: 'khac', tenHangMuc: 'Khac', soTien: nganSach.khac || 0 },
      ]
    : [];

  const columns = [
    { title: 'Hang muc', dataIndex: 'tenHangMuc', key: 'tenHangMuc' },
    {
      title: 'So tien',
      dataIndex: 'soTien',
      key: 'soTien',
      render: (val: number) => formatMoney(val),
      align: 'right' as const,
    },
    {
      title: 'Ti le',
      dataIndex: 'key',
      key: 'tyLe',
      align: 'center' as const,
      render: (_: any, record: any) => {
        const tong = nganSach ? getTongChiTieu(nganSach) : 0;
        const pct = tong > 0 ? Math.round((record.soTien / tong) * 100) : 0;
        return (
          <Progress
            percent={pct}
            size="small"
            strokeColor={HANG_MUC_COLORS[record.key]}
            style={{ marginBottom: 0 }}
          />
        );
      },
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <PieChartOutlined style={{ fontSize: 22, color: '#1890ff' }} />
        <span style={{ fontSize: 20, fontWeight: 700 }}>Quan ly ngan sach</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 10, fontWeight: 500 }}>Chon lich trinh:</span>
        <Select
          placeholder="Chon mot lich trinh..."
          style={{ width: 320 }}
          value={selectedLtId}
          onChange={setSelectedLtId}
          allowClear
        >
          {lichTrinhList.map((lt) => (
            <Option key={lt.id} value={lt.id}>
              {lt.tieuDe} ({lt.soNgay} ngay)
            </Option>
          ))}
        </Select>
      </div>

      {!selectedLtId ? (
        <Empty description="Chon mot lich trinh de quan ly ngan sach" />
      ) : (
        <Row gutter={20}>
          <Col xs={24} md={10}>
            <Card title="Nhap ngan sach" style={{ marginBottom: 20 }}>
              <Form form={form} layout="vertical" onValuesChange={handleLuu}>
                <Form.Item name="nganSachToiBa" label="Ngan sach toi da (VND)">
                  <InputNumber
                    min={0}
                    step={500000}
                    style={{ width: '100%' }}
                    formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="10,000,000"
                  />
                </Form.Item>
                <Divider style={{ margin: '8px 0' }}>Chi tiet chi tieu</Divider>
                <Form.Item name="anUong" label="An uong (VND)">
                  <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
                <Form.Item name="luuTru" label="Luu tru (VND)">
                  <InputNumber min={0} step={100000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
                <Form.Item name="diChuyen" label="Di chuyen (VND)">
                  <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
                <Form.Item name="khac" label="Khac (VND)">
                  <InputNumber min={0} step={50000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </Form.Item>
                <div style={{ color: '#888', fontSize: 12 }}>(Du lieu tu dong luu khi thay doi)</div>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={14}>
            {nganSach ? (
              <>
                {vuotNganSach ? (
                  <Alert
                    type="error"
                    icon={<WarningOutlined />}
                    showIcon
                    message="Vuot ngan sach!"
                    description={`Tong chi tieu (${formatMoney(getTongChiTieu(nganSach))}) vuot ngan sach toi da (${formatMoney(nganSach.nganSachToiBa)}) ${formatMoney(getTongChiTieu(nganSach) - nganSach.nganSachToiBa)}.`}
                    style={{ marginBottom: 16 }}
                    banner
                  />
                ) : nganSach.nganSachToiBa > 0 ? (
                  <Alert
                    type="success"
                    icon={<CheckCircleOutlined />}
                    showIcon
                    message="Con trong ngan sach"
                    description={`Con lai: ${formatMoney(nganSach.nganSachToiBa - getTongChiTieu(nganSach))}`}
                    style={{ marginBottom: 16 }}
                    banner
                  />
                ) : null}

                <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
                  <Col xs={12}>
                    <Card bordered>
                      <Statistic
                        title="Tong chi tieu"
                        value={getTongChiTieu(nganSach)}
                        formatter={(v) => Number(v).toLocaleString('vi-VN')}
                        suffix="d"
                        valueStyle={{ color: vuotNganSach ? '#cf1322' : '#1890ff', fontSize: 18 }}
                        prefix={<DollarOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card bordered>
                      <Statistic
                        title="Ngan sach toi da"
                        value={nganSach.nganSachToiBa || 0}
                        formatter={(v) => Number(v).toLocaleString('vi-VN')}
                        suffix="d"
                        valueStyle={{ fontSize: 18 }}
                      />
                    </Card>
                  </Col>
                </Row>

                {nganSach.nganSachToiBa > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555', marginBottom: 4 }}>
                      <span>Tong chi tieu / Ngan sach</span>
                      <span>{Math.min(100, Math.round((getTongChiTieu(nganSach) / nganSach.nganSachToiBa) * 100))}%</span>
                    </div>
                    <Progress
                      percent={Math.min(100, Math.round((getTongChiTieu(nganSach) / nganSach.nganSachToiBa) * 100))}
                      status={vuotNganSach ? 'exception' : 'normal'}
                      strokeWidth={14}
                    />
                  </div>
                )}

                <Table
                  dataSource={hangMucData}
                  columns={columns}
                  rowKey="key"
                  pagination={false}
                  bordered
                  size="small"
                  title={() => <span style={{ fontWeight: 600 }}>Phan bo ngan sach theo hang muc</span>}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}><strong>Tong cong</strong></Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ color: vuotNganSach ? '#cf1322' : '#1890ff' }}>
                            {formatMoney(getTongChiTieu(nganSach))}
                          </strong>
                        </div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <div style={{ textAlign: 'center' }}>
                          <strong>100%</strong>
                        </div>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                />
              </>
            ) : (
              <Empty description="Nhap ngan sach de xem thong ke" style={{ marginTop: 60 }} />
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default NganSach;
