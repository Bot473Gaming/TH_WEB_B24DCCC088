import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Alert,
  DatePicker,
  Tag,
  Empty,
} from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import { SearchOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getAll as getAllQuyetDinh } from '@/services/VanBang/quyetDinhTotNghiep';
import { getAll as getAllSoVanBang } from '@/services/VanBang/soVanBang';
import { getAll as getAllCauHinh } from '@/services/VanBang/cauHinhBieuMau';
import type { IThongTinVanBang } from '@/services/VanBang/thongTinVanBang';

const TraCuuVanBang = () => {
  const { traCuu, loading } = useModel('VanBang.thongTinVanBang');
  const [form] = Form.useForm();
  const [ketQua, setKetQua] = useState<IThongTinVanBang[]>([]);
  const [daTraCuu, setDaTraCuu] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quyetDinhList = getAllQuyetDinh();
  const soVanBangList = getAllSoVanBang();
  const cauHinhList = getAllCauHinh();

  const findQuyetDinh = (id: string) => quyetDinhList.find((qd) => qd.id === id);
  const findSoVanBang = (id: string) => soVanBangList.find((s) => s.id === id);

  const onFinish = (values: any) => {
    setErrorMsg('');
    const params: any = {};
    if (values.soHieuVanBang) params.soHieuVanBang = values.soHieuVanBang.trim();
    if (values.soVaoSo) params.soVaoSo = values.soVaoSo.trim();
    if (values.maSinhVien) params.maSinhVien = values.maSinhVien.trim();
    if (values.hoTen) params.hoTen = values.hoTen.trim();
    if (values.ngaySinh) params.ngaySinh = values.ngaySinh.format('YYYY-MM-DD');

    const paramCount = Object.keys(params).length;
    if (paramCount < 2) {
      setErrorMsg('Vui lòng nhập ít nhất 2 tham số tìm kiếm để tra cứu.');
      return;
    }

    const results = traCuu(params);
    setKetQua(results);
    setDaTraCuu(true);
  };

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <SearchOutlined style={{ fontSize: 20, color: '#1890ff' }} />
        <span style={{ fontSize: 18, fontWeight: 600 }}>Tra cứu văn bằng tốt nghiệp</span>
      </div>

      <Card bordered style={{ marginBottom: 24, maxWidth: 800 }}>
        <div style={{ marginBottom: 12, color: '#888', fontSize: 13 }}>
          Vui lòng nhập ít nhất <strong>2 tham số</strong> để tra cứu.
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số hiệu văn bằng" name="soHieuVanBang">
                <Input placeholder="VD: VB2024-001" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số vào sổ" name="soVaoSo">
                <Input placeholder="VD: 1" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mã sinh viên" name="maSinhVien">
                <Input placeholder="VD: SV001" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Họ tên" name="hoTen">
                <Input placeholder="Nhập họ tên sinh viên" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="ngaySinh">
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>
            </Col>
          </Row>

          {errorMsg && (
            <Alert message={errorMsg} type="warning" showIcon style={{ marginBottom: 16 }} />
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
            >
              Tra cứu
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setKetQua([]);
                setDaTraCuu(false);
                setErrorMsg('');
              }}
            >
              Làm mới
            </Button>
          </div>
        </Form>
      </Card>

      {daTraCuu && (
        <>
          <Divider orientation="left">
            Kết quả tra cứu{' '}
            {ketQua.length > 0 && (
              <Tag color="blue" style={{ marginLeft: 8 }}>
                {ketQua.length} văn bằng
              </Tag>
            )}
          </Divider>

          {ketQua.length === 0 ? (
            <Empty description="Không tìm thấy văn bằng phù hợp" />
          ) : (
            <Row gutter={[16, 16]}>
              {ketQua.map((vb) => {
                const qd = findQuyetDinh(vb.quyetDinhId);
                const so = findSoVanBang(vb.soVanBangId);
                return (
                  <Col span={24} key={vb.id}>
                    <Card
                      bordered
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <SafetyCertificateOutlined style={{ color: '#1890ff' }} />
                          <span>
                            {vb.hoTen} - Số hiệu: {vb.soHieuVanBang}
                          </span>
                        </div>
                      }
                    >
                      <Descriptions bordered column={2} size="small">
                        <Descriptions.Item label="Số vào sổ">{vb.soVaoSo}</Descriptions.Item>
                        <Descriptions.Item label="Số hiệu văn bằng">
                          <Tag color="blue">{vb.soHieuVanBang}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã sinh viên">{vb.maSinhVien}</Descriptions.Item>
                        <Descriptions.Item label="Họ tên">
                          <strong>{vb.hoTen}</strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                          {vb.ngaySinh ? moment(vb.ngaySinh).format('DD/MM/YYYY') : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sổ văn bằng">
                          {so ? (
                            <Tag color="cyan">
                              {so.tenSo} ({so.nam})
                            </Tag>
                          ) : (
                            '-'
                          )}
                        </Descriptions.Item>

                        {cauHinhList.map((truong) => {
                          const val = vb.truongBoSung?.[truong.id];
                          let displayVal = '-';
                          if (val !== undefined && val !== null && val !== '') {
                            displayVal =
                              truong.kieu === 'Date' ? moment(val).format('DD/MM/YYYY') : String(val);
                          }
                          return (
                            <Descriptions.Item key={truong.id} label={truong.tenTruong}>
                              {displayVal}
                            </Descriptions.Item>
                          );
                        })}
                      </Descriptions>

                      {qd && (
                        <>
                          <Divider orientation="left" plain style={{ marginTop: 16 }}>
                            Thông tin quyết định tốt nghiệp
                          </Divider>
                          <Descriptions bordered column={2} size="small">
                            <Descriptions.Item label="Số quyết định">
                              <Tag color="geekblue">{qd.soQD}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày ban hành">
                              {qd.ngayBanHanh
                                ? moment(qd.ngayBanHanh).format('DD/MM/YYYY')
                                : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trích yếu" span={2}>
                              {qd.trichYeu}
                            </Descriptions.Item>
                          </Descriptions>
                        </>
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default TraCuuVanBang;
