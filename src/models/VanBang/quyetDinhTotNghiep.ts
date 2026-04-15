import { useState } from 'react';
import * as QuyetDinhService from '@/services/VanBang/quyetDinhTotNghiep';
import type { IQuyetDinhTotNghiep } from '@/services/VanBang/quyetDinhTotNghiep';

export default () => {
  const [data, setData] = useState<IQuyetDinhTotNghiep[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<IQuyetDinhTotNghiep | undefined>();
  const [filterSoVanBangId, setFilterSoVanBangId] = useState<string>('');

  const getData = (soVanBangId?: string) => {
    if (soVanBangId) {
      setData(QuyetDinhService.getBySoVanBang(soVanBangId));
    } else {
      setData(QuyetDinhService.getAll());
    }
  };

  const themMoi = (values: Omit<IQuyetDinhTotNghiep, 'id' | 'soLuotTraCuu'>) => {
    QuyetDinhService.create(values);
    getData(filterSoVanBangId || undefined);
  };

  const capNhat = (id: string, values: Partial<IQuyetDinhTotNghiep>) => {
    QuyetDinhService.update(id, values);
    getData(filterSoVanBangId || undefined);
  };

  const xoa = (id: string) => {
    QuyetDinhService.remove(id);
    getData(filterSoVanBangId || undefined);
  };

  return {
    data,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    row,
    setRow,
    filterSoVanBangId,
    setFilterSoVanBangId,
    getData,
    themMoi,
    capNhat,
    xoa,
  };
};
