import {
  Card,
  Col,
  Row,
  Select,
  Rate,
  Tag,
  Button,
  Input,
  Empty,
  Tooltip,
  Modal,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  CompassOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  PlusCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import * as DiemDenService from '@/services/DuLich/diemDen';
import * as LichTrinhService from '@/services/DuLich/lichTrinh';
import type { IDiemDen, LoaiDiemDen } from '@/services/DuLich/diemDen';
import type { ILichTrinh } from '@/services/DuLich/lichTrinh';

const { Search } = Input;
const { Option } = Select;

const loaiMap: Record<LoaiDiemDen, { label: string; color: string }> = {
  bien: { label: 'Bien', color: 'blue' },
  nui: { label: 'Nui', color: 'green' },
  thanhpho: { label: 'Thanh pho', color: 'purple' },
  langque: { label: 'Lang que', color: 'orange' },
  disantichsu: { label: 'Di san & Lich su', color: 'gold' },
};

const formatMoney = (val: number) => val.toLocaleString('vi-VN') + ' d';

const TrangChu = () => {
  const [diemDenList, setDiemDenList] = useState<IDiemDen[]>([]);
  const [lichTrinhList, setLichTrinhList] = useState<ILichTrinh[]>([]);
  const [search, setSearch] = useState('');
  const [loaiFilter, setLoaiFilter] = useState<string | undefined>();
  const [ratingFilter, setRatingFilter] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<string>('luotChon');
  const [addVisible, setAddVisible] = useState(false);
  const [selectedDiemDen, setSelectedDiemDen] = useState<IDiemDen | undefined>();

  const loadData = () => {
    setDiemDenList(DiemDenService.getAll());
    setLichTrinhList(LichTrinhService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = diemDenList
    .filter((d) => {
      const q = search.toLowerCase();
      const matchText =
        d.ten.toLowerCase().includes(q) || d.diaChi.toLowerCase().includes(q);
      const matchLoai = loaiFilter ? d.loai === loaiFilter : true;
      const matchRating = ratingFilter ? d.rating >= ratingFilter : true;
      return matchText && matchLoai && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === 'luotChon') return (b.soLuotChon || 0) - (a.soLuotChon || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'chiPhi') {
        const tA = a.chiPhiAnUong + a.chiPhiLuuTru + a.chiPhiDiChuyen;
        const tB = b.chiPhiAnUong + b.chiPhiLuuTru + b.chiPhiDiChuyen;
        return tA - tB;
      }
      if (sortBy === 'ten') return a.ten.localeCompare(b.ten);
      return 0;
    });

  const handleAddToLichTrinh = (dd: IDiemDen) => {
    setSelectedDiemDen(dd);
    setAddVisible(true);
  };

  const doAddToLichTrinh = (lichTrinhId: string, ngay: number) => {
    if (!selectedDiemDen) return;
    LichTrinhService.addDiemDenVaoNgay(lichTrinhId, selectedDiemDen.id, ngay);
    DiemDenService.incrementLuotChon(selectedDiemDen.id);
    loadData();
    message.success(`Da them "${selectedDiemDen.ten}" vao lich trinh!`);
    setAddVisible(false);
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <CompassOutlined style={{ fontSize: 22, color: '#1890ff' }} />
          <span style={{ fontSize: 20, fontWeight: 700 }}>Kham pha diem den</span>
        </div>
        <span style={{ color: '#888', fontSize: 14 }}>
          Tim kiem va kham pha nhung diem den tuyet voi tren khap Viet Nam
        </span>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          padding: '12px 16px',
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          background: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FilterOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500, fontSize: 13 }}>Loc:</span>
        </div>
        <Search
          placeholder="Tim kiem diem den..."
          allowClear
          style={{ width: 220 }}
          onSearch={setSearch}
          onChange={(e) => { if (!e.target.value) setSearch(''); }}
        />
        <Select
          placeholder="Loai hinh"
          allowClear
          style={{ width: 160 }}
          value={loaiFilter}
          onChange={setLoaiFilter}
        >
          {Object.entries(loaiMap).map(([key, val]) => (
            <Option key={key} value={key}>{val.label}</Option>
          ))}
        </Select>
        <Select
          placeholder="Rating toi thieu"
          allowClear
          style={{ width: 160 }}
          value={ratingFilter}
          onChange={setRatingFilter}
        >
          <Option value={5}>5 sao</Option>
          <Option value={4}>4 sao tro len</Option>
          <Option value={3}>3 sao tro len</Option>
        </Select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
          <SortAscendingOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500, fontSize: 13 }}>Sap xep:</span>
        </div>
        <Select style={{ width: 180 }} value={sortBy} onChange={setSortBy}>
          <Option value="luotChon">Pho bien nhat</Option>
          <Option value="rating">Danh gia cao nhat</Option>
          <Option value="chiPhi">Chi phi thap nhat</Option>
          <Option value="ten">Ten A-Z</Option>
        </Select>
      </div>

      <div style={{ marginBottom: 12, color: '#555', fontSize: 13 }}>
        Hien thi <strong>{filtered.length}</strong> diem den
      </div>

      {filtered.length === 0 ? (
        <Empty description="Khong tim thay diem den nao" />
      ) : (
        <Row gutter={[20, 20]}>
          {filtered.map((dd) => {
            const tongChiPhi = dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen;
            const loaiInfo = loaiMap[dd.loai] || { label: dd.loai, color: 'default' };
            return (
              <Col key={dd.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                      <img
                        alt={dd.ten}
                        src={dd.hinhAnh}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e: any) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                        }}
                      />
                      <Tag
                        color={loaiInfo.color}
                        style={{ position: 'absolute', top: 10, left: 10 }}
                      >
                        {loaiInfo.label}
                      </Tag>
                    </div>
                  }
                  actions={[
                    <Tooltip title="Them vao lich trinh" key="add">
                      <Button
                        type="link"
                        icon={<PlusCircleOutlined />}
                        onClick={() => handleAddToLichTrinh(dd)}
                      >
                        Them vao lich
                      </Button>
                    </Tooltip>,
                  ]}
                  bodyStyle={{ padding: '12px 16px' }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{dd.ten}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6, color: '#888', fontSize: 12 }}>
                    <EnvironmentOutlined />
                    <span>{dd.diaChi}</span>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <Rate disabled defaultValue={dd.rating} style={{ fontSize: 13 }} />
                    <span style={{ marginLeft: 4, color: '#888', fontSize: 12 }}>({dd.rating}/5)</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ClockCircleOutlined />
                    <span>Thoi gian tham quan: {dd.thoiGianThamQuan} gio</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#1890ff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <DollarOutlined />
                    <span>Chi phi uoc tinh: {formatMoney(tongChiPhi)}/ngay</span>
                  </div>
                  {(dd.soLuotChon > 0) && (
                    <div style={{ marginTop: 6, fontSize: 11, color: '#aaa' }}>
                      Da duoc them vao {dd.soLuotChon} lich trinh
                    </div>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Modal: Chon lich trinh & ngay */}
      <Modal
        title={`Them "${selectedDiemDen?.ten}" vao lich trinh`}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        footer={null}
        width={460}
        destroyOnClose
      >
        {lichTrinhList.length === 0 ? (
          <Empty description="Ban chua co lich trinh nao. Hay tao lich trinh tai muc 'Lich trinh cua toi'." />
        ) : (
          <div>
            {lichTrinhList.map((lt) => (
              <div
                key={lt.id}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e8e8e8',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{lt.tieuDe}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {Array.from({ length: lt.soNgay }, (_, i) => i + 1).map((ngay) => (
                    <Button
                      key={ngay}
                      size="small"
                      type="default"
                      onClick={() => doAddToLichTrinh(lt.id, ngay)}
                    >
                      Ngay {ngay}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TrangChu;
