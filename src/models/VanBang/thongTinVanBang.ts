import { useState } from 'react';
import * as ThongTinService from '@/services/VanBang/thongTinVanBang';
import type { IThongTinVanBang, ITraCuuParams } from '@/services/VanBang/thongTinVanBang';
import * as QuyetDinhService from '@/services/VanBang/quyetDinhTotNghiep';

export default () => {
  const [data, setData] = useState<IThongTinVanBang[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<IThongTinVanBang | undefined>();
  const [ketQuaTraCuu, setKetQuaTraCuu] = useState<IThongTinVanBang[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = (quyetDinhId?: string) => {
    if (quyetDinhId) {
      setData(ThongTinService.getByQuyetDinh(quyetDinhId));
    } else {
      setData(ThongTinService.getAll());
    }
  };

  const themMoi = (values: Omit<IThongTinVanBang, 'id' | 'soVaoSo'>) => {
    ThongTinService.create(values);
    getData();
  };

  const capNhat = (id: string, values: Partial<IThongTinVanBang>) => {
    ThongTinService.update(id, values);
    getData();
  };

  const xoa = (id: string) => {
    ThongTinService.remove(id);
    getData();
  };

  const traCuu = (params: ITraCuuParams) => {
    setLoading(true);
    const results = ThongTinService.traCuu(params);
    setKetQuaTraCuu(results);
    // Ghi nhận lượt tra cứu cho từng quyết định có kết quả
    const quyetDinhIds = [...new Set(results.map((item) => item.quyetDinhId))];
    quyetDinhIds.forEach((id) => {
      QuyetDinhService.incrementLuotTraCuu(id);
    });
    setLoading(false);
    return results;
  };

  return {
    data,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    row,
    setRow,
    ketQuaTraCuu,
    loading,
    getData,
    themMoi,
    capNhat,
    xoa,
    traCuu,
  };
};
