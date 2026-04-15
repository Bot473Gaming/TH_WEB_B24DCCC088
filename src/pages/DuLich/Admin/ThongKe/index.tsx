import { Card, Col, Divider, Progress, Row, Statistic, Table, Tag } from 'antd';
import { useMemo } from 'react';
import {
  BarChartOutlined,
  CompassOutlined,
  DollarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import * as DiemDenService from '@/services/DuLich/diemDen';
import * as LichTrinhService from '@/services/DuLich/lichTrinh';
import * as NganSachService from '@/services/DuLich/nganSach';
import moment from 'moment';

const formatMoney = (val: number) => val.toLocaleString('vi-VN') + ' d';

const AdminThongKe = () => {
  const lichTrinhList = LichTrinhService.getAll();
  const diemDenList = DiemDenService.getAll();
  const nganSachList = NganSachService.getAll();

  // Thong ke theo thang
  const thongKeThang = useMemo(() => {
    const stats: Record<string, number> = {};
    lichTrinhList.forEach((lt) => {
      const thang = lt.ngayTao.slice(0, 7);
      stats[thang] = (stats[thang] || 0) + 1;
    });
    return Object.entries(stats)
      .map(([thang, soLuong]) => ({
        thang: moment(thang).format('MM/YYYY'),
        soLuong,
      }))
      .sort((a, b) => a.thang.localeCompare(b.thang));
  }, []);

  // Dia diem pho bien
  const diaDiemPhoPhien = useMemo(() => {
    const counts: Record<string, number> = {};
    lichTrinhList.forEach((lt) => {
      lt.diemDens.forEach((ddn) => {
        counts[ddn.diemDenId] = (counts[ddn.diemDenId] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([id, soLuot]) => {
        const dd = diemDenList.find((d) => d.id === id);
        return { id, ten: dd?.ten || 'Khong ro', diaChi: dd?.diaChi || '', soLuot };
      })
      .sort((a, b) => b.soLuot - a.soLuot)
      .slice(0, 10);
  }, []);

  // Thong ke ngan sach
  const tongTienAll = useMemo(() => {
    let anUong = 0, luuTru = 0, diChuyen = 0, khac = 0;
    nganSachList.forEach((ns) => {
      anUong += ns.anUong || 0;
      luuTru += ns.luuTru || 0;
      diChuyen += ns.diChuyen || 0;
      khac += ns.khac || 0;
    });
    const tong = anUong + luuTru + diChuyen + khac;
    return { anUong, luuTru, diChuyen, khac, tong };
  }, []);

  const hangMucData = [
    { key: 'anUong', label: 'An uong', value: tongTienAll.anUong, color: '#52c41a' },
    { key: 'luuTru', label: 'Luu tru', value: tongTienAll.luuTru, color: '#1890ff' },
    { key: 'diChuyen', label: 'Di chuyen', value: tongTienAll.diChuyen, color: '#fa8c16' },
    { key: 'khac', label: 'Khac', value: tongTienAll.khac, color: '#722ed1' },
  ];

  const colsThang = [
    { title: 'Thang', dataIndex: 'thang', key: 'thang' },
    { title: 'So lich trinh tao', dataIndex: 'soLuong', key: 'soLuong', align: 'center' as const },
  ];

  const colsDiaDiem = [
    { title: 'STT', key: 'stt', width: 55, align: 'center' as const, render: (_: any, __: any, i: number) => i + 1 },
    { title: 'Ten dia diem', dataIndex: 'ten', key: 'ten' },
    { title: 'Dia chi', dataIndex: 'diaChi', key: 'diaChi' },
    {
      title: 'So luot duoc chon',
      dataIndex: 'soLuot',
      key: 'soLuot',
      align: 'center' as const,
      render: (v: number) => <Tag color="blue">{v}</Tag>,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <BarChartOutlined style={{ fontSize: 22, color: '#1890ff' }} />
        <span style={{ fontSize: 20, fontWeight: 700 }}>Thong ke tong quan</span>
      </div>

      {/* Summary cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card bordered>
            <Statistic
              title="Tong lich trinh da tao"
              value={lichTrinhList.length}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered>
            <Statistic
              title="Tong so diem den"
              value={diemDenList.length}
              prefix={<CompassOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered>
            <Statistic
              title="Tong tien thong ke"
              value={tongTienAll.tong}
              formatter={(v) => Number(v).toLocaleString('vi-VN')}
              suffix="d"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered>
            <Statistic
              title="Diem den pho bien nhat"
              value={diaDiemPhoPhien[0]?.ten || 'Chua co du lieu'}
              valueStyle={{ fontSize: 16 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Thong ke theo hang muc */}
      <Divider orientation="left">Thong ke chi phi theo hang muc</Divider>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {hangMucData.map((hm) => (
          <Col xs={24} sm={12} key={hm.key}>
            <div
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>{hm.label}</span>
                <span style={{ color: hm.color, fontWeight: 700 }}>{formatMoney(hm.value)}</span>
              </div>
              <Progress
                percent={
                  tongTienAll.tong > 0
                    ? Math.round((hm.value / tongTienAll.tong) * 100)
                    : 0
                }
                strokeColor={hm.color}
                size="small"
              />
            </div>
          </Col>
        ))}
      </Row>

      {/* Lich trinh theo thang */}
      <Divider orientation="left">So luong lich trinh theo thang</Divider>
      {thongKeThang.length === 0 ? (
        <div style={{ color: '#888', marginBottom: 24 }}>Chua co du lieu lich trinh.</div>
      ) : (
        <Table
          dataSource={thongKeThang}
          columns={colsThang}
          rowKey="thang"
          bordered
          pagination={false}
          style={{ marginBottom: 24 }}
          size="small"
        />
      )}

      {/* Dia diem pho bien */}
      <Divider orientation="left">Top 10 dia diem pho bien</Divider>
      {diaDiemPhoPhien.length === 0 ? (
        <div style={{ color: '#888' }}>Chua co du lieu diem den trong lich trinh.</div>
      ) : (
        <Table
          dataSource={diaDiemPhoPhien}
          columns={colsDiaDiem}
          rowKey="id"
          bordered
          pagination={false}
          size="small"
        />
      )}
    </div>
  );
};

export default AdminThongKe;
