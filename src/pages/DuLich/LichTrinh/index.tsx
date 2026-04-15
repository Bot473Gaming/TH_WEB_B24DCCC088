import {
  Button,
  Col,
  DatePicker,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Popconfirm,
  Progress,
  Row,
  Select,
  Statistic,
  Tabs,
  Tooltip,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import * as DiemDenService from '@/services/DuLich/diemDen';
import * as LichTrinhService from '@/services/DuLich/lichTrinh';
import type { ILichTrinh } from '@/services/DuLich/lichTrinh';
import type { IDiemDen } from '@/services/DuLich/diemDen';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

const formatMoney = (val: number) => val.toLocaleString('vi-VN') + ' d';

const LichTrinh = () => {
  const [data, setData] = useState<ILichTrinh[]>([]);
  const [allDiemDen, setAllDiemDen] = useState<IDiemDen[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [formVisible, setFormVisible] = useState(false);
  const [addDdVisible, setAddDdVisible] = useState(false);
  const [activeNgay, setActiveNgay] = useState<number>(1);
  const [selectedDdId, setSelectedDdId] = useState<string | undefined>();
  const [form] = Form.useForm();

  const loadData = () => {
    setData(LichTrinhService.getAll());
    setAllDiemDen(DiemDenService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedLt = data.find((lt) => lt.id === selectedId);

  const getDiemDenOfNgay = (lt: ILichTrinh, ngay: number) =>
    lt.diemDens
      .filter((d) => d.ngay === ngay)
      .sort((a, b) => a.thuTu - b.thuTu)
      .map((e) => ({ entry: e, diemDen: allDiemDen.find((d) => d.id === e.diemDenId) }));

  const tinhTongChiPhi = (lt: ILichTrinh): number => {
    let total = 0;
    lt.diemDens.forEach((ddn) => {
      const dd = allDiemDen.find((d) => d.id === ddn.diemDenId);
      if (dd) total += dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen;
    });
    return total;
  };

  const tinhTongThoiGian = (lt: ILichTrinh): number => {
    let total = 0;
    lt.diemDens.forEach((ddn) => {
      const dd = allDiemDen.find((d) => d.id === ddn.diemDenId);
      if (dd) total += dd.thoiGianThamQuan;
    });
    return total;
  };

  const handleTaoLichTrinh = () => {
    form.validateFields().then((values) => {
      const lt = LichTrinhService.create({
        tieuDe: values.tieuDe,
        ngayBatDau: values.ngayBatDau.format('YYYY-MM-DD'),
        soNgay: values.soNgay,
        nganSachToiBa: values.nganSachToiBa || 0,
      });
      loadData();
      setSelectedId(lt.id);
      setFormVisible(false);
      form.resetFields();
      message.success('Tao lich trinh thanh cong!');
    });
  };

  const handleAddDiemDen = () => {
    if (!selectedDdId || !selectedId) return;
    LichTrinhService.addDiemDenVaoNgay(selectedId, selectedDdId, activeNgay);
    loadData();
    setAddDdVisible(false);
    setSelectedDdId(undefined);
    message.success('Da them diem den!');
  };

  const handleXoaLichTrinh = (id: string) => {
    LichTrinhService.remove(id);
    loadData();
    if (selectedId === id) setSelectedId(undefined);
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ScheduleOutlined style={{ fontSize: 22, color: '#1890ff' }} />
          <span style={{ fontSize: 20, fontWeight: 700 }}>Lich trinh cua toi</span>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { form.resetFields(); setFormVisible(true); }}
        >
          Tao lich trinh moi
        </Button>
      </div>

      <Row gutter={20}>
        {/* Danh sach lich trinh */}
        <Col xs={24} md={8} lg={6}>
          <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: '#fafafa', fontWeight: 600, borderBottom: '1px solid #e8e8e8', fontSize: 13 }}>
              Danh sach lich trinh ({data.length})
            </div>
            {data.length === 0 ? (
              <div style={{ padding: 20 }}>
                <Empty description="Chua co lich trinh nao" />
              </div>
            ) : (
              <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                {data.map((lt) => (
                  <div
                    key={lt.id}
                    onClick={() => { setSelectedId(lt.id); setActiveNgay(1); }}
                    style={{
                      padding: '12px 14px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      background: selectedId === lt.id ? '#e6f7ff' : '#fff',
                      borderLeft: selectedId === lt.id ? '3px solid #1890ff' : '3px solid transparent',
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{lt.tieuDe}</div>
                    <div style={{ fontSize: 12, color: '#888', display: 'flex', gap: 8 }}>
                      <span><CalendarOutlined /> {moment(lt.ngayBatDau).format('DD/MM/YYYY')}</span>
                      <span>{lt.soNgay} ngay</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                      <Popconfirm
                        title="Xoa lich trinh nay?"
                        onConfirm={(e) => { e?.stopPropagation(); handleXoaLichTrinh(lt.id); }}
                        okText="Co"
                        cancelText="Khong"
                      >
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()} />
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* Chi tiet lich trinh */}
        <Col xs={24} md={16} lg={18}>
          {!selectedLt ? (
            <Empty description="Chon mot lich trinh o ben trai de xem chi tiet" style={{ marginTop: 60 }} />
          ) : (
            <div>
              {/* Summary */}
              <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: '12px 20px', marginBottom: 16, background: '#fafafa' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{selectedLt.tieuDe}</div>
                <Row gutter={16}>
                  <Col xs={12} sm={6}>
                    <Statistic title="Ngay bat dau" value={moment(selectedLt.ngayBatDau).format('DD/MM/YYYY')} prefix={<CalendarOutlined />} valueStyle={{ fontSize: 14 }} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic title="So ngay" value={selectedLt.soNgay} suffix="ngay" valueStyle={{ fontSize: 14 }} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="Tong chi phi uoc tinh"
                      value={tinhTongChiPhi(selectedLt)}
                      suffix="d"
                      valueStyle={{ fontSize: 14, color: '#1890ff' }}
                      formatter={(val) => Number(val).toLocaleString('vi-VN')}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic title="Tong thoi gian" value={tinhTongThoiGian(selectedLt)} suffix="gio" prefix={<ClockCircleOutlined />} valueStyle={{ fontSize: 14 }} />
                  </Col>
                </Row>
                {selectedLt.nganSachToiBa > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: '#555' }}>
                      <span><DollarOutlined /> Ngan sach: {formatMoney(tinhTongChiPhi(selectedLt))} / {formatMoney(selectedLt.nganSachToiBa)}</span>
                      <span>{Math.round((tinhTongChiPhi(selectedLt) / selectedLt.nganSachToiBa) * 100)}%</span>
                    </div>
                    <Progress
                      percent={Math.min(100, Math.round((tinhTongChiPhi(selectedLt) / selectedLt.nganSachToiBa) * 100))}
                      status={tinhTongChiPhi(selectedLt) > selectedLt.nganSachToiBa ? 'exception' : 'normal'}
                      size="small"
                    />
                  </div>
                )}
              </div>

              {/* Tabs theo ngay */}
              <Tabs
                activeKey={String(activeNgay)}
                onChange={(key) => setActiveNgay(Number(key))}
                tabBarExtraContent={
                  <Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => setAddDdVisible(true)}>
                    Them diem den
                  </Button>
                }
              >
                {Array.from({ length: selectedLt.soNgay }, (_, i) => i + 1).map((ngay) => {
                  const items = getDiemDenOfNgay(selectedLt, ngay);
                  return (
                    <TabPane tab={`Ngay ${ngay}`} key={String(ngay)}>
                      {items.length === 0 ? (
                        <Empty description="Chua co diem den nao trong ngay nay" style={{ marginTop: 20 }} />
                      ) : (
                        <List
                          dataSource={items}
                          renderItem={({ entry, diemDen }) => (
                            <List.Item
                              key={entry.id}
                              actions={[
                                <Tooltip title="Xoa khoi ngay nay" key="del">
                                  <Popconfirm
                                    title="Xoa diem den nay khoi ngay?"
                                    onConfirm={() => {
                                      LichTrinhService.removeDiemDenKhoiNgay(selectedLt.id, entry.id);
                                      loadData();
                                    }}
                                    okText="Co"
                                    cancelText="Khong"
                                  >
                                    <Button danger size="small" icon={<DeleteOutlined />} />
                                  </Popconfirm>
                                </Tooltip>,
                              ]}
                            >
                              <List.Item.Meta
                                title={<span style={{ fontWeight: 600 }}>{entry.thuTu}. {diemDen?.ten || 'Khong xac dinh'}</span>}
                                description={
                                  diemDen ? (
                                    <div style={{ fontSize: 12, color: '#666' }}>
                                      <span><EnvironmentOutlined /> {diemDen.diaChi}</span>
                                      {'  '}
                                      <span><ClockCircleOutlined /> {diemDen.thoiGianThamQuan} gio</span>
                                      {'  '}
                                      <span style={{ color: '#1890ff' }}><DollarOutlined /> {formatMoney(diemDen.chiPhiAnUong + diemDen.chiPhiLuuTru + diemDen.chiPhiDiChuyen)}</span>
                                    </div>
                                  ) : null
                                }
                              />
                            </List.Item>
                          )}
                        />
                      )}
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          )}
        </Col>
      </Row>

      {/* Modal: Tao lich trinh moi */}
      <Modal title="Tao lich trinh moi" visible={formVisible} onCancel={() => setFormVisible(false)} onOk={handleTaoLichTrinh} okText="Tao lich trinh" cancelText="Huy" width={500} destroyOnClose>
        <Form form={form} layout="vertical">
          <Form.Item name="tieuDe" label="Ten lich trinh" rules={[{ required: true, message: 'Vui long nhap ten lich trinh' }]}>
            <Input placeholder="VD: Du lich Ha Noi 3 ngay 2 dem" />
          </Form.Item>
          <Form.Item name="ngayBatDau" label="Ngay bat dau" rules={[{ required: true, message: 'Vui long chon ngay bat dau' }]}>
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" disabledDate={(d) => d && d < moment().startOf('day')} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="soNgay" label="So ngay" rules={[{ required: true, message: 'Vui long nhap so ngay' }]}>
                <InputNumber min={1} max={30} style={{ width: '100%' }} placeholder="3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nganSachToiBa" label="Ngan sach toi da (VND)">
                <InputNumber min={0} step={100000} style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placeholder="5,000,000" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal: Them diem den vao ngay */}
      <Modal title={`Them diem den vao Ngay ${activeNgay}`} visible={addDdVisible} onCancel={() => { setAddDdVisible(false); setSelectedDdId(undefined); }} onOk={handleAddDiemDen} okText="Them" cancelText="Huy" width={480} destroyOnClose>
        <Form layout="vertical">
          <Form.Item label="Chon diem den">
            <Select showSearch placeholder="Tim va chon diem den..." style={{ width: '100%' }} value={selectedDdId} onChange={setSelectedDdId} filterOption={(input: string, option: any) => option?.children?.toLowerCase().includes(input.toLowerCase())}>
              {allDiemDen.map((dd) => <Option key={dd.id} value={dd.id}>{dd.ten} — {dd.diaChi}</Option>)}
            </Select>
          </Form.Item>
          {selectedDdId && (() => {
            const dd = allDiemDen.find((d) => d.id === selectedDdId);
            if (!dd) return null;
            return (
              <div style={{ padding: 12, border: '1px solid #e8e8e8', borderRadius: 6, background: '#fafafa', fontSize: 13 }}>
                <div><EnvironmentOutlined /> {dd.diaChi}</div>
                <div><ClockCircleOutlined /> Thoi gian tham quan: {dd.thoiGianThamQuan} gio</div>
                <div><DollarOutlined /> Chi phi: {formatMoney(dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen)}</div>
              </div>
            );
          })()}
        </Form>
      </Modal>
    </div>
  );
};

export default LichTrinh;
