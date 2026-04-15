import { Button, Form, Input, DatePicker, Select, InputNumber, Divider, Tag } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { getAll as getAllSoVanBang } from '@/services/VanBang/soVanBang';
import { getAll as getAllQuyetDinh } from '@/services/VanBang/quyetDinhTotNghiep';
import { getAll as getAllCauHinh } from '@/services/VanBang/cauHinhBieuMau';
import type { ICauHinhBieuMau } from '@/services/VanBang/cauHinhBieuMau';
import { useState, useEffect } from 'react';

const { Option } = Select;

const renderInputByKieu = (truong: ICauHinhBieuMau) => {
  if (truong.kieu === 'Number') {
    return <InputNumber style={{ width: '100%' }} placeholder={`Nhập ${truong.tenTruong}`} />;
  }
  if (truong.kieu === 'Date') {
    return <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder={`Chọn ${truong.tenTruong}`} />;
  }
  return <Input placeholder={`Nhập ${truong.tenTruong}`} />;
};

const FormThongTinVanBang = () => {
  const { row, isEdit, setVisible, themMoi, capNhat, getData } = useModel('VanBang.thongTinVanBang');
  const [form] = Form.useForm();
  const [selectedSoVanBangId, setSelectedSoVanBangId] = useState<string>(row?.soVanBangId || '');
  const [quyetDinhFiltered, setQuyetDinhFiltered] = useState<any[]>([]);

  const soVanBangList = getAllSoVanBang();
  const quyetDinhList = getAllQuyetDinh();
  const cauHinhList = getAllCauHinh();

  useEffect(() => {
    if (selectedSoVanBangId) {
      const filtered = quyetDinhList.filter((qd) => qd.soVanBangId === selectedSoVanBangId);
      setQuyetDinhFiltered(filtered);
    } else {
      setQuyetDinhFiltered(quyetDinhList);
    }
  }, [selectedSoVanBangId]);

  const buildInitialValues = () => {
    if (!row) return undefined;
    const base: any = {
      ...row,
      ngaySinh: row.ngaySinh ? moment(row.ngaySinh) : undefined,
    };
    // restore dynamic fields
    if (row.truongBoSung) {
      cauHinhList.forEach((truong) => {
        const val = row.truongBoSung[truong.id];
        if (truong.kieu === 'Date' && val) {
          base[`truong_${truong.id}`] = moment(val);
        } else {
          base[`truong_${truong.id}`] = val;
        }
      });
    }
    return base;
  };

  const onFinish = (values: any) => {
    const truongBoSung: Record<string, any> = {};
    cauHinhList.forEach((truong) => {
      const key = `truong_${truong.id}`;
      if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
        if (truong.kieu === 'Date' && values[key]) {
          truongBoSung[truong.id] = values[key].format('YYYY-MM-DD');
        } else {
          truongBoSung[truong.id] = values[key];
        }
        delete values[key];
      }
    });

    const payload = {
      soHieuVanBang: values.soHieuVanBang,
      maSinhVien: values.maSinhVien,
      hoTen: values.hoTen,
      ngaySinh: values.ngaySinh ? values.ngaySinh.format('YYYY-MM-DD') : '',
      quyetDinhId: values.quyetDinhId,
      soVanBangId: values.soVanBangId,
      truongBoSung,
    };

    if (isEdit && row) {
      capNhat(row.id, payload);
    } else {
      themMoi(payload);
    }
    setVisible(false);
    getData();
  };

  const soVanBangSelected = soVanBangList.find((s) => s.id === selectedSoVanBangId);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={buildInitialValues()}
      onFinish={onFinish}
    >
      <Divider orientation="left" plain>
        Thông tin cơ bản
      </Divider>

      {isEdit && row && (
        <Form.Item label="Số vào sổ">
          <Input value={row.soVaoSo} disabled />
        </Form.Item>
      )}

      <Form.Item
        label="Thuộc sổ văn bằng"
        name="soVanBangId"
        rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng!' }]}
      >
        <Select
          placeholder="Chọn sổ văn bằng"
          onChange={(val) => {
            setSelectedSoVanBangId(val);
            form.setFieldValue('quyetDinhId', undefined);
          }}
        >
          {soVanBangList.map((s) => (
            <Option key={s.id} value={s.id}>
              {s.tenSo} ({s.nam})
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Thuộc quyết định tốt nghiệp"
        name="quyetDinhId"
        rules={[{ required: true, message: 'Vui lòng chọn quyết định!' }]}
      >
        <Select placeholder="Chọn quyết định">
          {quyetDinhFiltered.map((qd) => (
            <Option key={qd.id} value={qd.id}>
              {qd.soQD} - {qd.trichYeu}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {soVanBangSelected && !isEdit && (
        <Form.Item label="Số vào sổ tiếp theo (tự động)">
          <Input
            value={`${soVanBangSelected.soHieuBatDau}${soVanBangSelected.soVaoSoHienTai + 1}`}
            disabled
          />
        </Form.Item>
      )}

      <Form.Item
        label="Số hiệu văn bằng"
        name="soHieuVanBang"
        rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
      >
        <Input placeholder="VD: VB2024-001" />
      </Form.Item>

      <Form.Item
        label="Mã sinh viên"
        name="maSinhVien"
        rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
      >
        <Input placeholder="VD: SV001" />
      </Form.Item>

      <Form.Item
        label="Họ tên"
        name="hoTen"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input placeholder="Nhập họ và tên đầy đủ" />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="ngaySinh"
        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      {cauHinhList.length > 0 && (
        <>
          <Divider orientation="left" plain>
            Thông tin phụ lục
          </Divider>
          {cauHinhList.map((truong) => (
            <Form.Item
              key={truong.id}
              label={
                <span>
                  {truong.tenTruong}{' '}
                  <Tag color={truong.kieu === 'Number' ? 'green' : truong.kieu === 'Date' ? 'purple' : 'blue'} style={{ marginLeft: 4 }}>
                    {truong.kieu}
                  </Tag>
                </span>
              }
              name={`truong_${truong.id}`}
              rules={
                truong.batBuoc
                  ? [{ required: true, message: `Vui lòng nhập ${truong.tenTruong}!` }]
                  : []
              }
            >
              {renderInputByKieu(truong)}
            </Form.Item>
          ))}
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
        <Button onClick={() => setVisible(false)}>Hủy</Button>
        <Button htmlType="submit" type="primary">
          {isEdit ? 'Lưu' : 'Thêm mới'}
        </Button>
      </div>
    </Form>
  );
};

export default FormThongTinVanBang;
